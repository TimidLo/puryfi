/**
 * Lists all untranslated text fragments in the UI.
 * @returns {{}}
 */
function listAllTextFragments() {
    const result = {};
    let s = "";
    let exc = ["px","KB", "MB", "PuryFi", "♀", "♂", "#", "%",
        "PNG", "JPG", "BMP", "WebP", "GIF", "AVIF", "PNG:", "JPG:", "BMP:", "WebP:", "AVIF:", "Gif:", "0.7.8.0", "ON", "+", "/", ":",
        "0", "1", "2", "3", "1.", "2.", "3.", "00", "+/-", "-", "_", "Discord", "0%", "24hr", "7d", "30d", "s", "»", "0.00 Bytes",
        "PuryFi AI", "PuryFi account",
        "[", "]", "chr", "By 0131 ©", "...", "en-US", "en-GB", "de-DE", "English","German","Spanish","Chinese"];
    function traverse(element, parentPath) {
        const children = element.childNodes;
        const elementText = element.nodeType === 3 ? element.nodeValue.trim() : '';

        if (elementText !== '') {
            let parent = result;

            for (const key of parentPath) {
                parent = parent[key] || (parent[key] = {});
            }
            if(!exc.includes(elementText) && !element.parentElement.hasAttribute("data-i18n")){
                s += parentPath.join('.') + " "+ elementText+"\n"
            }
            parent.text = elementText;
        }

        if (element.nodeType === 1) {
            const id = element.id;
            let newPath = [...parentPath];
            if (id && id !== "" && id.length > 0 && !result[id]) {
                newPath = [...parentPath, id];
            }

            for (const child of children) {
                traverse(child, newPath);
            }
        }
    }

    traverse(document.body, []);
    console.log(s);
    return result;
}
//listAllTextFragments();

/**
 * Parses all market text fragments and creates the base translation json.
 * @returns {{}}
 */
function buildBaseTranslationObject() {
    let i18nData = {};

    // Select all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');

    // Loop over each element
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        let text = "";
        if($(element).attr("data-i18n-html")){
            text = element.innerHTML;
            let param_els = $(element).find("[data-i18n-parameter]");
            if(param_els.length) {
                param_els.each(function(index) {
                    const placeholder = `\${${index}}`;
                    const outerHTML = $(this)[0].outerHTML;
                    text = text.replace(outerHTML, placeholder);
                });
            }
        }else{
             text = element.textContent;
        }
        text = text.replace(/\n/g, '').replace(/  +/g, ' ').replace('&nbsp;',' ').trim();

        // If key is not already in the i18nData object, add it
        if (!i18nData.hasOwnProperty(key)  ) {
            i18nData[key] = {message: text};
        }
    });

    return i18nData;
}
//const jsonData = buildBaseTranslationObject();

/**
 * Loads all translations and checks if text fragments diverted from the previous state.
 * @returns {{}}
 */
function buildExtendedBaseTranslationObject() {
    let i18scan = buildBaseTranslationObject();
    let langs = ['en', 'de', 'es', 'fr-FR', 'ko', 'zh-CN', 'pt-BR'];
    let translations = {};
    let promises = langs.map(function (lang) {
        return loadTranslations(lang).then(loaded_translation => {
            translations[lang] = loaded_translation;
        }).catch(error => {
            console.error('Error loading translations for ' + lang + ':', error);
        });
    });
    Promise.all(promises).then(() => {
        for (const [current_key, current_value] of Object.entries(i18scan)) {
            for (const [lang, translation] of Object.entries(translations)) {
                if(current_key in translation){
                    if(!('description' in translations[lang][current_key])){
                        console.log("New entry "+current_key+" ("+lang+")")
                        translations[lang][current_key]['description'] = current_value.message;
                        translations[lang][current_key]['status'] = 'new';
                    }else if(translations[lang][current_key]['description'].trim() === current_value.message){
                        translations[lang][current_key]['status'] = null;
                    }else if(translations[lang][current_key]['description'].trim() !== current_value.message){
                        translations[lang][current_key]['status'] = 'changed';
                        console.log("Changed entry "+current_key+" ("+lang+")",
                            translations[lang][current_key]['description'],
                            current_value.message
                            , translations[lang][current_key]['description'].length,current_value.message.length)
                    }
                }else{
                    translations[lang][current_key] = {
                        "message": lang === 'en'? current_value.message : '',
                        "description": current_value.message,
                        "status": 'new',
                    };
                    console.log("New entry "+current_key+" ("+lang+")")
                }
            }
        }
        for (const [lang, translation] of Object.entries(translations)) {
            for (const [fragment_key, i18obj] of Object.entries(translation)) {
                //if(!(fragment_key in i18scan) && !fragment_key.startsWith('tooltip') && !fragment_key.startsWith('popup') && !fragment_key.startsWith('on-')){
                if(!(fragment_key in i18scan) && (fragment_key.startsWith('options') || fragment_key.startsWith('labels')) && translations[lang][fragment_key]['status'] !== 'manual'){
                    translations[lang][fragment_key]['status'] = 'removed';
                    console.log(fragment_key, "has been removed ("+lang+")");
                }

            }
        }
        let langs_non_en = ['de', 'es', 'fr-FR', 'ko', 'zh-CN', 'pt-BR'];
        for (const [fragment_key, i18obj] of Object.entries(translations['en'])) {
            for (const lang  of langs_non_en) {
                if(!(fragment_key in translations[lang])){
                    console.log(fragment_key, " is MISSING ("+lang+")");
                }
            }
        }

        console.log(translations)
    }).catch(error => {
        console.error('Error loading one or more translations:', error);
    });

}

//buildExtendedBaseTranslationObject();