import { Balance, ModuleHeader, ModuleList, NavigationContainer } from "@/components";
import { fetchModule, handleResponse } from "@/requests";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{manualSlug: string, moduleSlug: string}> }) {
  const { manualSlug, moduleSlug } = await params;
  const detailedModule = await handleResponse(fetchModule({ manualSlug, moduleSlug })) //next.js error: do not assign to module variable
  const t = await getTranslations('manuals');

  const manual = detailedModule.manual

  return <NavigationContainer segments={[
      {label: t('plural'), href: 'manuals'},
      {label: `${manual.subject.name} ${manual.grade}`, href: manualSlug}
    ]} last={detailedModule.name}>
    <ModuleHeader title={`${detailedModule.name} (${detailedModule.startPage}-${detailedModule.endPage})`} progress={detailedModule.progress} balance={detailedModule.balance} />
    <ModuleList list={detailedModule.topics} baseLink={`${manualSlug}/${moduleSlug}`} renderCost={
      topic => <Balance balance={topic.balance} showText={false} hideZeros />
    }>
      {t('topics')}
    </ModuleList>
  </NavigationContainer>
}