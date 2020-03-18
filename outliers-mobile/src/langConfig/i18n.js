export const fallback = "en";

export const supportedLocales = {
    en: {
        name: "English",
        translationFileLoader: () => require('../lang/en.json'),

        // en is default locale in Moment
        // momentLocaleLoader: () => Promise.resolve(),
    },
    ko: {
        name: "korean",
        translationFileLoader: () => require('../lang/ko.json'),
        // momentLocaleLoader: () => import('moment/locale/ko'),
    },
};

export const defaultNamespace = "common";

export const namespaces = [
    "common",
    "lists",
    "ListScreen",
    "ListOfTodos",
    "AddTodoScreen",
    "DatePickerAndroid",
];
