import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, FileCheck, LogIn, Loader2 } from 'lucide-react';

export default function LoginPrompt() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Secure Document Generation
        </CardTitle>
        <CardDescription>
          Log in to generate, save, and manage your legal documents securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-primary" />
            <span>End-to-end secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-primary" />
            <span>Save & manage documents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-primary" />
            <span>Decentralized identity</span>
          </div>
        </div>
        <Button
          type="button"
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="gap-2"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Login to Get Started
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
