import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GeneratedDocument {
    id: bigint;
    status: DocumentStatus;
    templateId: bigint;
    userId: Principal;
    finalized: boolean;
}
export interface DocumentTemplate {
    id: bigint;
    title: string;
    content: string;
    placeholders: Array<string>;
}
export interface UserInput {
    value: string;
    placeholder: string;
}
export interface UserProfile {
    name: string;
}
export enum DocumentStatus {
    finalized = "finalized",
    draft = "draft",
    archived = "archived"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTemplate(title: string, content: string, placeholders: Array<string>): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    finalizeDocument(documentId: bigint): Promise<void>;
    generateDocumentBlob(templateId: bigint, userInputs: Array<UserInput>, contentBytes: Uint8Array): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDocumentContent(user: Principal, documentId: bigint): Promise<Uint8Array>;
    getDocumentMetadata(user: Principal, documentId: bigint): Promise<GeneratedDocument>;
    getTemplate(id: bigint): Promise<DocumentTemplate>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
