import { createViewset, createUpdateArrayEntry, type Response, type Args } from "../client"

const name = 'school-details'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send', 'sendFile', 'deleteFile']
})

export async function fetchSchool({ schoolSlug }: Args<typeof name>) {
  return viewset.fetch({ kwargs: { schoolSlug } })
}

export async function sendSchool(school: Response<typeof name>) {
  return viewset.send({
    kwargs: { schoolSlug: school.slug },
    data: school,
    updateArray: [
      createUpdateArrayEntry({
        name: 'school-names',
        updater: (cachedData, newInstance) => {
          return cachedData.map(s => s.slug === school.slug ? {
            id: newInstance.id,
            name: newInstance.name,
            preview: newInstance.preview,
            slug: newInstance.slug
          } : s)
        }
      }),
      createUpdateArrayEntry({
        name: 'school-list',
        updater: (cachedData, newInstance) => {
          return cachedData.map(s => s.slug === school.slug ? {
            id: newInstance.id,
            name: newInstance.name,
            preview: newInstance.preview,
            slug: newInstance.slug,
            city: newInstance.city,
            address: newInstance.address,
            desc: newInstance.desc,
            phones: newInstance.phones,
            emails: newInstance.emails,
            workHours: newInstance.workHours,
            links: newInstance.links,
            files: newInstance.files,
            lang: newInstance.lang,
            type: newInstance.type,
            profiles: newInstance.profiles,
            startGrade: newInstance.startGrade,
            finalGrade: newInstance.finalGrade,
          } : s)
        }
      }),
      createUpdateArrayEntry({
        name: name,
        kwargs: { schoolSlug: school.slug },
        updater: 'replace'
      }),
      createUpdateArrayEntry({
        name: 'school-klasses',
        kwargs: { schoolSlug: school.slug },
        updater: (cachedData, newSchool) => {
          return {
            ...cachedData,
            name: newSchool.name,
            preview: newSchool.preview,
          }
        }
      }),
      createUpdateArrayEntry({
        name: 'school-timetable',
        kwargs: { schoolSlug: school.slug },
        updater: (cachedData, newSchool) => {
          return {
            ...cachedData,
            name: newSchool.name,
            preview: newSchool.preview,
            lang: newSchool.lang,
          }
        }
      }),
    ]
  })
}

export async function sendSchoolPreview(data: FormData, { schoolSlug }: Args<typeof name>) {
  return viewset.sendFile({
    kwargs: { schoolSlug },
    data,
    updateArray: [
      createUpdateArrayEntry({
        name: 'school-names',
        updater: (cachedData, preview) => {
          return cachedData.map(s => s.slug === schoolSlug ? {...s, preview} : s)
        }
      }),
      createUpdateArrayEntry({
        name: 'school-list',
        updater: (cachedData, preview) => {
          return cachedData.map(s => s.slug === schoolSlug ? {...s, preview} : s)
        }
      }),
      createUpdateArrayEntry({
        name: name,
        kwargs: { schoolSlug },
        updater: (cachedData, preview) => {
          return {...cachedData, preview}
        }
      }),
    ]
  })
}

export async function deleteSchoolPreview({ schoolSlug }: Args<typeof name>) {
  return viewset.deleteFile({
    kwargs: { schoolSlug },
    updateArray: [
      createUpdateArrayEntry({
        name: 'school-names',
        updater: (cachedData) => {
          return cachedData.map(s => s.slug === schoolSlug ? {...s, preview: null} : s)
        }
      }),
      createUpdateArrayEntry({
        name: 'school-list',
        updater: (cachedData) => {
          return cachedData.map(s => s.slug === schoolSlug ? {...s, preview: null} : s)
        }
      }),
      createUpdateArrayEntry({
        name: name,
        kwargs: { schoolSlug },
        updater: (cachedData) => {
          return {...cachedData, preview: null}
        }
      }),
    ]
  })
}