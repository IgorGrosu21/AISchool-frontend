const MANUAL_KWARG = 'manualSlug'
const MODULE_KWARG = 'moduleSlug'
const TOPIC_KWARG = 'topicSlug'

export const BY_MANUAL = `<${MANUAL_KWARG}>`
export const BY_MODULE = `${BY_MANUAL}/<${MODULE_KWARG}>`
export const BY_TOPIC = `${BY_MODULE}/<${TOPIC_KWARG}>`

export type ManualInKwargs = { [MANUAL_KWARG]: string }
export type ModuleInKwargs = ManualInKwargs & { [MODULE_KWARG]: string }
export type TopicInKwargs = ModuleInKwargs & { [TOPIC_KWARG]: string }