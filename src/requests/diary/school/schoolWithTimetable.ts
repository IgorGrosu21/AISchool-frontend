import { createViewset, createUpdateArrayEntry, type Response, type Args } from "../client"

const name = 'school-timetable'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send']
})

export async function fetchSchoolWithTimetable({ schoolSlug }: Args<typeof name>) {
  return viewset.fetch({ kwargs: { schoolSlug } })
}

export async function sendSchoolWithTimetable(school: Response<typeof name>) {
  return viewset.send({
    kwargs: { schoolSlug: school.slug },
    data: school,
    updateArray: [
      createUpdateArrayEntry({
        name: name,
        kwargs: { schoolSlug: school.slug },
        updater: 'replace'
      }),
    ]
  })
}