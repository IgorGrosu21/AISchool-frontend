'use server'

import { IDetailedSchool } from "@/interfaces";
import Image from 'next/image';

//mui components
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Stack from "@mui/material/Stack"

interface PhotosProps {
  school: IDetailedSchool
}

export async function Photos({school}: PhotosProps) {
  return <Stack sx={{alignItems: 'center'}}>
    <ImageList sx={{ width: { xs: '100%', md: '75%' }, height: 'auto', columnCount: {xs: 1, md: 2}}}>
      {school.files.map((photo, i) => <ImageListItem key={i}>
        <Image
          width={1792}
          height={1024}
          src={photo.file}
          alt={`School photo #${i + 1}`}
          loading='lazy'
          style={{width: '100%', height: 'auto'}}
        />
      </ImageListItem>)}
    </ImageList>
  </Stack>
}