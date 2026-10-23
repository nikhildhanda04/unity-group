import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";
import { SplashProvider } from "@/components/SplashContext";

export const metadata: Metadata = {
  title: "UNITY // HOLDING GROUP",
  description: "UNITY HOLDING GROUP CORP. — Automotive engineering, digital exchanges, and gastronomic culture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        suppressHydrationWarning
        className="bg-surface-container-lowest text-on-surface font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col justify-between transition-colors duration-300"
      >
        <SplashProvider>
          <SplashScreen />
          <ThemeProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </ThemeProvider>
        </SplashProvider>
      </body>
    </html>
  );
}
