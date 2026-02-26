import type {
  ISubject,
  IManual,
  IDetailedModule,
  IDetailedTopic,
  IDetailedManual,
  IExam,
  IOlympiad,
} from "@/interfaces";
import type { GenericRouteTypeRegistry, GenericRouteRegistry } from "../core";
import { BY_MANUAL, BY_MODULE, BY_TOPIC } from "./mixins";
import type { ManualInKwargs, ModuleInKwargs, TopicInKwargs } from "./mixins";

export type ManualsRouteTypeRegistry = GenericRouteTypeRegistry<{
  "subject-list": { response: ISubject[] };
  "user-subject-list": { response: ISubject[] };
  "manual-list": { response: IManual[] };
  "manual-details": { response: IDetailedManual; kwargs: ManualInKwargs };
  "module-details": { response: IDetailedModule; kwargs: ModuleInKwargs };
  "topic-details": { response: IDetailedTopic; kwargs: TopicInKwargs };
  "exam-list": { response: IExam[] };
  "olympiad-list": { response: IOlympiad[] };
}>;

export const manualsRouteRegistry: GenericRouteRegistry<ManualsRouteTypeRegistry> =
  {
    "subject-list": "subject-list/",
    "user-subject-list": "user-subject-list/",
    "manual-list": "manual-list/",
    "manual-details": `manuals/${BY_MANUAL}/`,
    "module-details": `modules/${BY_MODULE}/`,
    "topic-details": `topics/${BY_TOPIC}/`,
    "exam-list": "exam-list/",
    "olympiad-list": "olympiad-list/",
  };
