import { createReadonlyViewset, type Args } from "./client";

const manualListViewset = createReadonlyViewset({
  name: "manual-list",
  cacheEnabled: false,
});
export async function fetchManuals() {
  return manualListViewset.fetch();
}

const manualDetailsViewset = createReadonlyViewset({ name: "manual-details" });
export async function fetchManual({ manualSlug }: Args<"manual-details">) {
  return manualDetailsViewset.fetch({ kwargs: { manualSlug } });
}

const moduleDetailsViewset = createReadonlyViewset({ name: "module-details" });
export async function fetchModule({
  manualSlug,
  moduleSlug,
}: Args<"module-details">) {
  return moduleDetailsViewset.fetch({ kwargs: { manualSlug, moduleSlug } });
}

const topicDetailsViewset = createReadonlyViewset({ name: "topic-details" });
export async function fetchTopic({
  manualSlug,
  moduleSlug,
  topicSlug,
}: Args<"topic-details">) {
  return topicDetailsViewset.fetch({
    kwargs: { manualSlug, moduleSlug, topicSlug },
  });
}
