import { IError, IMedia } from "@/interfaces";

export type Validatable<T = string> = { value: T, error: string }

export type EditActionFunction<T> = (instance: T) => Promise<T | IError>
export type EditFileActionFunction<T> = (formData: FormData, instance: T) => Promise<IMedia | IError>
export type DeleteFileActionFunction<T> = (instance: T) => Promise<null | IError>