import { createReadonlyViewset } from "./client";

const examListViewset = createReadonlyViewset({
  name: "exam-list",
  requiresAuth: false,
});
export async function fetchExams() {
  return examListViewset.fetch();
}

const olympiadListViewset = createReadonlyViewset({
  name: "olympiad-list",
  requiresAuth: false,
});
export async function fetchOlympiads() {
  return olympiadListViewset.fetch();
}
