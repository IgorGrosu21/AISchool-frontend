import type { IParentInvitation, IStudentInvitation, ITeacherInvitation } from "@/interfaces"
import { diaryClient } from "@/requests/core"

export async function generateParentInvitationLinks(schoolSlug: string, klassSlug: string) {
  return diaryClient.request<IParentInvitation[]>({
    url: `invitate/parent/${schoolSlug}/${klassSlug}/`,
  })
}

export async function acceptParentInvitation(schoolSlug: string, klassSlug: string, token: string) {
  return diaryClient.request<null>({
    url: `invitate/parent/${schoolSlug}/${klassSlug}/`,
    params: {
      token: token,
    },
    method: 'POST',
  })
}


export async function generateStudentInvitationLinks(schoolSlug: string, klassSlug: string) {
  return diaryClient.request<IStudentInvitation[]>({
    url: `invitate/student/${schoolSlug}/${klassSlug}/`,
  })
}

export async function acceptStudentInvitation(schoolSlug: string, klassSlug: string, token: string) {
  return diaryClient.request<null>({
    url: `invitate/student/${schoolSlug}/${klassSlug}/`,
    params: {
      token: token,
    },
    method: 'POST',
  })
}


export async function generateTeacherInvitationLinks(schoolSlug: string) {
  return diaryClient.request<ITeacherInvitation[]>({
    url: `invitate/teacher/${schoolSlug}/`,
  })
}

export async function acceptTeacherInvitation(schoolSlug: string, token: string) {
  return diaryClient.request<null>({
    url: `invitate/teacher/${schoolSlug}/`,
    params: {
      token: token,
    },
    method: 'POST',
  })
}