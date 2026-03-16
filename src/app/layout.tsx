import "@/styles/global.css";
import MainNavbar from "@/components/common/Navbar/main";
import MainFooter from "@/components/common/Footer/main";
import { ReactNode } from "react";
import QueryClientProviderComponent from "@/components/common/QueryClient/QueryClientProvider";
import ReduxProvider from "@/components/common/Redux/ReduxProvider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="hydrated">
      <body>
        <ReduxProvider>
        <QueryClientProviderComponent>
          <header>
            <MainNavbar />
          </header>
          <main>{children}</main>
          <footer>
            <MainFooter />
          </footer>
        </QueryClientProviderComponent>
        </ReduxProvider>
      </body>
    </html>
  );
}