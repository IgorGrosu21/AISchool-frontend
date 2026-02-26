import { createViewset, createUpdateArrayEntry, type Response, type Args } from "../client"

const name = 'school-klasses'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send']
})

export async function fetchSchoolWithKlasses({ schoolSlug }: Args<typeof name>) {
  return viewset.fetch({ kwargs: { schoolSlug } })
}

export async function sendSchoolWithKlasses(school: Response<typeof name>) {
  return viewset.send({
    kwargs: { schoolSlug: school.slug },
    data: school,
    updateArray: [
      createUpdateArrayEntry({
        name: 'school-timetable',
        kwargs: { schoolSlug: school.slug },
        updater: (cachedData, newSchool) => {
          return {...cachedData, klasses: newSchool.klasses}
        }
      }),
      createUpdateArrayEntry({
        name: name,
        kwargs: { schoolSlug: school.slug },
        updater: 'replace'
      }),
    ]
  })
}