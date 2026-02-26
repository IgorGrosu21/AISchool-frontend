import type { ISubscriptionWithOwner } from "./subscription"

type IRenewal = {
  start_date: string
  end_date: string
  duration_months: number
  price: number
}

export type IRenewalWithMembers = IRenewal & {
  members: string[]
}

export type IRenewalWithSubscription = IRenewal & {
  subscription: ISubscriptionWithOwner
}