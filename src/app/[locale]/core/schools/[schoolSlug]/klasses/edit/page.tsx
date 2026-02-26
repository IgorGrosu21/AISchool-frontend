import { fetchSchoolWithKlasses, handleResponse } from '@/requests';
import { Editor } from './editor';
import { editSchoolWithKlasses } from '@/app/actions';
import { SchoolWithKlassesEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;
  const school = await handleResponse(fetchSchoolWithKlasses({ schoolSlug }))
  const t = await getTranslations('klasses');
  const segments = [
    {label: school.name, href: `schools/${schoolSlug}`},
    {label: t('plural'), href: 'klasses'},
  ]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolWithKlassesEditorContext,
      initial: school,
      action: editSchoolWithKlasses,
      segments,
      resource: { type: 'school', schoolSlug }
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}