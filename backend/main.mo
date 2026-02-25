import Blob "mo:core/Blob";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type DocumentStatus = {
    #draft;
    #finalized;
    #archived;
  };

  public type DocumentTemplate = {
    id : Nat;
    title : Text;
    content : Text;
    placeholders : [Text];
  };

  public type UserInput = {
    placeholder : Text;
    value : Text;
  };

  public type GeneratedDocument = {
    id : Nat;
    templateId : Nat;
    userId : Principal;
    status : DocumentStatus;
    finalized : Bool;
  };

  type UserGeneratedDocument = {
    document : GeneratedDocument;
    content : Storage.ExternalBlob;
  };

  public type UserProfile = {
    name : Text;
  };

  var nextTemplateId = 0;
  var nextDocumentId = 0;

  let templates = Map.empty<Nat, DocumentTemplate>();
  let userDocuments = Map.empty<Principal, Map.Map<Nat, UserGeneratedDocument>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getTemplate(id : Nat) : async DocumentTemplate {
    switch (templates.get(id)) {
      case (null) { Runtime.trap("Template not found") };
      case (?template) { template };
    };
  };

  public shared ({ caller }) func addTemplate(title : Text, content : Text, placeholders : [Text]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add templates");
    };

    let templateId = nextTemplateId;
    nextTemplateId += 1;

    let newTemplate : DocumentTemplate = {
      id = templateId;
      title;
      content;
      placeholders;
    };

    templates.add(templateId, newTemplate);
    templateId;
  };

  public shared ({ caller }) func generateDocumentBlob(templateId : Nat, userInputs : [UserInput], contentBytes : Blob) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate documents");
    };

    let template = switch (templates.get(templateId)) {
      case (null) { Runtime.trap("Template not found") };
      case (?template) { template };
    };

    let documentId = nextDocumentId;
    nextDocumentId += 1;

    let generatedDocument : GeneratedDocument = {
      id = documentId;
      templateId;
      userId = caller;
      status = #draft;
      finalized = false;
    };

    let userDocument : UserGeneratedDocument = {
      document = generatedDocument;
      content = contentBytes;
    };

    let userDocs = switch (userDocuments.get(caller)) {
      case (null) {
        let newMap = Map.empty<Nat, UserGeneratedDocument>();
        newMap.add(documentId, userDocument);
        newMap;
      };
      case (?existingDocs) {
        existingDocs.add(documentId, userDocument);
        existingDocs;
      };
    };

    userDocuments.add(caller, userDocs);
    documentId;
  };

  public shared ({ caller }) func getDocumentContent(user : Principal, documentId : Nat) : async Blob {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own documents");
    };

    switch (userDocuments.get(user)) {
      case (null) { Runtime.trap("User not found") };
      case (?documents) {
        switch (documents.get(documentId)) {
          case (null) { Runtime.trap("Document not found") };
          case (?doc) { doc.content };
        };
      };
    };
  };

  public shared ({ caller }) func finalizeDocument(documentId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can finalize documents");
    };

    switch (userDocuments.get(caller)) {
      case (null) { Runtime.trap("No documents found for user") };
      case (?docs) {
        switch (docs.get(documentId)) {
          case (null) { Runtime.trap("Document not found") };
          case (?doc) {
            let newDoc = {
              doc with
              document = {
                doc.document with
                status = #finalized;
                finalized = true;
              };
              content = doc.content;
            };
            docs.add(documentId, newDoc);
          };
        };
      };
    };
  };

  public query ({ caller }) func getDocumentMetadata(user : Principal, documentId : Nat) : async GeneratedDocument {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own documents");
    };

    switch (userDocuments.get(user)) {
      case (null) { Runtime.trap("No documents found for user") };
      case (?documents) {
        switch (documents.get(documentId)) {
          case (null) { Runtime.trap("Document not found") };
          case (?doc) { doc.document };
        };
      };
    };
  };
};
