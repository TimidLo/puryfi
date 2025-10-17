let lang = "en";
let translations = {};

// Because FF i18nis insanely shitty we do it our way
function loadTranslations(language) {
   return new Promise((resolve, reject) => {
      fetch(browser.runtime.getURL(`_locales/${language}/messages.json`))
         .then((response) => {
            if (!response.ok) {
               throw new Error(`Failed to load translations for ${language}`);
            }
            return response.json();
         })
         .then((translations) => resolve(translations))
         .catch((error) => reject(error));
   });
}

async function restoreTranslation() {
   let { language } = await browser.storage.sync.get("language");
   $("#language").val(language);
   lang = language;
   if (language === "en") {
      let loaded_translation = await loadTranslations(lang);
      translations[lang] = loaded_translation;
   } else {
      await applyTranslations($(document), language);
   }
}

async function applyTranslations(elem, lang) {
   if (!(lang in translations)) {
      await loadTranslations(lang)
         .then((loaded_translation) => {
            translations[lang] = loaded_translation;
         })
         .catch((error) => {
            console.error("Error loading translations:", error);
         });
   }

   elem.find("[data-i18n]").each(function () {
      const key = $(this).attr("data-i18n");
      translateEntity(key, this, lang);
   });
}

function formatI18nStr(str, params) {
   return str.replace(/\$\{(\d+)\}/g, function (match, index) {
      return params[index];
   });
}

function formatI18nStrWithEntities(str, parameter_els) {
   return str.replace(/\$\{(\d+)\}/g, function (match, index) {
      let param_el = parameter_els.filter(`[data-i18n-parameter="${index}"]`);
      return param_el.prop("outerHTML");
   });
}

function getI18nStr(key, ...parameters) {
   if (!(key in translations[lang])) {
      return null;
   }
   let translation = translations[lang][key]["message"];
   if (0 < parameters.length) {
      return formatI18nStr(translation, parameters);
   } else {
      return translation;
   }
}

function translateEntity(key, element = null, lang = null) {
   if (lang == null) {
      lang = "en";
   }

   if (key in translations[lang]) {
      let translation = translations[lang][key]["message"];

      if (element !== null) {
         let param_els = $(element).find("[data-i18n-parameter]");
         if (param_els.length) {
            translation = formatI18nStrWithEntities(translation, param_els);
            $(element).html(translation);
         } else if ($(element).attr("data-i18n-html")) {
            $(element).html(translation);
         } else {
            element.textContent = translation;
         }
      }
      return translation;
   }
   return element.textContent;
}

$("#language").on("change", function () {
   lang = $(this).val();
   applyTranslations($(document), lang).then(() => {
      saveLanguageSettings(lang);
      browser.storage.sync.get(["user"]).then((res) => {
         restoreMascot(res.user ?? null, lang);
      });
   });
});

function saveLanguageSettings(langg) {
   if (langg in translations) {
      browser.storage.sync.set({
         language: langg,
      });
   } else {
      browser.storage.sync.set({
         language: "en",
      });
   }
   lang = langg;
}
