'use client'

import type { IPersonPermissions } from '@/interfaces'

const STORAGE_KEY = 'personPermissions'

export function readPermissions(): IPersonPermissions | null {
  if (typeof window === 'undefined') {
    return null
  }
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    return JSON.parse(raw) as IPersonPermissions
  } catch {
    return null
  }
}

export function writePermissions(permissions: Omit<IPersonPermissions, 'user'> | null) {
  if (typeof window === 'undefined') {
    return
  }
  if (!permissions) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions))
}

export type Resource = {
  type: 'account'
  accountId: string
} | {
  type: 'school',
  schoolSlug: string
} | {
  type: 'klass',
  schoolSlug: string
  klassSlug: string
} | {
  type: 'specificLesson'
} | {
  type: 'homework'
} | {
  type: 'notes'
}

export function grantPermission(permissions: IPersonPermissions | null | undefined, resource: Resource) {
  if (!permissions) {
    return false
  }

  switch (resource.type) {
    case 'account':
      return permissions.user.id === resource.accountId
    case 'school':
      if (permissions.profileType === 'teacher') {
        return permissions.workPlaces.find(place => place.schoolSlug === resource.schoolSlug)?.isManager ?? false
      }
      return false
    case 'klass':
      if (permissions.profileType === 'teacher') {
        const worksAtSchool = permissions.workPlaces.some(place => place.schoolSlug === resource.schoolSlug)
        return worksAtSchool || permissions.klassSlug === resource.klassSlug
      }
      return false
    case 'specificLesson':
      if (permissions.profileType === 'parent') {
        return false
      }
      return true
    case 'homework':
      return permissions.profileType === 'student'
    case 'notes':
      if (permissions.profileType === 'teacher') {
        return true
      }
      if (permissions.profileType === 'student') {
        return permissions.isManager
      }
      return false
  }
}