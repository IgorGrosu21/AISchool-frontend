export type { AuthRequest, Oauth2Request } from "./auth/auth";
export type { ITokens, RefreshTokenRequest } from "./auth/token";
export type { IAuthUser } from "./auth/user";
export type {
  IVerificationRequired,
  VerifyCodeRequest,
  VerifyTokenRequest,
} from "./auth/verification";
export type { IError } from "./auth/error";

export type {
  IDetailedCity,
  IDetailedRegion,
  IDetailedCountry,
} from "./diary/detailed/country";
export type {
  IDetailedSpecificLesson,
  IDetailedHomework,
} from "./diary/detailed/lesson";
export type {
  IUserAccount,
  IPersonHome,
  IPersonJournal,
  IPersonDiary,
  IPersonPermissions,
  IPersonProfile,
} from "./diary/detailed/person";
export type {
  IKlassWithLessons,
  IDetailedKlass,
  IDetailedSchool,
  ISchoolWithKlasses,
  ISchoolWithTimetable,
} from "./diary/detailed/school";

export type { ICity, IRegion } from "./diary/listed/country";
export type {
  IHomework,
  ILesson,
  INote,
  ISpecificLesson,
} from "./diary/listed/lesson";
export type {
  IUser,
  IParent,
  IStudent,
  IStudentWithKlass,
  ITeacher,
  ITeacherWithReplacements,
  IParentBulkCreate,
  IStudentBulkCreate,
  ITeacherBulkCreate,
  IParentInvitation,
  IStudentInvitation,
  ITeacherInvitation,
} from "./diary/listed/person";
export type {
  IPosition,
  ISchool,
  ISchoolWithReplacements,
  IGroupWithLessons,
  IGroup,
} from "./diary/listed/school";

export type {
  ICityName,
  IRegionName,
  ICountryName,
} from "./diary/name/country";
export type {
  ILessonTimeName,
  ILessonName,
  INoteName,
  IReplacementName,
  ISpecificLessonName,
} from "./diary/name/lesson";
export type {
  IUserName,
  IParentName,
  IStudentName,
  ITeacherName,
} from "./diary/name/person";
export type { IGroupName, ISchoolName, IKlassName } from "./diary/name/school";

export type {
  IDetailedModule,
  IDetailedManual,
  IDetailedTopic,
} from "./manuals/detailed";
export type {
  ISubject,
  IBalance,
  IModuleWithManual,
  IModule,
  IManual,
  ITask,
  ITopic,
  ITest,
  IExam,
  IOlympiad,
} from "./manuals/listed";
export type { IProgress, ISubjectName } from "./manuals/name";

export type { IMembership } from "./subscriptions/membership";
export type { IOwner } from "./subscriptions/owner";
export type { IPayment } from "./subscriptions/payment";
export type {
  IRenewalWithMembers,
  IRenewalWithSubscription,
} from "./subscriptions/renewal";
export type {
  IPlan,
  ISubscriptionWithOwner,
  ISubscriptionWithRenewals,
} from "./subscriptions/subscription";

export type {
  IMedia,
  IDetailedMedia,
  IWithLinks,
  IWithFiles,
  IWithFilesData,
} from "./media";
