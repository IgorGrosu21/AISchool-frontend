'use server'

import { IPersonProfile, ISubject } from "@/interfaces"
import { TeacherPositions } from "@/components"

interface TeacherProfileProps {
  profile: IPersonProfile & { profileType: 'teacher' }
  allSubjects: ISubject[]
}

export async function TeacherProfile({ profile, allSubjects }: TeacherProfileProps) {
  return <TeacherPositions positions={profile.workPlaces} allSubjects={allSubjects} />
}