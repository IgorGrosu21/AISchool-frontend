export { collectDeviceInfo } from './client'
export { extractDeviceInfoFromRequest } from './server'
import type { DeviceInfo as ClientDeviceInfo } from './client'
import type { DeviceInfo as ServerDeviceInfo } from './server'

type DeviceInfo = ClientDeviceInfo | ServerDeviceInfo
export type { DeviceInfo }