import { Stack } from "@mui/material";
import { redirect } from "next/navigation"
import { isLoggedIn } from "@/app/actions/token";
import { ThemeImage } from "@/components/themeImage";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isLoggedIn()
  
  if (loggedIn) {
    redirect('/core')
  }

  return <Stack 
    gap={2} 
    sx={{
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100%', 
      px: { xs: 2, md: 2 },
      justifyContent: 'center'
    }}
  >
    <ThemeImage
      srcDark='/images/logo-blue-dark.png'
      srcLight='/images/logo-blue-light.png'
      width={100} 
      height={94} 
      alt='logo' 
      style={{ 
        marginBottom: '1rem',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
    {children}
  </Stack>
}