import { fetchProfile, fetchSchoolNames, fetchSubjects, handleResponse } from "@/requests";
import { Editor } from "./editor";
import { ProfileEditorContext } from "@/providers";
import { EditorProvider } from "@/providers";
import { editPerson } from "@/app/actions";
import { NavigationContainer } from "@/components";
import { ISchoolName, ISubject } from "@/interfaces";

export default async function Page() {
  const profile = await handleResponse(fetchProfile())
  const segments = [{label: `${profile.account.name} ${profile.account.surname}`, href: `profile`}]

  let schoolNames: ISchoolName[] = []
  let subjects: ISubject[] = []

  if (profile.profileType === 'student') {
    schoolNames = await handleResponse(fetchSchoolNames())
  } else if (profile.profileType === 'teacher') {
    [schoolNames, subjects] = await Promise.all([
      handleResponse(fetchSchoolNames()),
      handleResponse(fetchSubjects())
    ])
  }

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: ProfileEditorContext,
      initial: profile,
      action: editPerson,
      segments,
      resource: { type: 'account', accountId: profile.account.id }
    }}>
      <Editor schoolNames={schoolNames} allSubjects={subjects} />
    </EditorProvider>
  </NavigationContainer>
}