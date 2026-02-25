import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import DocumentSelectionPage from './pages/DocumentSelectionPage';
import DocumentFormPage from './pages/DocumentFormPage';
import DocumentPreviewPage from './pages/DocumentPreviewPage';
import DocumentHistoryPage from './pages/DocumentHistoryPage';
import ProfileSetupModal from './components/ProfileSetupModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

// Root route with Layout wrapper
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <ProfileSetupModal />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DocumentSelectionPage,
});

const documentFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/document/form/$templateId',
  component: DocumentFormPage,
});

const documentPreviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/document/preview/$documentId',
  component: DocumentPreviewPage,
});

const documentHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: DocumentHistoryPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  documentFormRoute,
  documentPreviewRoute,
  documentHistoryRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
