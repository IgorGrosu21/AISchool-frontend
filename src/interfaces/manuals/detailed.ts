import type { IManual, IModule, IModuleWithManual, ITask, ITopic } from './listed'

type IProgress = {
  progress: number | null
}

export type IDetailedModule = IProgress & IModule & IModuleWithManual

export type IDetailedTopic = IProgress & ITopic & {
  module: IModuleWithManual
  tasks: ITask[]
  completedTasks: string[]
}

export type IDetailedManual = IProgress & IManual & {
  modules: IModule[]
}