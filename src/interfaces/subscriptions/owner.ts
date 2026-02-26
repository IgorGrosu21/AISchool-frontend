import type { IMembership } from "./membership"
import type { ISubscriptionWithRenewals } from "./subscription"

export type IOwner = {
  subscriptions: ISubscriptionWithRenewals[]
  memberships: IMembership[]
}