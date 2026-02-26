'use client'

import { Link } from '@/i18n';
import Image from "next/image";
import { ISchool } from "@/interfaces";
import { useTranslations } from 'next-intl';

//mui components
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
//icons
import CloseIcon from "@mui/icons-material/Close"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import LanguageIcon from "@mui/icons-material/Language"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SchoolIcon from "@mui/icons-material/School"
import GradeIcon from "@mui/icons-material/Class"

interface SchoolTableBackdropProps {
  selectedSchool: ISchool | null
  setSelectedSchool: (school: ISchool | null) => void
}

export function SchoolTableBackdrop({selectedSchool, setSelectedSchool}: SchoolTableBackdropProps) {
  const tDetails = useTranslations('schools.details');
  const tFilters = useTranslations('schools.filters');

  return <Backdrop open={selectedSchool !== null} onClick={() => setSelectedSchool(null)}>
    {selectedSchool && <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 4,
        maxWidth: '90vw',
        maxHeight: '85vh',
        overflow: 'auto',
        position: 'relative',
        mt: 8,
        boxShadow: 24
      }}
    >
      <IconButton
        onClick={() => setSelectedSchool(null)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1
        }}
      >
        <CloseIcon />
      </IconButton>
      
      <Stack gap={2}>
        {/* Header */}
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: {sm: '300px', md: 'unset'},
                aspectRatio: '16/9',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Image
                width={1792}
                height={1024}
                src={selectedSchool.preview ?? '/images/default-school.png'}
                alt={`${selectedSchool.name} preview`}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto'
                }}
                loading="lazy"
              />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Stack gap={1} sx={{height: '100%'}}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {selectedSchool.name}
              </Typography>
              <Stack direction="row" gap={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {selectedSchool.address}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: {xs: 'none', md: 'inline'} }}>
                {selectedSchool.desc}
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>

        <Divider sx={{display: {xs: 'none', md: 'block'}}} />

        {/* Basic Info Grid */}
        <Grid2 container spacing={2} sx={{display: {xs: 'none', md: 'flex'}}}>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <Stack direction="row" gap={1} alignItems="center">
              <SchoolIcon fontSize="small" color="action" />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  {tDetails('type')}
                </Typography>
                <Typography variant="body2">
                  {selectedSchool.type ? tFilters(`types.${selectedSchool.type}`) : ''}
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <Stack direction="row" gap={1} alignItems="center">
              <LanguageIcon fontSize="small" color="action" />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  {tDetails('lang')}
                </Typography>
                <Typography variant="body2">
                  {selectedSchool.lang.toUpperCase()}
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <Stack direction="row" gap={1} alignItems="center">
              <SchoolIcon fontSize="small" color="action" />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  {tFilters('profiles.title')}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                  {selectedSchool.profiles.split(',').filter(p => Boolean(p)).map(p => tFilters(`profiles.${p}`)).join(', ')}
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <Stack direction="row" gap={1} alignItems="center">
              <GradeIcon fontSize="small" color="action" />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Grades
                </Typography>
                <Typography variant="body2">
                  {selectedSchool.startGrade} - {selectedSchool.finalGrade}
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
        </Grid2>

        <Divider />

        {/* Contact Info Grid */}
        <Grid2 container spacing={2}>
          <Grid2 size={{xs: 12, md: 6}}>
            <Stack direction="row" gap={1.5} alignItems="flex-start">
              <AccessTimeIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
              <Stack gap={0.5} sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {tDetails('work_hours')}
                </Typography>
                <Typography variant="body2">
                  {selectedSchool.workHours}
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{xs: 12, md: 6}}>
            <Stack direction="row" gap={1.5} alignItems="flex-start">
              <PhoneIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
              <Stack gap={0.5} sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {tDetails('phones')}
                </Typography>
                <Stack direction="row" gap={1.5} sx={{ flexWrap: 'wrap' }}>
                  {selectedSchool.phones.map((phone, i) => (
                    <Link key={i} href={`tel:${phone}`}>
                      <Typography variant="body2" color="primary">
                        {phone}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{xs: 12, md: 6}}>
            <Stack direction="row" gap={1.5} alignItems="flex-start">
              <EmailIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
              <Stack gap={0.5} sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {tDetails('emails')}
                </Typography>
                <Stack direction="row" gap={1.5} sx={{ flexWrap: 'wrap' }}>
                  {selectedSchool.emails.map((email, i) => (
                    <Link key={i} href={`mailto:${email}`}>
                      <Typography variant="body2" color="primary">
                        {email}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{xs: 12, md: 6}}>
            <Stack direction="row" gap={1.5} alignItems="flex-start">
              <LanguageIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
              <Stack gap={0.5} sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {tDetails('website')}
                </Typography>
                <Stack direction="row" gap={1.5} sx={{ flexWrap: 'wrap' }}>
                  {selectedSchool.links.map((link, i) => {
                    const cleanLink = link.endsWith('/') ? link.slice(0, -1) : link
                    return (
                      <Link key={i} href={link} target="_blank">
                        <Typography variant="body2" color="primary">
                          {cleanLink.replace('https://', '').replace('http://', '')}
                        </Typography>
                      </Link>
                    )
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Grid2>
        </Grid2>

        {/* Photos */}
        <Divider sx={{display: {xs: 'none', md: 'block'}}} />
        <Stack gap={1} sx={{display: {xs: 'none', md: 'flex'}}}>
          <Grid2 container spacing={1.5}>
            {selectedSchool.files.map((file, i) => (
              <Grid2 key={i} size={{ xs: 6, sm: 4, md: 3 }}>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    position: 'relative',
                    borderRadius: 1.5,
                    overflow: 'hidden'
                  }}
                >
                  <Image
                    width={1792}
                    height={1024}
                    src={file.url}
                    alt={`${selectedSchool.name} photo ${i + 1}`}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto'
                    }}
                    loading="lazy"
                  />
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Stack>
    </Box>}
  </Backdrop>
}