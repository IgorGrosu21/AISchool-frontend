import { ModuleHeader, NavigationContainer, /*, PdfViewer */ } from "@/components";
import { errorHandler, fetchTopic } from "@/requests";
import { getTranslations } from "next-intl/server";
import { redirect } from '@/i18n';
import { Stack } from "@mui/material";

export default async function Page({ params }: { params: Promise<{manualSlug: string, moduleSlug: string, topicSlug: string, taskSlug: string}> }) {
  const { manualSlug, moduleSlug, topicSlug, taskSlug } = await params;
  const [topicRaw, status] = await fetchTopic(manualSlug, moduleSlug, topicSlug)
  const topic = await errorHandler(topicRaw, status)
  const t = await getTranslations('manuals')

  const task = topic.tasks.find(t => t.slug === taskSlug)
  const detailedModule = topic.module //next.js error: do not assign to module variable
  const manual = detailedModule.manual

  if (task === undefined) {
    return await redirect(`/core/manuals/${manualSlug}/${moduleSlug}/${topicSlug}`)
  }

  return <NavigationContainer segments={[
      {label: t('plural'), href: 'manuals'},
      {label: `${manual.subject.verboseName} ${manual.grade}`, href: manualSlug},
      {label: detailedModule.name, href: moduleSlug},
      {label: topic.name, href: topicSlug},
    ]} last={task.name}>
    <Stack gap={4}>
      <ModuleHeader title={task.name} progress={topic.progress} />
      <Stack sx={{alignItems: 'center', bgcolor: 'background.default', p: 2}}>
        {/* <PdfViewer
          link={`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/public/tasks/${manualSlug}/${moduleSlug}/${topicSlug}/${taskSlug}.pdf`}
        /> */}
      </Stack>
    </Stack>
  </NavigationContainer>
}