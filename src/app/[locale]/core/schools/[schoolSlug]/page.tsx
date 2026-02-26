import { About, Contacts, Photos, NavigationContainer, PageTitle } from '@/components';
import { fetchSchool, handleResponse } from '@/requests';
import { Panel } from '@/ui';
import Image from 'next/image';

//mui components
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid2 from "@mui/material/Grid2";

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;

  const school = await handleResponse(fetchSchool({ schoolSlug }))
  
  return <NavigationContainer segments={[]} last={school.name}>
    <PageTitle label={school.name} link={`/core/schools/${schoolSlug}`} resource={{ type: 'school', schoolSlug }} />
    <Grid2 container spacing={2} columns={2}>
      <Grid2 size={{xs: 2, lg: 1}}>
        <Box sx={{flex: 1}}>
          <Image
            width={1792}
            height={1024}
            src={school.preview ?? '/images/default-school.png'}
            alt='school-preview'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            priority
          />
        </Box>
      </Grid2>
      <Grid2 size={{xs: 2, lg: 1}}>
        <Panel sx={{height: '100%'}}>
          <Typography variant='h6' sx={{textAlign: 'justify'}}>
            {school.desc}
          </Typography>
        </Panel>
      </Grid2>
    </Grid2>
    <About school={school} />
    <Contacts school={school} />
    <Photos school={school} />
  </NavigationContainer>
}