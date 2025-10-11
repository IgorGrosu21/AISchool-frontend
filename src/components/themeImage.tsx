'use client'

import { Box } from '@mui/material'
import { useIsDark } from '@/hooks'
import Image, { ImageProps } from 'next/image'
 
type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  srcLight: string
  srcDark: string
}
 
export function ThemeImage(props: Props) {
  const isDark = useIsDark()
  const { srcLight, srcDark, alt, ...rest } = props
 
  return <Box sx={{
    width: rest.style?.width ?? rest.width,
    height: rest.style?.height ?? rest.height,
    ...rest.style,
  }}>
    <Image
      {...rest}
      src={srcLight}
      alt={alt + ' light'}
      style={{display: isDark ? 'none' : 'block'}}
    />
    <Image
      {...rest}
      src={srcDark}
      alt={alt + ' dark'}
      style={{display: isDark ? 'block' : 'none'}}
    />
  </Box>
}