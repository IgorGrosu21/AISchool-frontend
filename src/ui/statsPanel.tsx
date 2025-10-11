'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Stack, Typography, type StackProps, SvgIcon, IconButton } from "@mui/material"
import { useState } from "react"
import { Close } from "@mui/icons-material"
import { Panel } from "./panel"

interface StatsPanelProps extends StackProps {
  text: string
  desc?: string
  Icon: typeof SvgIcon
}

export function StatsPanel({text, desc, Icon, ...props}: StatsPanelProps) {
  const [isActive, setActive] = useState(false)

  return <>
    <motion.div
      layout
      layoutId={text}
      style={{flex: 1, cursor: 'pointer'}}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Stack gap={props.gap ?? 2} onClick={props.onClick ?? (() => setActive(true))} {...props} sx={{
        ...props.sx,
        height: '100%',
        p: 3,
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        minWidth: 200,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon sx={{ fontSize: 40, color: 'background.default' }} />
        <Typography variant="h6" sx={{ color: 'background.default', fontWeight: 500 }}>
          {text}
        </Typography>
      </Stack>
    </motion.div>
    <AnimatePresence>
      {isActive && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 1300,
              margin: 0
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 1500,
              margin: 0
            }}
            onClick={() => setActive(false)}
          >
            <Panel gap={4} sx={{
              minWidth: { xs: '90vw', sm: 500 },
              maxWidth: 600,
              minHeight: { xs: '70vh', sm: 500 },
              maxHeight: '90vh',
              alignItems: 'center',
              position: 'relative',
              color: '#fff',
            }}>
              <IconButton onClick={() => setActive(false)} sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: '#fff',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                }
              }}>
                <Close />
              </IconButton>
              <Icon sx={{ fontSize: 60 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                {text}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, textAlign: 'center' }}>
                {desc}
              </Typography>
            </Panel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
}