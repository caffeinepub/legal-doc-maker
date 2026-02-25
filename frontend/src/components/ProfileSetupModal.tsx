import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Scale } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const isAuthenticated = !!identity;
  const showModal = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    try {
      await saveProfileMutation.mutateAsync({ name: trimmed });
      toast.success('Profile saved! Welcome to LegalDocs.');
    } catch (err: any) {
      const msg = err?.message || 'Failed to save profile. Please try again.';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-heading">Welcome to LegalDocs</DialogTitle>
          </div>
          <DialogDescription>
            Please enter your name to complete your profile setup. This helps personalize your legal documents.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Your Full Name</Label>
            <Input
              id="profile-name"
              type="text"
              placeholder="e.g. Jane Smith"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              disabled={saveProfileMutation.isPending}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={saveProfileMutation.isPending || !name.trim()}
          >
            {saveProfileMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile & Continue'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
