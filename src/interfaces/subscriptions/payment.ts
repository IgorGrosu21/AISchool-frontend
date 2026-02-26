import type { IPlan } from "./subscription"

export type IPayment = {
  token: string
  subscriptionId: string
  price: number
  plan: IPlan
  durationMonths: number
  members: string[]
}