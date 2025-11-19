export { sendAuthRequest, sendCodeVerificationRequest, sendOauth2Request, sendLogoutRequest } from "./auth";

export { fetchCountryNames, fetchRegionNames, fetchCityNames, fetchCity } from "./country";
export {
  fetchLessonNames, fetchLesson,
  fetchSpecificLessonNames, fetchSpecificLesson, sendSpecificLesson, deleteSpecificLesson, sendSpecificLessonPhoto, deleteSpecificLessonPhoto,
  fetchHomework, sendHomework, deleteHomework, sendHomeworkPhoto, deleteHomeworkPhoto,
  fetchStudentNotes, fetchTeacherNotes, sendNote
} from "./lesson";
export { fetchManuals, fetchManual, fetchModule, fetchTopic } from "./manual";
export { fetchParent, sendParent, fetchStudent, sendStudent, fetchTeacher, sendTeacher, fetchPersonHome } from "./person";
export {
  fetchSchoolNames, fetchSchools, fetchSchool, sendSchool,
  fetchSchoolWithKlasses, sendSchoolWithKlasses, fetchSchoolWithTimetable, sendSchoolWithTimetable,
  sendSchoolPreview, deleteSchoolPreview, sendSchoolPhoto, deleteSchoolPhoto,
  fetchSchoolLessonTimeNames,
  fetchKlass, sendKlass, fetchTeacherKlasses
} from "./school";
export { fetchSubjectsNames, fetchTeachedSubjects, fetchStudiedSubjects } from "./subject";
export { fetchUserRoutes, fetchUser, sendUser, sendAvatar, deleteAvatar } from "./user";

export { errorHandler } from "./errorHandler";