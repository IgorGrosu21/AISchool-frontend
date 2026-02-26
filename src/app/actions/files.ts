import { IWithFilesData, IDetailedMedia, IError } from "@/interfaces";
import { isError } from "@/requests";

type SendFilesFn = <T extends IWithFilesData>(
  instance: T,
  response: T,
  sendFileFn: (instance: T, formData: FormData) => Promise<IDetailedMedia | IError>,
  deleteFileFn: (instance: T, id: string) => Promise<null | IError>
) => Promise<T>

export const sendFiles: SendFilesFn = async (instance, response, sendFileFn, deleteFileFn) => {
  await Promise.all(instance.files.filter(f => f.delete === true).map(f => {
    return deleteFileFn(instance, f.id)
  }))
  let newFiles: ReadonlyArray<IDetailedMedia> = [];
  if (instance.filesData) {
    const files = await Promise.all(instance.filesData.map(fd => {
      const formData = new FormData();
      formData.append('file', fd);
      return sendFileFn(instance, formData)
    }))
    newFiles = files.map(f => isError(f) ? undefined : f).filter(f => f !== undefined)
  }
  return {...response, files: [...instance.files.filter(f => f.delete !== true), ...newFiles]}
}