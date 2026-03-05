import type { IMedia } from "../media";
import type { ISubjectName } from "./name";

export type ISubject = ISubjectName & {
  lang: string;
  image: IMedia;
};

export type IBalance = {
  [key: string]: number;
  sapphires: number;
  rubies: number;
  emeralds: number;
  diamonds: number;
  networth: number;
};

type WithSlug = {
  name: string;
  slug: string;
};

type Paginated = WithSlug & {
  startPage: number;
  endPage: number;
};

export type IManual = {
  id: string;
  subject: ISubject;
  level: string;
  grade: number;
  slug: string;
};

export type IModuleWithManual = Paginated & {
  manual: IManual;
};

export type IModule = Omit<IModuleWithManual, "manual"> & {
  topics: ITopic[];
  balance: IBalance;
};

export type ITopic = Paginated & {
  balance: IBalance;
};

export type ITask = Paginated & {
  balance: IBalance;
};

export type IExam = {
  grade: number;
  year: number;
  subject: Omit<ISubject, "lang">;
  lang: string;
  type: string;
  profile: string;
  order: number;
  test: string;
  answers: string;
  [key: string]: string | number | Omit<ISubject, "lang">;
};

export type IOlympiad = {
  grade: number;
  year: number;
  subject: Omit<ISubject, "lang">;
  lang: string;
  test1: string;
  barem1: string;
  answers1: string;
  test2: string;
  barem2: string;
  answers2: string;
  results: string;
  [key: string]: string | number | Omit<ISubject, "lang">;
};

export type ITest = IExam | IOlympiad;
