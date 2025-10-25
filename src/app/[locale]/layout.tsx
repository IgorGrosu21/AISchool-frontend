import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { redirect, routing } from '@/i18n';
import { Header, Footer } from "@/components";
import { AnimatedBackground } from "@/ui";

//mui components
import Stack from '@mui/material/Stack';
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return redirect('/not-found')
  }
  
  return <NextIntlClientProvider>
    <AnimatedBackground />
    <Header />
    <Stack id='main' component='main' sx={{minHeight: '100%'}}>
      {children}
    </Stack>
    <Footer />
  </NextIntlClientProvider>
}