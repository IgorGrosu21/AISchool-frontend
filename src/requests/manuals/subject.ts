import { createReadonlyViewset } from "./client";

const subjectListViewset = createReadonlyViewset({
  name: "subject-list",
  requiresAuth: false,
});
export async function fetchSubjects() {
  return subjectListViewset.fetch();
}

const userSubjectListViewset = createReadonlyViewset({
  name: "user-subject-list",
  cacheEnabled: false,
});
export async function fetchUserSubjects() {
  return userSubjectListViewset.fetch();
}
