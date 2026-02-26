import { Profile } from "@/components";
import { ISubject } from "@/interfaces";
import { fetchProfile, fetchSubjects, handleResponse } from "@/requests";

export default async function Page({ searchParams }: { searchParams: Promise<{userId: string}> }) {
  const { userId } = await searchParams;
  const profile = await handleResponse(fetchProfile({ userId }))
  let subjects: ISubject[] | undefined = undefined
  if (profile.profileType === 'teacher') {
    subjects = await handleResponse(fetchSubjects())
  }

  return <Profile
    profile={profile}
    subjects={subjects}
  />
}