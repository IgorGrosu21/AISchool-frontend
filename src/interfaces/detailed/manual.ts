import type { IManual, IModule, IModuleWithManual, ITopic, ITask } from '../listed'

type IProgress = {
  progress?: number
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