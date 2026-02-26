'use client'

import { useTranslations } from 'next-intl'
import { ImageUploader, PhotosEditor, ContactsEditor, AboutEditor } from '@/components'
import { Panel } from '@/ui'
import Image from 'next/image'
import { editSchoolPreview, removeSchoolPreview } from '@/app/actions'
import { useSchoolEditorContext } from '@/providers'

//mui components
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

export function Editor() {
  const { instance: school, setInstance: setSchool } = useSchoolEditorContext()
  const t = useTranslations('schools.details');

  return <Stack gap={4}>
    <Panel gap={2} sx={{height: '100%'}}>
      <TextField label={t('name')} value={school.name} onChange={(e) => setSchool({...school, name: e.target.value})} />
      <TextField label={t('desc')} value={school.desc} multiline rows={10} onChange={(e) => setSchool({...school, desc: e.target.value})} />
    </Panel>
    <Panel gap={2} sx={{height: '100%', width: {xss: 'unset', md: '50%'}, alignSelf: 'center'}}>
      <ImageUploader
        existing={school.preview}
        setExisting={val => setSchool({...school, preview: val})}
        sendFile={formData => editSchoolPreview(formData, school)}
        deleteFile={() => removeSchoolPreview(school)}
        renderImage={src => <Image
          width={1792}
          height={1024}
          src={src ?? '/images/default-school.png'}
          alt='school-preview'
          style={{width: '100%', height: 'auto'}}
          priority
        />}
      />
    </Panel>
    <AboutEditor school={school} setSchool={setSchool} />
    <ContactsEditor school={school} setSchool={setSchool} />
    <PhotosEditor school={school} setSchool={setSchool} />
  </Stack>
}