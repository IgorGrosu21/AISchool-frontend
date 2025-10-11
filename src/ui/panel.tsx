'use client'

import { Stack, type StackOwnProps } from "@mui/material"
import { useIsDark } from "@/hooks"
import { motion } from "framer-motion"

export function Panel({children, ...props}: StackOwnProps) {
  const isDark = useIsDark()

  return <Stack
    {...props}
    component={motion.div}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
    sx={{
      flex: 1,
      background: isDark ? 'rgba(8, 8, 22, 0.2)' : 'rgba(233, 242, 247, 0.2)',
      boxShadow: isDark ? '0 4px 30px rgba(255, 255, 255, 0.1)' : '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: isDark ? '1px solid rgba(0, 0, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
      p: props.p ?? 2,
      borderRadius: 2,
      ...props.sx,
    }}
  >
    {children}
  </Stack>
}