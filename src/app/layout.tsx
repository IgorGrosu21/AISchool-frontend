import type { Metadata } from "next";
import Script from "next/script";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import theme from "../theme";

//mui components
import CssBaseline from "@mui/material/CssBaseline";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "ISchool - Smart Learning Management System",
    template: "%s | ISchool",
  },
  description:
    "AI-powered school management platform for students, teachers, and parents. Manage schedules, grades, homework, and school activities all in one place.",
  keywords: [
    "education",
    "school",
    "learning",
    "LMS",
    "students",
    "teachers",
    "management",
    "AI",
    "smart school",
  ],
  authors: [{ name: "ISchool" }],
  creator: "ISchool",
  publisher: "ISchool",
  applicationName: "ISchool",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo-hat-light.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ISchool",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "ISchool",
    title: "ISchool - Smart Learning Management System",
    description: "AI-powered school management platform",
  },
  twitter: {
    card: "summary",
    title: "ISchool",
    description: "ISchool-powered school management platform",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={roboto.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4865858364709474"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <InitColorSchemeScript attribute="[data-theme='%s']" />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
