'use client'

import { GradientBackground } from "./gradient"

//mui components
import { keyframes } from "@mui/material/styles"
import Box from "@mui/material/Box"

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
`

const floatReverse = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(15px) rotate(-120deg);
  }
  66% {
    transform: translateY(-10px) rotate(-240deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`

export function AnimatedBackground() {
  return <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      bgcolor: 'background.default',
    }}
  >
    <GradientBackground>
      {/* Desktop-only animated blobs for better mobile performance */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        {/* Floating Blob 1 */}
        <Box
          sx={[{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(59, 130, 246, 0.25) 0%, 
                rgba(147, 197, 253, 0.15) 50%, 
                transparent 100%
              )
            `,
            filter: 'blur(1px)',
            animation: `${float} 8s ease-in-out infinite`,
            animationDelay: '0s',
          }, theme => theme.applyStyles('dark', {
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(59, 130, 246, 0.4) 0%, 
                rgba(30, 58, 138, 0.25) 50%, 
                transparent 100%
              )
            `
          })]}
        />
        
        {/* Floating Blob 2 */}
        <Box
          sx={[{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 70% 20%, 
                rgba(16, 185, 129, 0.22) 0%, 
                rgba(110, 231, 183, 0.12) 50%, 
                transparent 100%
              )
            `,
            filter: 'blur(1px)',
            animation: `${floatReverse} 10s ease-in-out infinite`,
            animationDelay: '2s',
          }, theme => theme.applyStyles('dark', {
            background: `
              radial-gradient(circle at 70% 20%, 
                rgba(16, 185, 129, 0.35) 0%, 
                rgba(5, 150, 105, 0.2) 50%, 
                transparent 100%
              )
            `
          })]}
        />
        
        {/* Floating Blob 3 */}
        <Box
          sx={[{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(139, 92, 246, 0.2) 0%, 
                rgba(196, 181, 253, 0.1) 50%, 
                transparent 100%
              )
            `,
            filter: 'blur(1px)',
            animation: `${float} 12s ease-in-out infinite`,
            animationDelay: '4s',
          }, theme => theme.applyStyles('dark', {
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(139, 92, 246, 0.3) 0%, 
                rgba(124, 58, 237, 0.15) 50%, 
                transparent 100%
              )
            `
          })]}
        />
        
        {/* Floating Blob 4 */}
        <Box
          sx={[{
            position: 'absolute',
            top: '30%',
            right: '40%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 20% 80%, 
                rgba(236, 72, 153, 0.18) 0%, 
                rgba(251, 207, 232, 0.1) 50%, 
                transparent 100%
              )
            `,
            filter: 'blur(1px)',
            animation: `${floatReverse} 9s ease-in-out infinite`,
            animationDelay: '1s',
          }, theme => theme.applyStyles('dark', {
            background: `
              radial-gradient(circle at 20% 80%, 
                rgba(236, 72, 153, 0.35) 0%, 
                rgba(219, 39, 119, 0.15) 50%, 
                transparent 100%
              )
            `
          })]}
        />
        
        {/* Floating Blob 5 */}
        <Box
          sx={[{
            position: 'absolute',
            bottom: '40%',
            right: '10%',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 60% 40%, 
                rgba(16, 185, 129, 0.16) 0%, 
                rgba(196, 181, 253, 0.08) 50%, 
                transparent 100%
              )
            `,
            filter: 'blur(1px)',
            animation: `${float} 11s ease-in-out infinite`,
            animationDelay: '3s',
          }, theme => theme.applyStyles('dark', {
            background: `
              radial-gradient(circle at 60% 40%, 
                rgba(16, 185, 129, 0.35) 0%, 
                rgba(124, 58, 237, 0.15) 50%, 
                transparent 100%
              )
            `
          })]}
        />
        
        {/* Floating Blob 6 */}
        <Box
          sx={[{
            position: 'absolute',
            top: '70%',
            left: '60%',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 40% 60%, 
                rgba(139, 92, 246, 0.2) 0%, 
                rgba(147, 197, 253, 0.1) 50%, 
                transparent 100%
              )
            `,
            filter: 'blur(1px)',
            animation: `${floatReverse} 7s ease-in-out infinite`,
            animationDelay: '5s',
          }, theme => theme.applyStyles('dark', {
            background: `
              radial-gradient(circle at 40% 60%, 
                rgba(139, 92, 246, 0.32) 0%, 
                rgba(59, 130, 246, 0.18) 50%, 
                transparent 100%
              )
            `
          })]}
        />
        
        {/* Subtle pulsing overlay - desktop only */}
        <Box
          sx={[{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(59, 130, 246, 0.05) 30%,
                transparent 70%
              )
            `,
            animation: `${pulse} 6s ease-in-out infinite`,
          }, theme => theme.applyStyles('dark', {
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(255, 255, 255, 0.08) 0%, 
                rgba(139, 92, 246, 0.03) 30%,
                transparent 70%
              )
            `
          })]}
        />
      </Box>
    </GradientBackground>
  </Box>
}