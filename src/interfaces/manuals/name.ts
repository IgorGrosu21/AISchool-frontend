export type ISubjectName = {
  name: string;
  slug: string;
};

export type IProgress = {
  attempts: number;
  subject: number | null;
  module: number | null;
  topic: number | null;
  [key: string]: number | null;
};
