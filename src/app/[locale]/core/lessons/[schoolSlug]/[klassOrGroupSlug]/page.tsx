import { permanentRedirect } from '@/i18n'

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params

  await permanentRedirect(`/core/diary?schoolSlug=${schoolSlug}`)
}