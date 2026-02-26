export type IMedia = Readonly<string>

export type IDetailedMedia = Readonly<{
  id: string
  url: string
  delete?: boolean
}>

export type IWithLinks = {
  links: string[]
}

export type IWithFiles = {
  readonly files: ReadonlyArray<IDetailedMedia>
}

export type IWithFilesData = IWithFiles & {
  filesData?: File[]
}