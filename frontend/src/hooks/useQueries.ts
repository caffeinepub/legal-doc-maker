import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, UserInput } from '../backend';
import type { Principal } from '@dfinity/principal';

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Document Generation ─────────────────────────────────────────────────────

interface GenerateDocumentParams {
  templateId: bigint;
  userInputs: UserInput[];
  contentBytes: Uint8Array;
}

export function useGenerateDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ templateId, userInputs, contentBytes }: GenerateDocumentParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateDocumentBlob(templateId, userInputs, contentBytes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userDocuments'] });
    },
  });
}

// ─── Document Content ─────────────────────────────────────────────────────────

export function useGetDocumentContent(
  user: Principal | undefined,
  documentId: bigint
) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Uint8Array>({
    queryKey: ['documentContent', user?.toString(), documentId.toString()],
    queryFn: async () => {
      if (!actor || !user) throw new Error('Actor or user not available');
      return actor.getDocumentContent(user, documentId);
    },
    enabled: !!actor && !actorFetching && !!user,
    retry: false,
  });
}

// ─── Document Metadata ────────────────────────────────────────────────────────

export function useGetDocumentMetadata(
  user: Principal | undefined,
  documentId: bigint
) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['documentMetadata', user?.toString(), documentId.toString()],
    queryFn: async () => {
      if (!actor || !user) throw new Error('Actor or user not available');
      return actor.getDocumentMetadata(user, documentId);
    },
    enabled: !!actor && !actorFetching && !!user,
    retry: false,
  });
}

// ─── Finalize Document ────────────────────────────────────────────────────────

export function useFinalizeDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.finalizeDocument(documentId);
    },
    onSuccess: (_data, documentId) => {
      queryClient.invalidateQueries({ queryKey: ['documentMetadata'] });
      queryClient.invalidateQueries({ queryKey: ['documentContent', undefined, documentId.toString()] });
    },
  });
}
