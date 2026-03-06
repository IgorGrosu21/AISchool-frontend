"use server";

// Dynamic imports with explicit paths for better Next.js compatibility
const loadMessagesForLocale = async (locale: string) => {
  try {
    // Use dynamic imports which are compatible with both server and browser environments
    // Next.js can statically analyze these imports at build time
    let translations,
      animatedPagesTranslations,
      authTranslations,
      layoutTranslations;

    switch (locale) {
      case "en":
        [
          translations,
          animatedPagesTranslations,
          authTranslations,
          layoutTranslations,
        ] = await Promise.all([
          import("../../messages/en/index.json").then((m) => m.default),
          import("../../messages/en/animated_pages.json").then(
            (m) => m.default,
          ),
          import("../../messages/en/auth.json").then((m) => m.default),
          import("../../messages/en/layout.json").then((m) => m.default),
        ]);
        break;
      case "ro":
        [
          translations,
          animatedPagesTranslations,
          authTranslations,
          layoutTranslations,
        ] = await Promise.all([
          import("../../messages/ro/index.json").then((m) => m.default),
          import("../../messages/ro/animated_pages.json").then(
            (m) => m.default,
          ),
          import("../../messages/ro/auth.json").then((m) => m.default),
          import("../../messages/ro/layout.json").then((m) => m.default),
        ]);
        break;
      case "ru":
        [
          translations,
          animatedPagesTranslations,
          authTranslations,
          layoutTranslations,
        ] = await Promise.all([
          import("../../messages/ru/index.json").then((m) => m.default),
          import("../../messages/ru/animated_pages.json").then(
            (m) => m.default,
          ),
          import("../../messages/ru/auth.json").then((m) => m.default),
          import("../../messages/ru/layout.json").then((m) => m.default),
        ]);
        break;
      default:
        return loadMessagesForLocale("ro");
    }

    return {
      ...translations,
      animated_pages: animatedPagesTranslations,
      auth: authTranslations,
      layout: layoutTranslations,
    };
  } catch (error) {
    throw error;
  }
};

export const loadI18nTranslations = loadMessagesForLocale;
