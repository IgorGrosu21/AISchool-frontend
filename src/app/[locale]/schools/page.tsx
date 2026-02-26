import { fetchCountry, fetchSchools, handleResponse } from "@/requests";
import { getTranslations } from "next-intl/server";
import { NavigationContainer, SchoolTable } from "@/components";

//mui components
import Typography from "@mui/material/Typography"

export default async function Page() {
  const [schools, country] = await Promise.all([handleResponse(fetchSchools()), handleResponse(fetchCountry())])
  const t = await getTranslations('schools');

  return <NavigationContainer last={t('list')}>
    <Typography variant='h4'>{t('list')}</Typography>
    <SchoolTable schools={schools} country={country} />
  </NavigationContainer>
}