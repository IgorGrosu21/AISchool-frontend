import type { IRenewalWithMembers } from './renewal'

export type IPlan = 'STUDENT' | 'AI' | 'CLASS' | 'DIARY' | 'STAFF' | 'KIDS'


type ISubscription = {
  plan: IPlan
  createdAt: string
}

export type ISubscriptionWithOwner = ISubscription & {
  owner: string
}

export type ISubscriptionWithRenewals = ISubscription & {
  renewals: IRenewalWithMembers[]
}