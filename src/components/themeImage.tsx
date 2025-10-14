'use client'

import Image, { ImageProps } from 'next/image'

//mui components
import Box from "@mui/material/Box"
 
type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  srcLight: ImageProps['src']
  srcDark: ImageProps['src']
}
 
export function ThemeImage(props: Props) {
  const { srcLight, srcDark, alt, ...rest } = props
 
  return <Box sx={{
    width: rest.style?.width ?? rest.width,
    height: rest.style?.height ?? rest.height,
    ...rest.style,
  }}>
    <Box sx={[
      { display: 'block' },
      theme => theme.applyStyles('dark', { display: 'none' }),
    ]}>
      <Image
        {...rest}
        src={srcLight}
        alt={alt + ' light'}
      />
    </Box>
    <Box sx={[
      { display: 'none' },
      theme => theme.applyStyles('dark', { display: 'block' }),
    ]}>
      <Image
        {...rest}
        src={srcDark}
        alt={alt + ' dark'}
      />
    </Box>
  </Box>
}