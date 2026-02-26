import { createViewset, createUpdateArrayEntry, type Response, type Args } from "../client"

const name = 'klass-details'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send']
})

export async function fetchKlass({ schoolSlug, klassSlug }: Args<typeof name>) {
  return viewset.fetch({ kwargs: { schoolSlug, klassSlug } })
}

export async function sendKlass(klass: Response<typeof name>) {
  return viewset.send({
    kwargs: { schoolSlug: klass.school.slug, klassSlug: klass.slug },
    data: klass,
    updateArray: [
      createUpdateArrayEntry({
        name: 'school-klasses',
        kwargs: { schoolSlug: klass.school.slug },
        updater: (cachedData, newKlass) => {
          return {...cachedData, klasses: cachedData.klasses.map(k => k.id === newKlass.id ? {
            id: newKlass.id,
            grade: newKlass.grade,
            letter: newKlass.letter,
            profile: newKlass.profile,
            schoolId: newKlass.school.id,
            schoolSlug: newKlass.school.slug,
            slug: newKlass.slug
          }: k)}
        }
      }),
      createUpdateArrayEntry({
        name: 'school-timetable',
        kwargs: { schoolSlug: klass.school.slug },
        updater: (cachedData, newKlass) => {
          return {...cachedData, klasses: cachedData.klasses.map(k => k.id === newKlass.id ? {
            id: newKlass.id,
            grade: newKlass.grade,
            letter: newKlass.letter,
            profile: newKlass.profile,
            schoolId: newKlass.school.id,
            schoolSlug: newKlass.school.slug,
            slug: newKlass.slug
          }: k)}
        }
      }),
      createUpdateArrayEntry({
        name: 'klass-timetable',
        kwargs: { schoolSlug: klass.school.slug, klassSlug: klass.slug },
        updater: (cachedData, newKlass) => {
          return {
            id: newKlass.id,
            grade: newKlass.grade,
            letter: newKlass.letter,
            profile: newKlass.profile,
            schoolId: newKlass.school.id,
            schoolSlug: newKlass.school.slug,
            slug: newKlass.slug,
            groups: newKlass.groups,
            students: newKlass.students,
            school: cachedData.school,
            teacher: cachedData.teacher,
            lessons: cachedData.lessons,
          }
        }
      }),
      createUpdateArrayEntry({
        name: name,
        kwargs: { schoolSlug: klass.school.slug, klassSlug: klass.slug },
        updater: 'replace'
      }),
    ]
  })
}