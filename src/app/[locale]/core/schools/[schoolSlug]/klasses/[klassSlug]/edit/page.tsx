import { fetchKlass, handleResponse } from '@/requests';
import { Editor } from './editor';
import { EditorProvider } from '@/providers';
import { editKlass } from '@/app/actions';
import { KlassEditorContext } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolSlug: string, klassSlug: string}> }) {
  const { schoolSlug, klassSlug } = await params;
  const klass = await handleResponse(fetchKlass({ schoolSlug, klassSlug }))
  const t = await getTranslations('klasses')
  const segments = [
    {label: klass.school.name, href: `schools/${schoolSlug}`},
    {label: t('plural'), href: 'klasses'},
    {label: `${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`, href: klassSlug},
  ]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: KlassEditorContext,
      initial: klass,
      action: editKlass,
      segments,
      resource: { type: 'klass', schoolSlug, klassSlug }
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}