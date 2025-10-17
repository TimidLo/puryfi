let all_local_settings;

browser.storage.local.get(["settings"]).then((res) => {
   all_local_settings = res.settings ?? {};
   updateQuickSettings();

   browser.storage.onChanged.addListener(function (changes, area) {
      if (area === "local" && changes.settings != null) {
         all_local_settings = changes.settings.newValue;
      }
   });
});

function updateQuickSettings() {
   let $setting_options = $("#settings_name_input .input-select-options");
   $setting_options.empty();
   let is_options_page = $("#login_form").length;
   if (
      all_local_settings &&
      Object.keys(all_local_settings).length >= 1 &&
      !is_options_page
   ) {
      $setting_options.append(`<option value=""></option>`);
   }

   $setting_options.append(`<option value="Default">Default</option>`);

   if (all_local_settings) {
      for (const settings_name in all_local_settings) {
         let option_el = $(
            `<option value="">${replaceHtmlEntities(settings_name)}</option>`
         ).val(settings_name);
         $setting_options.append(option_el);
      }
   }

   updateStorageSettingButtons();
}

$("#settings_name_input .input-select-options").on(
   "click",
   "option",
   function () {
      let val = $(this).val()?.substring(0, 50);
      $("#settings_name_input .input-select-input").val(val);
      $("#settings_name_input .input-select-input").trigger("change");
   }
);

$(document.body).on("click", function (e) {
   if (
      $(e.target).closest(
         "#settings_name_input button.input-select-drop-button"
      ).length
   ) {
      $("#settings_name_input .input-select-options").toggle();
   } else {
      $("#settings_name_input .input-select-options").hide();
   }
});

async function loadSettings(settings_name) {
   if (settings_name === "") {
      return;
   }
   let is_options_page = $("#login_form").length;
   if (settings_name === "Default") {
      let skip_config_keys_reset = skip_config_keys.slice(0);

      browser.runtime
         .sendMessage({
            type: "LOAD_DEFAULT_SETTINGS",
            skip_keys: skip_config_keys_reset,
            version: 2,
         })
         .then(function () {
            requesting_config = requestConfig();
            requesting_config.then(() => {
               restoreOptions();
               createNotification(
                  getI18nStr("on-load-default-settings__success"),
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 14.5C19.1 14.5 20.1 14.9 20.8 15.7L22 14.5V18.5H18L19.8 16.7C19.3 16.3 18.7 16 18 16C16.6 16 15.5 17.1 15.5 18.5S16.6 21 18 21C18.8 21 19.5 20.6 20 20H21.7C21.1 21.5 19.7 22.5 18 22.5C15.8 22.5 14 20.7 14 18.5S15.8 14.5 18 14.5M11.5 18.5C11.5 17.4 11.8 16.4 12.2 15.5H12C10.1 15.5 8.5 13.9 8.5 12S10.1 8.5 12 8.5 15.5 10.1 15.5 12C15.5 12.2 15.5 12.4 15.4 12.5C16.2 12.2 17 12 18 12C18.5 12 19 12.1 19.5 12.2V12C19.5 11.7 19.5 11.3 19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11C4.6 11.3 4.5 11.7 4.5 12S4.5 12.7 4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C11.9 21 11.5 19.8 11.5 18.5Z" fill="currentColor"/></svg>',
                  "success"
               );
            });
         });
      return;
   }
   if (settings_name) {
      let keys = Object.keys(all_local_settings);
      for (const key of keys) {
         if (settings_name === key) {
            let settings = {};
            for (const property in all_local_settings[key]) {
               if (!skip_config_keys.includes(property.replace(/_\d$/, ""))) {
                  settings[property] = all_local_settings[key][property];
               }
            }

            if (settings.caption_configuration_0 != null) {
               settings.caption_configuration = unstoreCaptionConfiguration(
                  settings,
                  CaptionConfigurationMessage
               );
            }

            let patreon_tier_required = getSettingsPatreonTierRequired(
               settings,
               user
            );
            if (patreon_tier_required != null) {
               disableMissingPatreonFeatures(settings, user);
            }

            let { settings: repaired_settings } =
               await browser.runtime.sendMessage({
                  type: "REPAIR_SETTINGS",
                  settings: settings,
                  settings_version: settings.version,
                  version: 2,
               });

            if (repaired_settings.lock_configuration) {
               repaired_settings.lock_configuration.enabled = false;
               repaired_settings.lock_configuration.timestamp = lock_configuration.timestamp;
               repaired_settings.lock_configuration.remote_lock = lock_configuration.remote_lock;
            }

            if (repaired_settings.caption_configuration != null) {
               storeCaptionConfiguration(
                  repaired_settings.caption_configuration,
                  CaptionConfigurationMessage,
                  repaired_settings
               );
               delete repaired_settings.caption_configuration;
            }

            browser.storage.sync.set(repaired_settings).then(function () {
               if (is_options_page) {
                  createNotification(
                     getI18nStr(
                        "on-load-settings__success",
                        `<span class="notification__quote-inline">${replaceHtmlEntities(
                           settings_name
                        )}</span>`
                     ),
                     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 14.5C19.1 14.5 20.1 14.9 20.8 15.7L22 14.5V18.5H18L19.8 16.7C19.3 16.3 18.7 16 18 16C16.6 16 15.5 17.1 15.5 18.5S16.6 21 18 21C18.8 21 19.5 20.6 20 20H21.7C21.1 21.5 19.7 22.5 18 22.5C15.8 22.5 14 20.7 14 18.5S15.8 14.5 18 14.5M11.5 18.5C11.5 17.4 11.8 16.4 12.2 15.5H12C10.1 15.5 8.5 13.9 8.5 12S10.1 8.5 12 8.5 15.5 10.1 15.5 12C15.5 12.2 15.5 12.4 15.4 12.5C16.2 12.2 17 12 18 12C18.5 12 19 12.1 19.5 12.2V12C19.5 11.7 19.5 11.3 19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11C4.6 11.3 4.5 11.7 4.5 12S4.5 12.7 4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C11.9 21 11.5 19.8 11.5 18.5Z" fill="currentColor"/></svg>',
                     "success"
                  );
               }

               requesting_config = requestConfig();
               requesting_config.then(() => restoreOptions());
            });
            break;
         }
      }
   }
}

function exportSettings(filename, obj) {
   let v = getVersion();
   let base64String = encodeSetting(obj);
   const byteNumbers = new Array(base64String.length);
   for (let i = 0; i < base64String.length; i++) {
      byteNumbers[i] = base64String.charCodeAt(i);
   }
   const uint8Array = new Uint8Array(byteNumbers);
   const blob = new Blob([uint8Array], { type: "text/json" });

   browser.runtime.sendMessage({
      type: "SAVE_FILE",
      blob: blob,
      file_ext: "",
      filename: filename + "_" + v,
      save_as: true,
      version: 2,
   });
}

function importSettingsFile(file) {
   if (file.type.startsWith("image/")) {
      if (file.type === "image/png") {
         let reader = new FileReader();
         reader.onload = function (event) {
            let arr = new Uint8Array(event.target.result);
            let metadata = pngMetadata.readMetadata(arr);
            if (
               metadata.tEXt?.PuryFiSettings == null ||
               metadata.tEXt?.PuryFiVersion == null
            ) {
               alertNoEmbeddedSettings();
               return;
            }
            importSettings(
               metadata.tEXt.PuryFiSettings,
               metadata.tEXt.PuryFiVersion
            );
         };
         reader.readAsArrayBuffer(file);
      } else {
         alertSettingsImageNotPng();
      }
   } else {
      let reader = new FileReader();
      reader.onload = function (event) {
         const dec = event.target.result;
         const s = file.name.split("_").pop();
         importSettings(dec, s);
      };
      reader.readAsText(file);
   }
}

async function importSettings(
   data,
   version,
   silent = false,
   remote_import = false,
   allow_older_settings = false,
   replace_lock = false
) {
   let v = version.replace("B", "");
   let compare = compareVersions(browser.runtime.getManifest().version, v);
   if (compare < 0) {
      alertNewerSettings();
   } else {
      const base64String = decrypt(version, data);
      try {
         const decodedString = atob(base64String);
         const settings_import = JSON.parse(decodedString);
         let res = await browser.storage.sync.get(null);
         let settings = {};
         let keys = Object.keys(res);
         for (const property in settings_import) {
            if (
               keys.includes(property) &&
               !skip_config_keys.includes(property.replace(/_\d$/, ""))
            ) {
               settings[property] = settings_import[property];
            }
         }
         if (settings.caption_configuration_0 != null) {
            settings.caption_configuration = unstoreCaptionConfiguration(
               settings,
               CaptionConfigurationMessage
            );
         }

         let patreon_tier_required = getSettingsPatreonTierRequired(
            settings,
            user
         );
         if (patreon_tier_required != null) {
            disableMissingPatreonFeatures(settings, user);
         }

         let { settings: repaired_settings } =
            await browser.runtime.sendMessage({
               type: "REPAIR_SETTINGS",
               settings: settings,
               settings_version: version,
               version: 2,
            });

         if (
            !silent &&
            !allow_older_settings &&
            !(await confirmSettingsImport(
               repaired_settings,
               compare > 0,
               patreon_tier_required
            ))
         )
            return;

         if (repaired_settings.lock_configuration) {
            repaired_settings.lock_configuration.remote_lock = remote_import;

            // TODO: do this in repairSettings
            // If no timestamp then these settings are from before v0.7.9.3, fix them
            if (repaired_settings.lock_configuration.timestamp == null) {
               if (repaired_settings.lock_configuration.timer_mode !== 1) {
                  repaired_settings.lock_configuration.timer_mode = 0;
                  repaired_settings.lock_configuration.timestamp =
                     repaired_settings.lock_configuration.timer_mode;
               } else {
                  repaired_settings.lock_configuration.timestamp =
                     repaired_settings.lock_configuration.duration_timestamp;
               }
            }

            if (!repaired_settings.lock_configuration.enabled) {
               delete repaired_settings.lock_configuration;
            } else if (
               !replace_lock &&
               res.lock_configuration.remote_lock &&
               repaired_settings.lock_configuration.remote_lock &&
               res.lock_configuration.timestamp ===
                  repaired_settings.lock_configuration.timestamp
            ) {
               delete repaired_settings.lock_configuration;
            } else {
               repaired_settings.lock_configuration.duration_timestamp =
                  Date.now();
            }
         }

         if (repaired_settings.caption_configuration != null) {
            storeCaptionConfiguration(
               repaired_settings.caption_configuration,
               CaptionConfigurationMessage,
               repaired_settings
            );
            delete repaired_settings.caption_configuration;
         }
         browser.storage.sync.set(repaired_settings).then(function () {
            if (!silent) {
               createNotification(
                  getI18nStr("on-import-settings__success"),
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 14.5C19.1 14.5 20.1 14.9 20.8 15.7L22 14.5V18.5H18L19.8 16.7C19.3 16.3 18.7 16 18 16C16.6 16 15.5 17.1 15.5 18.5S16.6 21 18 21C18.8 21 19.5 20.6 20 20H21.7C21.1 21.5 19.7 22.5 18 22.5C15.8 22.5 14 20.7 14 18.5S15.8 14.5 18 14.5M11.5 18.5C11.5 17.4 11.8 16.4 12.2 15.5H12C10.1 15.5 8.5 13.9 8.5 12S10.1 8.5 12 8.5 15.5 10.1 15.5 12C15.5 12.2 15.5 12.4 15.4 12.5C16.2 12.2 17 12 18 12C18.5 12 19 12.1 19.5 12.2V12C19.5 11.7 19.5 11.3 19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11C4.6 11.3 4.5 11.7 4.5 12S4.5 12.7 4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C11.9 21 11.5 19.8 11.5 18.5Z" fill="currentColor"/></svg>',
                  "success"
               );
            }

            requesting_config = requestConfig();
            requesting_config.then(() => restoreOptions());
         });
      } catch (e) {
         alertSettingsCorrupted();
      }
   }
}

$("#settings-delete").click(async function () {
   let $input = $("#settings_name_input .input-select-input");
   let settings_name = $input.val()?.substring(0, 50);
   if (settings_name === "Default") {
      return;
   }
   if (settings_name) {
      let keys = Object.keys(all_local_settings);
      for (const key of keys) {
         if (
            settings_name === key &&
            (await createConfirm(
               `${getI18nStr(
                  "on-delete-settings__confirm",
                  `<span class="modal__quote-inline">${replaceHtmlEntities(
                     settings_name
                  )}</span>`
               )}
               <div class="modal__quote warning" style="margin-top:0.5rem">
                  -<b> ${getI18nStr("on-non-reversible-action-warning")}</b>
               </div>`
            ))
         ) {
            delete all_local_settings[key];
            browser.storage.local.set({
               settings: all_local_settings,
            });
            $input.val("");
            createNotification(
               getI18nStr(
                  "on-delete-settings__success",
                  `<span class="notification__quote-inline">${replaceHtmlEntities(
                     settings_name
                  )}</span>`
               ),
               `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.5,18.5c0-1.1,0.3-2.1,0.7-3H12c-1.9,0-3.5-1.6-3.5-3.5s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5c0,0.2,0,0.4-0.1,0.5C16.2,12.2,17,12,18,12c0.5,0,1,0.1,1.5,0.2V12c0-0.3,0-0.7-0.1-1l2.1-1.6c0.2-0.2,0.2-0.4,0.1-0.6l-2-3.5C19.5,5,19.3,5,19,5l-2.5,1c-0.5-0.4-1.1-0.7-1.7-1l-0.4-2.7C14.5,2.2,14.2,2,14,2h-4C9.8,2,9.5,2.2,9.5,2.4L9.1,5.1C8.5,5.3,8,5.7,7.4,6L5,5C4.7,5,4.5,5,4.3,5.3l-2,3.5C2.2,9,2.3,9.2,2.5,9.4L4.6,11c0,0.3-0.1,0.7-0.1,1s0,0.7,0.1,1l-2.1,1.7c-0.2,0.2-0.2,0.4-0.1,0.6l2,3.5C4.5,19,4.7,19,5,19l2.5-1c0.5,0.4,1.1,0.7,1.7,1l0.4,2.7c0,0.2,0.2,0.4,0.5,0.4h2.5C11.9,21,11.5,19.8,11.5,18.5z" fill="currentColor"/><polyline points="20.4,14.5 18,16.9 15.6,14.5 14,16.1 16.4,18.5 14,20.9 15.6,22.5 18,20.1 20.4,22.5 22,20.9 19.6,18.5 22,16.1" fill="currentColor"/></svg>`,
               "success"
            );
            updateQuickSettings();
            break;
         }
      }
   }
});

function updateStorageSettingButtons() {
   let settings_name = $("#settings_name_input .input-select-input")
      .val()
      ?.substring(0, 50);
   if (all_local_settings[settings_name] == null) {
      if (settings_name === "Default") {
         $("#settings-load").prop("disabled", false);
         $(
            "#settings-save, #settings-upload, #settings-export, #settings-delete"
         ).prop("disabled", true);
      } else {
         $("#settings-save").prop("disabled", false);
         $(
            "#settings-load, #settings-upload, #settings-export, #settings-delete"
         ).prop("disabled", true);
      }
   } else {
      $(
         "#settings-load, #settings-save, #settings-upload, #settings-export, #settings-delete"
      ).prop("disabled", false);
   }
}

$("#settings_name_input .input-select-input").on("input change", function () {
   updateStorageSettingButtons();
});

$("#settings-load").click(function () {
   let settings_name = $("#settings_name_input .input-select-input")
      .val()
      ?.substring(0, 50);
   if (all_local_settings[settings_name] == null && settings_name !== "Default")
      return;

   loadSettings(settings_name);
});

function isSettingNameValid(name) {
   if (name.length < 1) {
      createAlert(`
         <div class="modal__quote danger">
            -<b> ${getI18nStr("on-settings-save__no-name-error")}</b>
         </div>
      `);
      return false;
   }
   if (!name.match(/^[\x20-\x7E]*$/)) {
      createAlert(`
         <div class="modal__quote danger">
            -<b> ${getI18nStr(
               "on-settings-save__forbidden-name-chars-error",
               `<span class="modal__quote-inline" data-i18n-parameter="0">${replaceHtmlEntities(
                  name
               )}</span>`
            )}</b>
         </div>
      `);
      return false;
   }
   if (name === "Default") {
      return false;
   }
   return true;
}

function saveSettings() {
   browser.storage.sync.get(null).then(async (res) => {
      let $input = $("#settings_name_input .input-select-input");
      let settings_name = $input.val()?.substring(0, 50);
      if (!isSettingNameValid(settings_name)) return;

      let settings_key = null;
      if (all_local_settings != null) {
         let keys = Object.keys(all_local_settings);
         for (const key of keys) {
            if (settings_name === key) {
               settings_key = key;
               break;
            }
         }
      }

      if (settings_key != null) {
         if (
            await createConfirm(
               `${getI18nStr(
                  "on-save-settings__duplicate-name-error",
                  `<span class="modal__quote-inline">${replaceHtmlEntities(
                     settings_name
                  )}</span>`
               )}
               <div class="modal__quote warning" style="margin-top:0.5rem">
                  -<b> ${getI18nStr("on-non-reversible-action-warning")}</b>
               </div>`
            )
         ) {
            delete all_local_settings[settings_key];
         } else {
            return;
         }
      }

      let setting = createSetting(res, false);
      all_local_settings[settings_name] = setting;
      browser.storage.local
         .set({
            settings: all_local_settings,
         })
         .then(() => {
            createNotification(
               getI18nStr(
                  "on-save-settings__success",
                  `<span class="notification__quote-inline">${replaceHtmlEntities(
                     settings_name
                  )}</span>`
               ),
               `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.2,15.5H12c-1.9,0-3.5-1.6-3.5-3.5s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5c0,0.2,0,0.4-0.1,0.5C16.2,12.2,17,12,18,12c0.5,0,1,0.1,1.5,0.2V12c0-0.3,0-0.7-0.1-1l2.1-1.6c0.2-0.2,0.2-0.4,0.1-0.6l-2-3.5C19.5,5,19.3,5,19,5l-2.5,1c-0.5-0.4-1.1-0.7-1.7-1l-0.4-2.7C14.5,2.2,14.2,2,14,2h-4C9.8,2,9.5,2.2,9.5,2.4L9.1,5.1C8.5,5.3,8,5.7,7.4,6L5,5C4.7,5,4.5,5,4.3,5.3l-2,3.5C2.2,9,2.3,9.2,2.5,9.4L4.6,11c0,0.3-0.1,0.7-0.1,1s0,0.7,0.1,1l-2.1,1.7c-0.2,0.2-0.2,0.4-0.1,0.6l2,3.5C4.5,19,4.7,19,5,19l2.5-1c0.5,0.4,1.1,0.7,1.7,1l0.4,2.7c0,0.2,0.2,0.4,0.5,0.4h2.5c-0.7-1.1-1.1-2.3-1.1-3.6C11.5,17.4,11.8,16.4,12.2,15.5z" fill="currentColor"/><path d="M20.2,14.5h-5.3c-0.5,0-0.9,0.4-0.9,0.9v6.2c0,0.5,0.4,0.9,0.9,0.9h6.2c0.5,0,0.9-0.4,0.9-0.9v-5.3L20.2,14.5z M18,21.6c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3s1.3,0.6,1.3,1.3S18.7,21.6,18,21.6z M19.3,17.2h-4.4v-1.8h4.4V17.2z" fill="currentColor"/></svg>`,
               "success"
            );
            updateQuickSettings();
         });
   });
}

$("#settings-save").click(function () {
   saveSettings();
});

// $('#settings-export-current').click(function(){
//     let setting = {};
//     let c = browser.storage.sync.get(null);
//     c.then((res) => {
//         let take = [];
//         $('.puryfi-settings-toggle-grid input').each(function (i, elem){
//             if($(elem).is(':checked')){
//                 take.push($(elem).attr("id"));
//             }
//         });
//         for (const property in res) {
//             if (!skip_config_keys.includes(property) && take.includes(property)) {
//                 setting[property] = res[property];
//             }
//         }
//         let setting_name = $('#settings-name').val() ? $('#settings-name').val() : 'settings';
//         exportSettings(setting_name, setting);
//     });
// });

$("#settings-export").click(function () {
   let setting_name = $("#settings_name_input .input-select-input")
      .val()
      ?.substring(0, 50);
   if (setting_name === "") {
      return;
   }
   if (setting_name === "Default") {
      return;
   }

   if (setting_name) {
      let setting = {};
      for (const prop in all_local_settings[setting_name]) {
         if (!skip_config_keys.includes(prop.replace(/_\d$/, ""))) {
            setting[prop] = all_local_settings[setting_name][prop];
         }
      }
      exportSettings(setting_name, setting);
   }
});

$("#settings-import").on("change", function () {
   let files = $(this).prop("files");
   if (files && files[0]) {
      importSettingsFile(files[0]);
   }
});

$(".puryfi-settings-toggle-header").on("click", function () {
   let $checkboxes = $(this).next(".puryfi-settings-toggle-grid").find("input");
   let all_checked = $checkboxes
      .toArray()
      .every((checkbox) => checkbox.checked);
   $checkboxes.prop("checked", !all_checked);
});

$("#settings-import-cloud").click(function () {
   let val = $("#settings-import-cloud-identifier").val();
   val = val.replace("puryfi-settings:", "");
   if (val) {
      importCloudSettings(val);
   }
});

$("#settings-upload").click(function () {
   let setting_name = $("#settings_name_input .input-select-input")
      .val()
      ?.substring(0, 50);
   if (setting_name === "") {
      return;
   }
   if (setting_name === "Default") {
      return;
   }
   $(".settings-upload").prop("disabled", true);

   let version = getVersion();
   if (setting_name) {
      let keys = Object.keys(all_local_settings);
      for (const key of keys) {
         if (setting_name === key) {
            let setting = {};
            for (const property in all_local_settings[key]) {
               if (!skip_config_keys.includes(property.replace(/_\d$/, ""))) {
                  setting[property] = all_local_settings[key][property];
               }
            }
            let configs = Object.keys(setting).join(",");
            uploadSettings(
               setting_name,
               version,
               configs,
               encodeSetting(setting)
            );
         }
      }
   }
});

function uploadSettings(name, version, configs, settings) {
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      if (res.user == null) {
         createAlert(`<div class="modal__quote danger">
            -<b> ${getI18nStr("on-settings-upload__no-user-error")}</b>
         </div> `);
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/cloud_settings/upload";
      let params =
         "username=" +
         encodeURIComponent(res.user.username) +
         "&password=" +
         encodeURIComponent(res.user.password);
      params += "&name=" + encodeURIComponent(name);
      params += "&version=" + encodeURIComponent(version);
      params += "&configs=" + encodeURIComponent(configs);
      params += "&settings=" + encodeURIComponent(settings);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let identifier = JSON.parse(this.responseText);
               if (identifier) {
                  if (identifier.hasOwnProperty("error")) {
                     createAlert(`<div class="modal__quote danger">
                     -<b> ${replaceHtmlEntities(identifier.error)}.</b>
                     </div>`);
                  } else {
                     $("#settings-cloud-copy-identifier").val(
                        "puryfi-settings:" + identifier
                     );

                     createAlert(`
                        ${getI18nStr(
                           "on-settings-upload__success",
                           `<span class="modal__quote-inline">${replaceHtmlEntities(
                              name
                           )}</span>`
                        )}
                        <div class="modal__quote-clipboard-copy" style="margin-top:0.25rem;">
                           puryfi-settings:${identifier}
                           <div class="modal__quote-clipboard-copy__icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"><path d="M4 7H2V21C2 22.1 2.9 23 4 23H18V21H4M20 3H16.8C16.4 1.8 15.3 1 14 1C12.7 1 11.6 1.8 11.2 3H8C6.9 3 6 3.9 6 5V17C6 18.1 6.9 19 8 19H20C21.1 19 22 18.1 22 17V5C22 3.9 21.1 3 20 3M14 3C14.6 3 15 3.5 15 4C15 4.5 14.5 5 14 5C13.5 5 13 4.5 13 4C13 3.5 13.4 3 14 3Z" fill="currentColor"/></svg>
                           </div>
                        </div>
                     `);
                  }
               }
               reEnableCloudUpload();
            } catch (e) {
               log(e);
               reEnableCloudUpload();
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         log(e);
         reEnableCloudUpload();
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

function importCloudSettings(
   identifier,
   silent = false,
   remote_import = false,
   allow_older_settings = false,
   replace_lock = false
) {
   let xmlhttp = new XMLHttpRequest();
   let url = "https://pury.fi/site/wp-json/cloud_settings/load";
   let params = "identifier=" + encodeURIComponent(identifier);
   xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         try {
            let data = JSON.parse(this.responseText);
            if (data) {
               if (data.hasOwnProperty("error")) {
                  createAlert(`<div class="modal__quote danger">
                  -<b> ${replaceHtmlEntities(data.error)}.</b>
                  </div>`);
               } else {
                  importSettings(
                     data["settings"],
                     data["version"],
                     silent,
                     remote_import,
                     allow_older_settings,
                     replace_lock
                  );
               }
            }
         } catch (e) {
            log(e);
         }
      }
   };
   xmlhttp.ontimeout = function (e) {
      log(e);
   };
   xmlhttp.open("POST", url, true);
   xmlhttp.timeout = 1000;
   xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
   );
   xmlhttp.send(params);
}

function cloud_delete_settings(identifier) {
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      if (res.user == null) {
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/cloud_settings/delete";
      let params =
         "username=" +
         encodeURIComponent(res.user.username) +
         "&password=" +
         encodeURIComponent(res.user.password);
      params += "&identifier=" + encodeURIComponent(identifier);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               updateCloudSettingsOverview();
            } catch (e) {
               updateCloudSettingsOverview();
               log(e);
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         updateCloudSettingsOverview();
         log(e);
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

function reEnableCloudUpload() {
   setTimeout(() => {
      $(".settings-upload").prop("disabled", false);
   }, 1000);
}

$("#settings_upload_modal_close").click(function () {
   hideModalWindow("#settings_upload_modal");
});

function updateCloudSettingsOverview() {
   $("#cloud-stored-settings").find("tbody").empty();
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      if (res.user == null) {
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/cloud_settings/info";
      let params =
         "username=" +
         encodeURIComponent(res.user.username) +
         "&password=" +
         encodeURIComponent(res.user.password);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               if (data) {
                  if (data.hasOwnProperty("error")) {
                     createAlert(`<div class="modal__quote danger">
                     -<b> ${replaceHtmlEntities(identifier.error)}.</b>
                     </div>`);
                  } else {
                     data["settings"].forEach(function (settings_entry, index) {
                        $("#settings-storage-current").html(
                           data.info.storage_current
                        );
                        $("#settings-storage-max").html(data.info.storage_max);
                        $("#cloud-stored-settings")
                           .find("tbody")
                           .append(
                              $("<tr>")
                                 .append(
                                    $(
                                       '<td class="cloud-settings-copy" style="display: flex;position:relative;" draggable="true">'
                                    )
                                       .append(
                                          $(
                                             '<div class="cloud-settings-draggable" draggable="true">'
                                          ).text(
                                             "puryfi-settings:" +
                                                settings_entry.identifier
                                          )
                                       )
                                       .append(
                                          $(
                                             '<div style="margin-left: 5px;">' +
                                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="cursor:pointer;margin-left:2px;"><path d="M4 7H2V21C2 22.1 2.9 23 4 23H18V21H4M20 3H16.8C16.4 1.8 15.3 1 14 1C12.7 1 11.6 1.8 11.2 3H8C6.9 3 6 3.9 6 5V17C6 18.1 6.9 19 8 19H20C21.1 19 22 18.1 22 17V5C22 3.9 21.1 3 20 3M14 3C14.6 3 15 3.5 15 4C15 4.5 14.5 5 14 5C13.5 5 13 4.5 13 4C13 3.5 13.4 3 14 3Z" fill="currentColor"/></svg>' +
                                                "</div>"
                                          )
                                       )
                                 )
                                 .append($("<td>").text(settings_entry.name))
                                 .append($("<td>").text(settings_entry.version))
                                 .append(
                                    $("<td>").text(settings_entry.downloads)
                                 )
                                 .append(
                                    $("<td>").append(
                                       $(
                                          '<i class="fas fa-info-circle cloud-config-tooltip"></i><div cloud_config_data="' +
                                             settings_entry.configs +
                                             '"></div>'
                                       )
                                    )
                                 )
                                 .append(
                                    $("<td>").append(
                                       $(
                                          '<button cloud_identifier="' +
                                             settings_entry.identifier +
                                             '" class="icon-btn cloud-settings-delete">'
                                       ).append(
                                          $('<i class="fa fa-trash"></i>')
                                       )
                                    )
                                 )
                           );
                     });
                  }
               }
               reEnableCloudUpload();
            } catch (e) {
               log(e);
               reEnableCloudUpload();
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         log(e);
         reEnableCloudUpload();
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

$("a[content='content-cloud']").click(function () {
   updateCloudSettingsOverview();
});
$("#refresh-cloud-settings").click(function () {
   updateCloudSettingsOverview();
});
$("#cloud-stored-settings").on(
   "click",
   ".cloud-settings-delete",
   async function () {
      let identifier = $(this).attr("cloud_identifier");
      if (
         await createConfirm(
            `${getI18nStr(
               "on-delete-cloud-settings__confirm",
               `<span class="modal__quote-inline">${replaceHtmlEntities(
                  identifier
               )}</span>`
            )}
            <div class="modal__quote warning" style="margin-top:0.5rem">
               -<b> ${getI18nStr("on-non-reversible-action-warning")}</b>
            </div>`
         )
      ) {
         identifier = identifier.replace("puryfi-settings:", "");
         cloud_delete_settings(identifier);
      }
   }
);

$("#cloud-stored-settings").on("click", ".cloud-settings-copy", function () {
   navigator.clipboard.writeText($(this).text());
   createClipboardCopyNotification($(this), "+0");
});

let stp_displayed = null;
$("#cloud-stored-settings").on(
   "mouseenter",
   ".cloud-config-tooltip",
   function () {
      if (stp_displayed != $(this)) {
         let data = $(this).parent().find("div").attr("cloud_config_data");
         data = data.split(",");
         let html = "<ul>";
         for (let i = 0; i < data.length; i++) {
            html += "<li>" + data[i] + "</li>";
         }
         html += "</ul>";
         $("#settings-cloud-copy-tooltip").tooltip("open");
         $("#settings-cloud-copy-tooltip").attr("tooltip", "cloud-config-data");
         $("#settings-cloud-copy-tooltip").trigger("mouseover");
         $("#settings-affected-configurations").html(html);

         setTimeout(function () {
            if (stp_displayed == $(this)) {
               $("#settings-cloud-copy-tooltip").tooltip("close");
               $("#settings-cloud-copy-tooltip").removeAttr("tooltip");
            }
         }, 1000);
      }
   }
);

$("#cloud-stored-settings").on(
   "mouseleave",
   ".cloud-config-tooltip",
   function () {
      $("#settings-cloud-copy-tooltip").tooltip({ hide: false });
      $("#settings-cloud-copy-tooltip").tooltip("close");
      $("#settings-cloud-copy-tooltip").removeAttr("tooltip");
      $("#settings-cloud-copy-tooltip").tooltip({ hide: true });
   }
);

$("#settings_import_dropzone").on("dragover", function (e) {
   e.preventDefault();
});

$("#settings_import_dropzone").on("dragenter", function (e) {
   e.preventDefault();
});

$("#settings_import_dropzone").on("drop", function (e) {
   let files = e.originalEvent.dataTransfer?.files;
   if (files == null) return;
   e.preventDefault();
   $("#settings-import").prop("files", files);
   $("#settings-import").trigger("change");
});

// Saving Configuration

function restoreSavingConfig() {
   $("#settings_sc_toggles .on-off-toggle").each(function () {
      $(this).toggleClass(
         "checked",
         saving_configuration.actions[$(this).attr("value")]
      );
   });
   let reason = isLockConfigNotValid(lock_configuration);
   if (!reason) {
      $("#invalid-lock-tooltip-icon").hide();
      $("#lock-button").removeClass("disabled");
      $("#lock_button_disabled_reason").html("");
   } else {
      $("#invalid-lock-tooltip-icon").show();
      $("#lock_button_disabled_reason").html(reason);
      $("#lock-button").addClass("disabled");
   }
   $("#settings_sc_toggles .on-off-toggle[value='lock_extension']").toggleClass(
      "disabled",
      reason != null
   );

   $("#settings-sc-dropdowns input[type='checkbox']").each(function () {
      if (!$(this).attr("value")) return;
      $(this).prop("checked", saving_configuration.keys[$(this).attr("value")]);
   });

   $(".settings-sc-popup").each(function () {
      let checkbox_els = $(this).find("input[type='checkbox']");
      let checked_count = 0;
      checkbox_els.toArray().forEach(function (el) {
         if ($(el).is(":checked")) {
            checked_count++;
         }
      });

      let section_checkbox_el = $(this)
         .closest(".settings-sc-dropdown")
         .find(".settings-sc-toggle");
      if (
         0 < checked_count &&
         checked_count < $(this).find("input[type='checkbox']").length
      ) {
         section_checkbox_el.addClass("partially-checked");
         section_checkbox_el.prop("checked", false);
      } else {
         section_checkbox_el.removeClass("partially-checked");
         section_checkbox_el.prop("checked", checked_count);
      }
   });
}

function saveSavingConfig() {
   $("#settings_sc_toggles .on-off-toggle").each(function () {
      saving_configuration.actions[$(this).attr("value")] =
         $(this).hasClass("checked");
   });
   if (isLockConfigNotValid(lock_configuration)) {
      saving_configuration.actions.lock_extension = false;
   }

   $("#settings-sc-dropdowns input[type='checkbox']").each(function () {
      if (!$(this).attr("value")) return;
      saving_configuration.keys[$(this).attr("value")] = $(this).is(":checked");
   });

   restoreSavingConfig();
   browser.storage.sync.set({
      saving_configuration: saving_configuration,
   });
}

$(document).on("click", function (e) {
   let advanced_toggle_el = $(e.target).closest(".settings-sc-modal-button");
   let advanced_popup_el = $(e.target)
      .closest(".settings-sc-dropdown")
      .find(".settings-sc-popup");

   $(".settings-sc-popup").not(advanced_popup_el).hide();
   if (advanced_toggle_el.length) {
      advanced_popup_el.toggle();
      e.preventDefault();
   }
});

$(".settings-sc-toggle").on("change", function () {
   let checkbox_els = $(this)
      .closest(".settings-sc-dropdown")
      .find(".settings-sc-popup input[type='checkbox']");

   $(this).removeClass("partially-checked");
   checkbox_els.prop("checked", $(this).is(":checked"));
   saveSavingConfig();
});

$(document).on("change", ".save-saving-config", async function () {
   await requesting_config;
   saveSavingConfig();
});

$(document).on("click", ".save-saving-config-on-click", async function () {
   await requesting_config;
   saveSavingConfig();
});
