import { createViewset, type Response, type Args } from "../client"

const name = 'profile'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send'],
  cacheEnabled: false
})

export async function fetchProfile({ userId }: Args<typeof name> = {}) {
  return viewset.fetch({ params: { userId } })
}

export async function sendProfile(profile: Response<typeof name>) {
  return viewset.send({ data: profile })
}