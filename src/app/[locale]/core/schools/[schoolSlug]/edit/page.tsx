import { fetchSchool, handleResponse } from '@/requests';
import { Editor } from './editor';
import { editSchool } from '@/app/actions';
import { SchoolEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;
  const school = await handleResponse(fetchSchool({ schoolSlug }))
  const segments = [{label: school.name, href: `schools/${schoolSlug}`}]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolEditorContext,
      initial: school,
      action: editSchool,
      segments,
      resource: { type: 'school', schoolSlug }
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}