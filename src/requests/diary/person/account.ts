import { createViewset, type Response } from "../client"

const name = 'account'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send', 'sendFile', 'deleteFile'],
  cacheEnabled: false
})

export async function fetchAccount() {
  return viewset.fetch()
}

export async function sendAccount(account: Response<typeof name>) {
  return viewset.send({ data: account, method: account.id === '' ? 'POST' : 'PUT' })
}

export async function sendAvatar(data: FormData) {
  return viewset.sendFile({ data })
}

export async function deleteAvatar() {
  return viewset.deleteFile()
}