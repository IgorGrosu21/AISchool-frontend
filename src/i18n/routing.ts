import { defineRouting } from "next-intl/routing";

export const langs = [
  { code: "ro", name: "Română" },
  { code: "ru", name: "Русский" },
  { code: "en", name: "English" },
];

export const routing = defineRouting({
  locales: langs.map((lang) => lang.code),
  defaultLocale: "ro",
});
