import type { IManual, IModule, IModuleWithManual, ITopic } from '../listed'

type IProgress = {
  progress?: number
}

export type IDetailedModule = IProgress & IModule & IModuleWithManual

export type IDetailedTopic = IProgress & ITopic & {
  module: IModuleWithManual
  completedTasks: string[]
}

export type IDetailedManual = IProgress & IManual & {
  modules: IModule[]
}