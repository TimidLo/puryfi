let modal_close_action = null;
let modal_ok_action = null;

function createModalWithActions(
   content,
   {
      accept = true,
      cancel = false,
      accept_text = "Accept",
      cancel_text = "Cancel",
   }
) {
   const modal_el = $(`
      <dialog id="modal-container">
         <div id="modal">
            <div id="modal__title">PuryFi - Options</div>
            <div id="modal__content">
               ${content}
            </div>
            <div id="modal__footer">
               ${
                  accept
                     ? `<button id="modal__accept-button">${accept_text}</button>`
                     : ""
               }
               ${
                  cancel
                     ? `<button id="modal__cancel-button">${cancel_text}</button>`
                     : ""
               }
            </div>
         </div>
      </dialog>
   `);

   let respond;
   let response = new Promise((resolve) => {
      respond = resolve;
   });

   let close = (val) => {
      observer.disconnect();
      modal_el.remove();
      respond(val);
   };

   if (accept) {
      modal_el.find("#modal__accept-button").click(() => {
         close(true);
      });
   }
   if (cancel) {
      modal_el.find("#modal__cancel-button").click(() => {
         close(false);
      });
   }

   let observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
         if (mutation.type === "childList") {
            if (!document.body.contains(modal_el[0])) {
               close(false);
               return;
            }
         }
      }
   });
   observer.observe(document, { childList: true, subtree: true });

   modal_el.on("close", () => {
      close(false);
   });

   $("body").append(modal_el);
   modal_el[0].showModal();

   return {
      response: response,
      accept: () => {
         close(true);
      },
      cancel: () => {
         close(false);
      },
   };
}

async function createModal(content, options) {
   let { response } = createModalWithActions(content, options);
   return await response;
}

async function createUnaddressedIssuesModal() {
   const modal_el = $(`
      <dialog id="modal-container">
         <div id="modal">
            <div id="modal__title">PuryFi - Options</div>
            <div id="modal__content" style="display:flex;flex-direction:column;row-gap:0.5rem;">
            </div>
            <div id="modal__footer">
               <button id="modal__cancel-button">Close</button>
            </div>
         </div>
      </dialog>
   `);

   let content_el = modal_el.find("#modal__content");

   // TODO: add a gap once more than one unaddressed issue can be displayed
   let unaddressed_issues_keys = Object.keys(unaddressed_issues);
   for (let i = 0; i < unaddressed_issues_keys.length; i++) {
      let issue = unaddressed_issues_keys[i];

      let title, desc;
      switch (issue) {
         case "FAILED_TO_OPEN_INDEXED_DB":
            title = getI18nStr(
               "on-unaddressed-issue__failed-to-open-indexed-db__title"
            );
            desc = getI18nStr(
               "on-unaddressed-issue__failed-to-open-indexed-db__description"
            );
            break;
         case "VIDEO_PROCESSING_ERROR":
            title = getI18nStr(
               "on-unaddressed-issue__video-processing-exception__title"
            );

            const MAX_LOG_ERRORS_LENGTH = 6;
            let errorLogHtmls = [];
            for (let errorLog of unaddressed_issues[issue].errorLogs) {
               errorLogHtmls.push(`
                  <div style="margin-top:0.75rem;padding:0.5rem 0.25rem 0 0.25rem;box-sizing:border-box;width: 100%;border-top:1px solid var(--caution-button-color)">${errorLog.replace(
                     /\n/g,
                     "<br/>"
                  )}</div>
               `);
            }
            if (MAX_LOG_ERRORS_LENGTH < unaddressed_issues[issue].totalErrorLogs) {
               errorLogHtmls.push(
                  `<div style="margin-top:0.75rem;padding:0.5rem 0.25rem 0 0.25rem;box-sizing:border-box;width: 100%;border-top:1px solid var(--caution-button-color)">And ${
                     unaddressed_issues[issue].totalErrorLogs - MAX_LOG_ERRORS_LENGTH
                  } more...</div>`
               );
            }
            desc = `${getI18nStr(
               "on-unaddressed-issue__video-processing-exception__description",
               "C://PATH/TO/VIDEO/PROCESSOR/ERROR/LOGS"
            )}<br/>${errorLogHtmls.join("")}`;
            break;
         default:
            console.error(`Unknown issue: ${issue}`);
            continue;
      }

      let accordion_container_el = $(`
         <div class="modal__accordion-container">
               <button class="modal__accordion danger no-style-button"><span class="modal__accordion__title">${
                  i + 1
               }. ${title}</span><div class="modal__accordion__icon-container"><svg class="modal__accordion__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24"><path d="M7,10L12,15L17,10H7Z" fill="currentColor"></path></svg></div></button>
               <div class="modal__accordion-content-container"><div class="modal__accordion-content">${desc}
               <label
                  class="modal__dismiss-checkbox-container modal__checkbox-container"
               >
                  <input type="checkbox" class="modal__dismiss-checkbox" value="${issue}"/>${getI18nStr(
         "on-modal__acknowledge-and-dismiss-checkbox"
      )}
               </label>
               </div></div>
            </div>
         `);

      content_el.append(accordion_container_el);
   }

   return await new Promise((resolve) => {
      let return_val = null;

      const closeModal = () => {
         // TODO: do this eagerly not lazily, keep a local variable of the dismissed issues
         for (let issue of Object.keys(unaddressed_issues)) {
            if (
               $(`.modal__dismiss-checkbox[value="${issue}"]`).prop("checked")
            ) {
               delete unaddressed_issues[issue];
            }
         }
         browser.storage.local.set({ unaddressed_issues });
         restoreUnaddressedIssues();

         observer.disconnect();
         modal_el.remove();
         resolve(return_val);
      };

      modal_el.find("#modal__cancel-button").click(() => {
         return_val = false;
         closeModal();
      });

      let observer = new MutationObserver((mutationsList, observer) => {
         for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
               if (!document.body.contains(modal_el[0])) {
                  return_val = false;
                  closeModal();
                  return;
               }
            }
         }
      });
      observer.observe(document, { childList: true, subtree: true });

      modal_el.on("close", () => {
         return_val = false;
         closeModal();
      });

      $("body").append(modal_el);
      modal_el[0].showModal();
   });
}

$("#unaddressed-issues").on("click", function () {
   createUnaddressedIssuesModal();
});

function toggleModalAccordion(accordionEl, active = null) {
   if (active == null) {
      accordionEl.toggleClass("active");
   } else {
      accordionEl.toggleClass("active", active);
   }

   let isActive = accordionEl.hasClass("active");
   let accordionContentEl = accordionEl.find(
      ".modal__accordion-content-container"
   );
   if (isActive) {
      let scroll_height = accordionContentEl.prop("scrollHeight");

      accordionContentEl.stop().animate(
         {
            height: scroll_height + "px",
         },
         {
            duration: scroll_height * 0.75,
            complete: function () {
               accordionContentEl.css("height", "auto");
            },
         }
      );
   } else {
      let scroll_height = accordionContentEl.prop("scrollHeight");
      accordionContentEl.stop().animate(
         {
            height: "0px",
         },
         {
            duration: scroll_height * 0.75,
         }
      );
   }
}

$(document).on(
   "click",
   ".modal__accordion-container .modal__accordion",
   function () {
      let container_el = $(this).closest(".modal__accordion-container");
      if (!container_el.hasClass("active")) {
         container_el.siblings(".modal__accordion-container").each(function () {
            toggleModalAccordion($(this), false);
         });
      }
      toggleModalAccordion(container_el);
   }
);

async function confirmSettingsImport(
   settings,
   is_older_settings = false,
   patreon_tier_required = null
) {
   let keys = [...config_keys_display_order];
   keys = keys.filter((key) => key in settings && key !== "version");

   let keys_html = keys
      .map((key) => `<b>${config_keys_display_names[key]}</b>`)
      .join(", ");

   let { user } = await browser.storage.sync.get(["user"]);
   let is_missing_patreon_features =
      patreon_tier_required &&
      (!user || patreon_tier_required > user.patreon_tier);

   let final_settings = {
      bar_configuration,
      pixel_configuration,
      blur_configuration,
      triangle_configuration,
      box_configuration,
      glitch_configuration,
      sticker_configuration,
      sobel_configuration,
      splatter_configuration,
      random_configuration,
      mixed_configuration,
      clustering_configuration,
      caption_configuration,
      word_wall_configuration,
      only_once_mode_configuration,
      ...settings,
   };

   let are_there_missing_censor_extra_presets = [
      "bar_configuration",
      "blur_configuration",
      "pixel_configuration",
      "glitch_configuration",
      "triangle_configuration",
      "box_configuration",
      "sticker_configuration",
      "sobel_configuration",
      "splatter_configuration",
   ].some((censor_config_key) => {
      for (let censor_preset of final_settings[censor_config_key].presets) {
         if (censor_preset == null) continue;
         if (
            final_settings.clustering_configuration.presets[
               censor_preset.config.cluster_preset_index
            ] == null
         ) {
            if (
               censor_config_key in settings ||
               "clustering_configuration" in settings
            ) {
               return true;
            }
         }

         if (
            final_settings.caption_configuration.presets[
               censor_preset.config.caption_preset_index
            ] == null
         ) {
            if (
               censor_config_key in settings ||
               "caption_configuration" in settings
            ) {
               return true;
            }
         }

         if (
            final_settings.word_wall_configuration.presets[
               censor_preset.config.word_wall_preset_index
            ] == null
         ) {
            if (
               censor_config_key in settings ||
               "word_wall_configuration" in settings
            ) {
               return true;
            }
         }
      }
   });

   let are_there_missing_censor_presets = (() => {
      for (let mixed_preset of final_settings.mixed_configuration.presets) {
         if (mixed_preset == null) continue;

         for (let layer = 0; layer < MIXED_CENSOR_LAYERS_COUNT; layer++) {
            let reverse_censor_type =
               mixed_preset.config.reverse_censor_types[layer];

            if (
               reverse_censor_type != null &&
               reverse_censor_type !== effects.NONE.index
            ) {
               let reverse_censor_preset_index =
                  mixed_preset.config.reverse_censor_preset_indexes[layer];

               let reverse_censor_config_key =
                  effects_by_index[reverse_censor_type].config_key;
               if (
                  final_settings[reverse_censor_config_key].presets[
                     reverse_censor_preset_index
                  ] == null
               ) {
                  if (
                     reverse_censor_config_key in settings ||
                     "mixed_configuration" in settings
                  ) {
                     return true;
                  }
               }
            }

            for (
               let label_type = 0;
               label_type < ALL_LABELS_COUNT;
               label_type++
            ) {
               let censor_type =
                  mixed_preset.config.censor_types[label_type][layer];

               if (censor_type != null && censor_type !== effects.NONE.index) {
                  let censor_preset_index =
                     mixed_preset.config.censor_preset_indexes[label_type][
                        layer
                     ];

                  let censor_config_key =
                     effects_by_index[censor_type].config_key;
                  if (
                     final_settings[censor_config_key].presets[
                        censor_preset_index
                     ] == null
                  ) {
                     if (
                        censor_config_key in settings ||
                        "mixed_configuration" in settings
                     ) {
                        return true;
                     }
                  }
               }
            }
         }
      }

      if (final_settings.only_once_mode_configuration != null) {
         let oom_mode_config =
            final_settings.only_once_mode_configuration.mode_configuration[7];
         let censor_config_key =
            effects_by_index[oom_mode_config.censor_type].config_key;
         if (
            final_settings[censor_config_key].presets[
               oom_mode_config.censor_preset_index
            ] == null
         ) {
            if (
               censor_config_key in settings ||
               "only_once_mode_configuration" in settings
            ) {
               return true;
            }
         }
      }
   })();

   const dialog_html = `
      ${getI18nStr("on-settings-import__confirm")}
      <div class="modal__quote" style="margin-top:0.25rem;">
         ${keys_html}
      </div>
      ${
         settings.lock_configuration?.enabled ||
         are_there_missing_censor_extra_presets ||
         are_there_missing_censor_presets ||
         is_missing_patreon_features ||
         is_older_settings
            ? `
         <div class="modal__quote warning" style="margin-top:0.5rem;">
            ${
               settings.lock_configuration?.enabled
                  ? `-<b> ${getI18nStr(
                       "on-settings-import__lock-warning"
                    )}</b><br/>`
                  : ""
            }
            ${
               are_there_missing_censor_extra_presets
                  ? `-<b> ${getI18nStr(
                       "on-settings-import__missing-censor-extra-presets-warning"
                    )}</b><br/>`
                  : ""
            }
            ${
               are_there_missing_censor_presets
                  ? `-<b> ${getI18nStr(
                       "on-settings-import__missing-censor-presets-warning"
                    )}</b><br/>`
                  : ""
            }
            ${
               is_missing_patreon_features
                  ? `-<b> ${getI18nStr(
                       "on-settings-import__missing-patreon-features-warning"
                    )}</b><br/>`
                  : ""
            }
            ${
               is_older_settings
                  ? `-<b> ${getI18nStr(
                       "on-settings-import__older-version-warning"
                    )}</b><br/>`
                  : ""
            }
         </div>`
            : ""
      }
   `;
   return await createModal(dialog_html, { cancel: true });
}

async function alertNewerSettings() {
   const popup_html = `
      <div class="modal__quote danger">
         -<b> ${getI18nStr("on-settings-import__newer-version-error")}</b>
      </div>
   `;
   return await createModal(popup_html, { cancel: false });
}

async function alertSettingsCorrupted() {
   const popup_html = `
      <div class="modal__quote danger">
         -<b> ${getI18nStr("on-settings-import__corrupted-error")}</b>
      </div> 
   `;
   return await createModal(popup_html, { cancel: false });
}

async function alertNoEmbeddedSettings() {
   const popup_html = `
      <div class="modal__quote danger">
         -<b> ${getI18nStr("on-settings-import__no-embedding")}</b>
      </div> 
   `;
   return await createModal(popup_html, { cancel: false });
}

async function alertSettingsImageNotPng() {
   const popup_html = `
      <div class="modal__quote danger">
         -<b> ${getI18nStr("on-settings-import__non-png-image-error")}</b>
      </div> 
   `;
   return await createModal(popup_html, { cancel: false });
}

async function createConfirm(msg, options) {
   return await createModal(msg, {
      cancel: true,
      ...options,
   });
}

async function createAlert(msg, options) {
   return await createModal(msg, {
      cancel: false,
      ...options,
   });
}
