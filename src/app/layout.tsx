import "@/styles/global.css";
import MainNavbar from "@/components/common/Navbar/main";
import MainFooter from "@/components/common/Footer/main";
import { ReactNode } from "react";
import QueryClientProviderComponent from "@/components/common/QueryClient/QueryClientProvider";
import ReduxProvider from "@/components/common/Redux/ReduxProvider";
import { SessionSync } from "@/components/common/Redux/SessionSync";
import ChunkErrorRecovery from "@/components/common/ChunkErrorRecovery/ChunkErrorRecovery";
import { AuthUserProvider } from "@/components/common/Auth/AuthUserContext";
import { getCurrentUser } from "@/lib/auth/session";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="hydrated" data-scribe-recorder-ready="true">
      <body>
        <AuthUserProvider user={user}>
          <ReduxProvider>
            <QueryClientProviderComponent>
              <ChunkErrorRecovery />
              <SessionSync />
              <header>
                <MainNavbar />
              </header>
              <main>{children}</main>
              <footer>
                <MainFooter />
              </footer>
            </QueryClientProviderComponent>
          </ReduxProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
