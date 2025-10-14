'use client'

import dynamic from 'next/dynamic'
import { PlusesSection } from './plusesSection'

// Lazy load animation groups
const AnimationGroup2 = dynamic(() => import('@/ui/animationsGroups/group2').then(mod => ({ default: mod.AnimationGroup2 })), { ssr: false })
const AnimationGroup3 = dynamic(() => import('@/ui/animationsGroups/group3').then(mod => ({ default: mod.AnimationGroup3 })), { ssr: false })

export function Pluses() {
  return <>
    <PlusesSection userType='student' />
    <PlusesSection userType='student' animationGroup={<AnimationGroup2 />} />
    <PlusesSection userType='teacher' />
    <PlusesSection userType='teacher' animationGroup={<AnimationGroup3 />} />
    <PlusesSection userType='parent' />
  </>
}