import type { IParent, IParentBulkCreate, IPosition, IStudent, IStudentBulkCreate, ITeacherBulkCreate } from "@/interfaces"
import { diaryClient } from "@/requests/core"

export async function bulkCreateParents(parents: IParentBulkCreate[], schoolSlug: string, klassSlug: string) {
  return diaryClient.request<IParent[]>({
    url: `bulk-create/parent/${schoolSlug}/${klassSlug}/`,
    method: 'POST',
    data: parents,
  })
}

export async function bulkCreateStudents(students: IStudentBulkCreate[], schoolSlug: string, klassSlug: string) {
  return diaryClient.request<IStudent[]>({
    url: `bulk-create/student/${schoolSlug}/${klassSlug}/`,
    method: 'POST',
    data: students,
  })
}

export async function bulkCreateTeachers(teachers: ITeacherBulkCreate[], schoolSlug: string) {
  return diaryClient.request<IPosition[]>({
    url: `bulk-create/teacher/${schoolSlug}/`,
    method: 'POST',
    data: teachers,
  })
}