import { errorHandler, fetchUser } from "@/requests";
import { redirect } from '@/i18n';
import { Profile } from "@/components";

export default async function Page() {
  const [userRaw, status] = await fetchUser()
  if (status === 403) {
    return redirect('/core/profile/edit')
  }
  const user = await errorHandler(userRaw, status)

  return <Profile user={user} headerChildren={<></>}>
  </Profile>
}