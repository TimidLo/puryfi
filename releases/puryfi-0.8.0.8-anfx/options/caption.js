let caption_tag_color_picker_els = [];

let is_setting_caption_tags = false;

async function trySavingCaptionConfig(onSuccess, onError) {
   let res = tryStoreCaptionConfiguration(
      caption_configuration,
      CaptionConfigurationMessage
   );

   if (res.success) {
      await browser.storage.sync.set(res.settings);
      onSuccess?.();
   } else {
      onError?.();
      createNotification(
         getI18nStr("on-save-caption-config__storage-quota-exceeded-error"),
         '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18,8H16V4H18M15,8H13V4H15M12,8H10V4H12M18,2H10L4,8V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z" fill="currentColor"/></svg>',
         "danger"
      );

      is_requesting_config = true;
      requesting_config = browser.storage.sync
         .get(CAPTION_CONFIGURATION_KEYS)
         .then((res) => {
            caption_configuration = unstoreCaptionConfiguration(
               res,
               CaptionConfigurationMessage
            );

            let preset = getSelectedPreset(caption_configuration);
            updateCaptionPresetConfig(preset);

            is_requesting_config = false;
         });
      await requesting_config;
   }
}

let updateCaptionPresetConfigTimeout = null;
let saveCaptionPresetConfigTimeout = null;

function onCaptionConfigChange(fn) {
   return async function () {
      await requesting_config;
      let preset = getSelectedPreset(caption_configuration);

      let {
         render = false,
         save = false,
         onSaveSuccess = null,
         onSaveError = null,
      } = fn.apply(this, [preset, ...arguments]) ?? {};

      if (render) {
         if (updateCaptionPresetConfigTimeout == null) {
            updateCaptionPresetConfigTimeout = setTimeout(async function () {
               updateCaptionPresetConfig(preset);
               updateCaptionPresetConfigTimeout = null;
            });
         }
      }
      if (save) {
         if (saveCaptionPresetConfigTimeout == null) {
            saveCaptionPresetConfigTimeout = setTimeout(async function () {
               await trySavingCaptionConfig(onSaveSuccess, onSaveError);
               saveCaptionPresetConfigTimeout = null;
            }, 0);
         }
      }
   };
}

$("#ct_tags_set").on("click", async function (e) {
   if (!$(".ct-entry.selected").length && !is_setting_caption_tags) {
      createDangerArrowTooltip(
         $("#ct_tags_set_container"),
         getI18nStr("on-assign-caption-tags__no-entries-selected-error")
      );
      return;
   }

   is_setting_caption_tags = !is_setting_caption_tags;
   if (is_setting_caption_tags) {
      createPersistentArrowTooltip(
         $("#ct_tags_scroll")[0],
         getI18nStr("tooltip__censor__modes__caption__assign-tags-help"),
         {
            id: "tooltip__censor__modes__caption__assign-tags-help",
            position_my: "right-8 center+38",
            position_at: "left top",
            arrow_position: "left",
         }
      );
   } else {
      removePersistentArrowTooltip(
         "tooltip__censor__modes__caption__assign-tags-help"
      );
   }
   $(this).toggleClass("active", is_setting_caption_tags);
});

$(document).on("click", function (e) {
   if (
      $(e.target).closest(
         "#tooltip__censor__modes__caption__assign-tags-help, #ct_tags_set, .ct-tag"
      ).length
   )
      return;
   is_setting_caption_tags = false;
   $(".ct-sidebar").removeClass("ct-tags-set-active");
   removePersistentArrowTooltip(
      "tooltip__censor__modes__caption__assign-tags-help"
   );
   $("#ct_tags_set").removeClass("active");
});

$("#ct_tags_add").on("click", async function () {
   await requesting_config;

   let index = $(".ct-tag").length;
   let color = picker_swatches[index % picker_swatches.length];

   let preset = getSelectedPreset(caption_configuration);

   if (CAPTION_TAG_COUNT_LIMIT <= Object.keys(preset.config.tags).length) {
      createDangerArrowTooltip(
         $("#ct_tags_add_container"),
         getI18nStr("on-add-caption-tag__count-limit-error")
      );
      return;
   }

   let id = generateUidForObject(preset.config.tags);
   preset.config.tags[id] = new CaptionTag(`Tag ${index + 1}`, color);

   if (updateCaptionPresetConfigTimeout == null) {
      updateCaptionPresetConfigTimeout = setTimeout(function () {
         let selected_tag_ids = $(".ct-tag.selected")
            .map(function () {
               return $(this).data("id");
            })
            .toArray();
         selected_tag_ids.push(id);

         updateCaptionPresetConfig(preset, false, { selected_tag_ids });
         let tag_el = $(`.ct-tag[data-id="${id}"]`);
         tag_el.addClass("selected");
         tag_el.find(".ct-tag-label").focus().select();
         updateCaptionPresetConfigTimeout = null;
      });
   }

   if (saveCaptionPresetConfigTimeout == null) {
      saveCaptionPresetConfigTimeout = setTimeout(async function () {
         await trySavingCaptionConfig();
         saveCaptionPresetConfigTimeout = null;
      });
   }
});

$(document).on(
   "click",
   ".ct-tag-x",
   onCaptionConfigChange(function (preset) {
      let id = $(this).closest(".ct-tag").data("id");

      let selected_tag_ids = $(".ct-tag.selected")
         .map(function () {
            return $(this).data("id");
         })
         .toArray();

      if (selected_tag_ids.includes(id)) {
         for (let tag_id of selected_tag_ids) {
            for (let entry of Object.values(preset.config.entries)) {
               let index = entry.tags.indexOf(tag_id);
               if (index !== -1) {
                  entry.tags.splice(index, 1);
               }
            }
            delete preset.config.tags[tag_id];
         }
      } else {
         for (let entry of Object.values(preset.config.entries)) {
            let index = entry.tags.indexOf(id);
            if (index !== -1) {
               entry.tags.splice(index, 1);
            }
         }
         delete preset.config.tags[id];
      }

      return { render: true, save: true };
   })
);

$(document).on(
   "change",
   ".ct-tag-label",
   onCaptionConfigChange(function (preset) {
      let id = $(this).closest(".ct-tag").data("id");
      let name = $(this).val()?.substring(0, CAPTION_TAG_NAME_CHAR_LIMIT);

      if (!preset.config.tags[id]) return;
      preset.config.tags[id].name = name;

      return { render: true, save: true };
   })
);

let caption_tag_range_selection_info = null;

$(document).on(
   "click",
   ".ct-tag",
   onCaptionConfigChange(function (preset, e) {
      if (is_setting_caption_tags) {
         let selected_entry_els = $(".ct-entry.selected");

         let selected_entries = [];
         selected_entry_els.each(function () {
            let id = $(this).data("id");
            selected_entries.push(preset.config.entries[id]);
         });

         let tag_id = $(this).data("id");

         let should_remove = selected_entries.every((entry) =>
            entry.tags.includes(tag_id)
         );
         if (should_remove) {
            for (let entry of selected_entries) {
               let index = entry.tags.indexOf(tag_id);
               entry.tags.splice(index, 1);
            }
            $(this).removeAttr("tag-remove");
            $(this).attr("tag-add", "true");
         } else {
            let did_add = false;
            for (let entry of selected_entries) {
               if (
                  entry.tags.length < CAPTION_ENTRY_MAX_TAGS &&
                  !entry.tags.includes(tag_id)
               ) {
                  entry.tags.push(tag_id);
                  did_add = true;
               }
            }
            if (did_add) {
               $(this).attr("tag-remove", "true");
               $(this).removeAttr("tag-add");
            }
         }
      } else {
         if (is_shift_down) {
            if (
               caption_tag_range_selection_info == null ||
               !$(caption_tag_range_selection_info.anchor).is(":visible")
            ) {
               caption_tag_range_selection_info = {
                  anchor: this,
               };
               $(this).addClass("selected");
            } else {
               let tag_els = $(".ct-tag");
               let tag_els_sorted_by_order = tag_els.toArray().sort((a, b) => {
                  return $(a).css("order") - $(b).css("order");
               });
               $(caption_tag_range_selection_info.last_selected).removeClass(
                  "selected"
               );

               let anchor_index = tag_els_sorted_by_order.indexOf(
                  caption_tag_range_selection_info.anchor
               );
               let current_index = tag_els_sorted_by_order.indexOf(this);

               caption_tag_range_selection_info.last_selected =
                  tag_els_sorted_by_order.slice(
                     Math.min(anchor_index, current_index),
                     Math.max(anchor_index, current_index) + 1
                  );
               for (let tag_el of caption_tag_range_selection_info.last_selected) {
                  $(tag_el).addClass("selected");
               }
            }
         } else if (is_ctrl_down) {
            let is_selected = $(this).hasClass("selected");
            if (is_selected) {
               $(this).removeClass("selected");
            } else {
               $(this).addClass("selected");
               caption_tag_range_selection_info = {
                  anchor: this,
               };
            }
         } else {
            if (
               $(e.target).closest(".ct-tag-x, .ct_tag_color_picker_toggle")
                  .length
            )
               return;
            let label_el = $(this).find(".ct-tag-label");
            if (1 < e.detail) {
               if (!label_el.is(":focus")) {
                  caption_tag_range_selection_info = {
                     anchor: this,
                  };
                  $(this).addClass("selected");
               }
            } else if (!label_el.is(":focus")) {
               if (
                  1 < $(".ct-tag.selected").length &&
                  $(this).hasClass("selected")
               ) {
                  caption_tag_range_selection_info = null;
                  $(".ct-tag").not(this).removeClass("selected");
               } else {
                  $(".ct-tag").not(this).removeClass("selected");
                  let is_selected = $(this).hasClass("selected");
                  if (!is_selected) {
                     caption_tag_range_selection_info = {
                        anchor: this,
                     };
                     $(this).addClass("selected");
                  } else {
                     caption_tag_range_selection_info = null;
                     $(this).removeClass("selected");
                  }
               }
            }
         }

         $(this).find(".ct-tag-label").trigger("change");
      }
      return { render: true, save: true };
   })
);

$(document).on("mouseenter", ".ct-tag", async function () {
   await requesting_config;

   if (is_setting_caption_tags) {
      let preset = getSelectedPreset(caption_configuration);
      let tag_id = $(this).data("id");

      let selected_entry_els = $(".ct-entry.selected");

      let should_remove =
         selected_entry_els.length &&
         selected_entry_els.toArray().every((entry_el) => {
            let entry = preset.config.entries[$(entry_el).data("id")];
            return entry.tags.includes(tag_id);
         });

      if (should_remove) {
         $(this).attr("tag-remove", "true");
         $(this).removeAttr("tag-add");
      } else {
         $(this).removeAttr("tag-remove");
         $(this).attr("tag-add", "true");
      }
   }
});

$(document).on("mouseleave", ".ct-tag", function () {
   if (is_setting_caption_tags) {
      $(this).removeAttr("tag-remove");
      $(this).removeAttr("tag-add");
   }
});

$("#ct_tags_scroll").on(
   "click",
   onCaptionConfigChange(function (preset, e) {
      if (
         $(e.target).closest(".ct-tag, #ct_tags_add").length ||
         is_shift_down ||
         is_ctrl_down ||
         is_setting_caption_tags
      )
         return;

      $(".ct-tag").removeClass("selected");
      caption_tag_range_selection_info = null;

      return { render: true };
   })
);

$(document).on("dblclick", ".ct-tag", function (e) {
   if ($(e.target).closest(".ct-tag-x, .ct_tag_color_picker_toggle").length)
      return;
   if (!is_shift_down && !is_ctrl_down && !is_setting_caption_tags) {
      $(this).find(".ct-tag-label").focus();
   }
});

// ct_tags_scroll_instance.on("scroll", function () {
//    $(".ct-tag-color-picker-toggle").removeClass("active");
//    for (let picker of caption_tag_color_picker_els) picker.hide();
// });

document.addEventListener("scroll", () => {
   $(".ct-tag-color-picker-toggle").removeClass("active");
   for (let picker of caption_tag_color_picker_els) picker.hide();
});

let is_adding_entries = false;
function addEntry(preset) {
   if (CAPTION_ENTRY_COUNT_LIMIT <= Object.keys(preset.config.entries).length) {
      createDangerArrowTooltip(
         $("#ct_entries_add_container"),
         getI18nStr("on-add-caption-entry__count-limit-error")
      );
      return;
   }

   let selected_tag_ids = $(".ct-tag.selected")
      .map(function () {
         return $(this).data("id");
      })
      .toArray();

   let id = generateUidForObject(preset.config.entries);
   preset.config.entries[id] = new CaptionEntry(
      "",
      1,
      sequence(ALL_LABELS_COUNT),
      selected_tag_ids
   );

   is_adding_entries = true;

   if (updateCaptionPresetConfigTimeout == null) {
      updateCaptionPresetConfigTimeout = setTimeout(function () {
         let selected_entry_ids = $(".ct-entry.selected")
            .map(function () {
               return $(this).data("id");
            })
            .toArray();
         selected_entry_ids.push(id);

         updateCaptionPresetConfig(preset, false, { selected_entry_ids });
         let entry_el = $(`.ct-entry[data-id="${id}"]`);
         entry_el.addClass("selected");
         entry_el.find(".ct-entry-label").focus().select();

         updateCaptionPresetConfigTimeout = null;
      });
   }

   if (saveCaptionPresetConfigTimeout == null) {
      saveCaptionPresetConfigTimeout = setTimeout(async function () {
         await trySavingCaptionConfig();
         saveCaptionPresetConfigTimeout = null;
      });
   }
}

$("#ct_entries_add").on("click", async function () {
   await requesting_config;

   let preset = getSelectedPreset(caption_configuration);
   addEntry(preset);
});

$(document).on(
   "click",
   ".ct-entry-x",
   onCaptionConfigChange(function (preset) {
      let id = $(this).closest(".ct-entry").data("id");

      let selected_entry_ids = $(".ct-entry.selected")
         .map(function () {
            return $(this).data("id");
         })
         .toArray();

      if (selected_entry_ids.includes(id)) {
         for (let entry_id of selected_entry_ids) {
            delete preset.config.entries[entry_id];
         }
      } else {
         delete preset.config.entries[id];
      }

      return { render: true, save: true };
   })
);

$(document).on(
   "change",
   ".ct-entry-label",
   onCaptionConfigChange(function (preset) {
      let id = $(this).closest(".ct-entry").data("id");
      if (!preset.config.entries[id]) return;

      let value = $(this).val()?.substring(0, CAPTION_ENTRY_VALUE_CHAR_LIMIT);

      let processedValue = value.replace(/\s\s+/, " ").trim();
      if (value !== processedValue) {
         $(this).val(processedValue);
      }

      preset.config.entries[id].value = processedValue;

      return { render: true, save: true };
   })
);

$(document).on(
   "blur",
   ".ct-entry-label",
   onCaptionConfigChange(function (preset) {
      let id = $(this).closest(".ct-entry").data("id");
      let value = $(this).val()?.substring(0, CAPTION_ENTRY_VALUE_CHAR_LIMIT);

      if (!preset.config.entries[id]) return;

      if (!value) {
         delete preset.config.entries[id];
         is_adding_entries = false;

         return { render: true, save: true };
      }
   })
);

$(document).on("keydown", ".ct-entry-label", async function (e) {
   await requesting_config;

   if (is_adding_entries && e.key === "Enter") {
      let preset = getSelectedPreset(caption_configuration);
      addEntry(preset);
   }
});

let caption_entry_range_selection_info = null;

$(document).on(
   "click",
   ".ct-entry",
   onCaptionConfigChange(function (preset, e) {
      if (is_shift_down) {
         if (
            caption_entry_range_selection_info == null ||
            !$(caption_entry_range_selection_info.anchor).is(":visible")
         ) {
            caption_entry_range_selection_info = {
               anchor: this,
            };
            $(this).addClass("selected");
         } else {
            let entry_els = $(".ct-entry");
            let entry_els_sorted_by_order = entry_els.toArray().sort((a, b) => {
               return $(a).css("order") - $(b).css("order");
            });
            $(caption_entry_range_selection_info.last_selected).removeClass(
               "selected"
            );

            let anchor_index = entry_els_sorted_by_order.indexOf(
               caption_entry_range_selection_info.anchor
            );
            let current_index = entry_els_sorted_by_order.indexOf(this);

            caption_entry_range_selection_info.last_selected =
               entry_els_sorted_by_order.slice(
                  Math.min(anchor_index, current_index),
                  Math.max(anchor_index, current_index) + 1
               );
            for (let entry_el of caption_entry_range_selection_info.last_selected) {
               $(entry_el).addClass("selected");
            }
         }
      } else if (is_ctrl_down) {
         let is_selected = $(this).hasClass("selected");
         if (is_selected) {
            $(this).removeClass("selected");
         } else {
            $(this).addClass("selected");
            caption_entry_range_selection_info = {
               anchor: this,
            };
         }
      } else {
         if ($(e.target).closest(".ct-entry-x").length) return;
         let label_el = $(this).find(".ct-entry-label");
         if (1 < e.detail) {
            if (!label_el.is(":focus")) {
               caption_entry_range_selection_info = {
                  anchor: this,
               };
               $(this).addClass("selected");
            }
         } else if (!label_el.is(":focus")) {
            if (
               1 < $(".ct-entry.selected").length &&
               $(this).hasClass("selected")
            ) {
               caption_entry_range_selection_info = null;
               $(".ct-entry").not(this).removeClass("selected");
            } else {
               $(".ct-entry").not(this).removeClass("selected");
               let is_selected = $(this).hasClass("selected");
               if (!is_selected) {
                  caption_entry_range_selection_info = {
                     anchor: this,
                  };
                  $(this).addClass("selected");
               } else {
                  caption_entry_range_selection_info = null;
                  $(this).removeClass("selected");
               }
            }
         }
      }

      let id = $(this).data("id");
      let label_el = $(this).find(".ct-entry-label");
      if (label_el.val() !== preset.config.entries[id]?.value) {
         label_el.trigger("change");
      }

      return { render: true };
   })
);

$("#ct_entries_scroll").on(
   "click",
   onCaptionConfigChange(function (preset, e) {
      if (
         $(e.target).closest(".ct-entry, #ct_entries_add").length ||
         is_ctrl_down ||
         is_shift_down
      )
         return;
      $(".ct-entry").removeClass("selected");
      caption_entry_range_selection_info = null;

      return { render: true };
   })
);

$(document).on("dblclick", ".ct-entry", function () {
   if (!is_ctrl_down && !is_shift_down) {
      $(this).find(".ct-entry-label").focus();
   }
});

$(document).on(
   "click",
   ".ct-bottom-r1 .labelButton-s, .ct-bottom-r2 .labelButton-s",
   onCaptionConfigChange(function (preset) {
      let selected_entry_els = $(".ct-entry.selected").toArray();
      if (selected_entry_els.length <= 0) return;

      let selected_entries = selected_entry_els.map((entry_el) => {
         return preset.config.entries[$(entry_el).data("id")];
      });

      let label = klasses_by_key[$(this).attr("name")];

      let should_disable = selected_entries.every((entry) =>
         entry.onContent.includes(label.index)
      );

      if (should_disable) {
         for (let entry of selected_entries) {
            let index = entry.onContent.indexOf(label.index);
            entry.onContent.splice(index, 1);
         }
      } else {
         for (let entry of selected_entries) {
            let index = entry.onContent.indexOf(label.index);
            if (index === -1) {
               entry.onContent.push(label.index);
            }
         }
      }

      return { render: true, save: true };
   })
);

$("#ct-entry-on-content-toggle-all").on(
   "click",
   onCaptionConfigChange(function (preset) {
      let selected_entry_els = $(".ct-entry.selected").toArray();
      if (selected_entry_els.length <= 0) return;

      let selected_entries = selected_entry_els.map((entry_el) => {
         return preset.config.entries[$(entry_el).data("id")];
      });

      for (let entry of selected_entries) {
         entry.onContent = sequence(ALL_LABELS_COUNT);
      }

      return { render: true, save: true };
   })
);

$("#ct-entry-on-content-toggle-none").on(
   "click",
   onCaptionConfigChange(function (preset) {
      let selected_entry_els = $(".ct-entry.selected").toArray();
      if (selected_entry_els.length <= 0) return;

      let selected_entries = selected_entry_els.map((entry_el) => {
         return preset.config.entries[$(entry_el).data("id")];
      });

      for (let entry of selected_entries) {
         entry.onContent = [];
      }

      return { render: true, save: true };
   })
);

$("#ct-entry-chance").on(
   "change",
   onCaptionConfigChange(function (preset) {
      let selected_entry_els = $(".ct-entry.selected").toArray();
      if (selected_entry_els.length <= 0) return;

      let selected_entries = selected_entry_els.map((entry_el) => {
         return preset.config.entries[$(entry_el).data("id")];
      });

      let is_all_chance_same = selected_entries.every(
         (entry) => entry.chance === selected_entries[0].chance
      );

      if (
         !is_all_chance_same &&
         1 < selected_entries.length &&
         $(this).val() === ""
      ) {
         $(this).val("...");
         return;
      }

      let value = parseFloat($(this).val());
      if (isNaN(value)) {
         value = 1;
      } else {
         value = clamp(
            value,
            CAPTION_ENTRY_CHANCE_MIN,
            CAPTION_ENTRY_CHANCE_MAX
         );
      }

      for (let entry of selected_entries) {
         entry.chance = value;
      }

      return { render: true, save: true };
   })
);

$("#ct-entry-chance").on("focus", async function () {
   await requesting_config;

   let preset = getSelectedPreset(caption_configuration);

   let selected_entries = $(".ct-entry.selected")
      .toArray()
      .map((entry_el) => {
         return preset.config.entries[$(entry_el).data("id")];
      });

   let is_all_chance_same = selected_entries.every(
      (entry) => entry.chance === selected_entries[0].chance
   );

   if (!is_all_chance_same && 1 < selected_entries.length) {
      $(this).val("");
   }
});

$("#ct-entry-chance").on("blur", async function () {
   await requesting_config;

   let preset = getSelectedPreset(caption_configuration);

   let selected_entries = $(".ct-entry.selected")
      .toArray()
      .map((entry_el) => {
         return preset.config.entries[$(entry_el).data("id")];
      });

   let is_all_chance_same = selected_entries.every(
      (entry) => entry.chance === selected_entries[0].chance
   );

   if (!is_all_chance_same && 1 < selected_entries.length) {
      $(this).val("...");
   }
});

$("#ct_entries_export").on("click", async function () {
   let preset = getSelectedPreset(caption_configuration);

   let tags = { ...preset.config.tags };
   // Deep clone entries since their tags property might get modified
   let entries = structuredClone(preset.config.entries);

   let selected_tag_els = $(".ct-tag.selected");
   let selected_entry_els = $(".ct-entry.selected");

   if (selected_tag_els.length === 0 && selected_entry_els.length === 0) {
      createDangerArrowTooltip(
         $("#ct_entries_export_container"),
         getI18nStr(
            "on-export-caption-collection__no-entries-or-tags-selected-error"
         )
      );
      return;
   }

   let selected_tag_ids = selected_tag_els
      .map((_, el) => $(el).data("id"))
      .toArray();
   tags = keepKeys(tags, (tag, id) => selected_tag_ids.includes(id));

   let selected_entry_ids = selected_entry_els
      .map((_, el) => $(el).data("id"))
      .toArray();
   entries = keepKeys(entries, (entry, id) => selected_entry_ids.includes(id));

   for (let entry_id in entries) {
      let entry = entries[entry_id];
      entry.tags = entry.tags.filter((tag_id) =>
         selected_tag_ids.includes(tag_id)
      );
   }

   let json_str = JSON.stringify({ entries, tags }, null, 4);

   // TODO: open a modal to prompt for a filename instead
   let blob = new Blob([json_str], { type: "application/json" });
   browser.runtime
      .sendMessage({
         type: "SAVE_FILE",
         blob,
         file_ext: "json",
         filename: "caption_collection",
         save_as: true,
         version: 2,
      })
      .then((res) => {
         if (!res.error) {
            createNotification(
               getI18nStr(
                  "on-export-caption-collection__success",
                  `<span class="notification__quote-inline">${
                     Object.keys(entries).length
                  }</span>`,
                  `<span class="notification__quote-inline">${
                     Object.keys(tags).length
                  }</span>`
               ),
               '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z" fill="currentColor"/></svg>',
               "success"
            );
         }
      });
});

$("#ct_entries_import").on("click", function () {
   let file_input = document.createElement("input");
   file_input.type = "file";
   file_input.accept = ".json";
   $(file_input).on("change", function () {
      // TODO: handle multiple files
      let file = $(this).prop("files")[0];
      if (!file) return;

      let reader = new FileReader();
      reader.onload = onCaptionConfigChange(function (preset) {
         let imported;
         try {
            imported = JSON.parse(reader.result);
         } catch (err) {
            createNotification(
               getI18nStr("on-import-caption-collection__invalid-file-error"),
               '<path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" fill="currentColor"/>',
               "danger"
            );
            return;
         }

         if (!validateCaptionTags(imported.tags)) {
            createNotification(
               getI18nStr("on-import-caption-collection__invalid-file-error"),
               '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" fill="currentColor"/></svg>',
               "danger"
            );
            return;
         }

         if (!validateCaptionEntries(imported.entries, imported.tags)) {
            createNotification(
               getI18nStr("on-import-caption-collection__invalid-file-error"),
               '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" fill="currentColor"/></svg>',
               "danger"
            );
            return;
         }

         let entries = preset.config.entries;
         let tags = preset.config.tags;

         let imported_entries_count = Object.keys(imported.entries).length;
         if (
            imported_entries_count + Object.keys(entries).length >
            CAPTION_ENTRY_COUNT_LIMIT
         ) {
            createNotification(
               getI18nStr(
                  "on-import-caption-collection__entry-count-limit-error",
                  `<span class="notification__quote-inline">${imported_entries_count}</span>`,
                  `<span class="notification__quote-inline">${CAPTION_ENTRY_COUNT_LIMIT}</span>`
               ),
               '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" fill="currentColor"/></svg>',
               "danger"
            );
            return;
         }

         let imported_tags_count = Object.keys(imported.tags).length;
         if (
            imported_tags_count + Object.keys(tags).length >
            CAPTION_TAG_COUNT_LIMIT
         ) {
            createNotification(
               getI18nStr(
                  "on-import-caption-collection__tag-count-limit-error",
                  `<span class="notification__quote-inline">${imported_tags_count}</span>`,
                  `<span class="notification__quote-inline">${CAPTION_TAG_COUNT_LIMIT}</span>`
               ),
               '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" fill="currentColor"/></svg>',
               "danger"
            );
            return;
         }

         // Assign new entry ids if there are any conflicts
         for (let entry_id in imported.entries) {
            let entry = imported.entries[entry_id];
            if (entries[entry_id] != null) {
               let new_entry_id = generateUidForObject(entries);
               entries[new_entry_id] = entry;
            } else {
               entries[entry_id] = entry;
            }
         }

         // Assign new tag ids if there are any conflicts
         for (let tag_id in imported.tags) {
            let tag = imported.tags[tag_id];
            if (tags[tag_id] != null) {
               let new_tag_id = generateUidForObject(tags);
               tags[new_tag_id] = tag;

               for (let entry_id in imported.entries) {
                  let entry = imported.entries[entry_id];
                  for (let i = 0; i < entry.tags.length; i++) {
                     if (entry.tags[i] === tag_id) {
                        entry.tags[i] = new_tag_id;
                     }
                  }
               }
            } else {
               tags[tag_id] = tag;
            }
         }

         return {
            render: true,
            save: true,
            onSaveSuccess: () => {
               createNotification(
                  getI18nStr(
                     "on-import-caption-collection__success",
                     `<span class="notification__quote-inline">${imported_entries_count}</span>`,
                     `<span class="notification__quote-inline">${imported_tags_count}</span>`
                  ),
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" fill="currentColor"/></svg>',
                  "success"
               );
            },
         };
      });
      reader.readAsText(file);
   });
   $(file_input).click();
});

function updateCaptionPresetConfig(
   preset,
   do_highlight = false,
   { selected_tag_ids = null, selected_entry_ids = null } = {}
) {
   let container_el = $(".ct-container");

   let tag_els = $("#ct_tags_list .ct-tag");
   let add_tag_button_container_el = $("#ct_tags_list #ct_tags_add_container");

   let tag_ids = Object.keys(preset.config.tags);
   for (let i = 0; i < tag_ids.length; i++) {
      let id = tag_ids[i];
      let tag = preset.config.tags[id];

      let tag_el = tag_els.filter(`[data-id="${id}"]`);
      if (!tag_el.length) {
         tag_el = $(`
            <div class="ct-tag">
               <div class="ct-tag-label-bg"></div>
               <input class="ct-tag-label" maxlength="25">
               <div class="ct_tag_color_picker_toggle_container">
                  <button class="ct_tag_color_picker_toggle">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14"><path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" fill="currentColor"/></svg>
                  </button>
               </div>
               <div class="ct-tag-separator"></div>
               <button class="ct-tag-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill="currentColor"/></svg></button>
               <svg class="ct-tag-shape" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 136 24">
               <polygon points="0,12 12,0 136,0 136,24 12,24" fill="currentColor"/>
               </svg>
               <svg class="ct-tag-shape-inner" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 136 24">
               <polygon points="0,12 12,0 136,0 136,24 12,24" fill="currentColor"/>
               </svg>
               <svg class="ct-tag-selected-overlay" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 136 24">
               <polygon points="0,12 12,0 136,0 136,24 12,24" fill="var(--selection-color)" stroke="var(--selection-border-color)" stroke-width="2px"/>
               </svg>
            </div>
         `);
         let picker_el = Pickr.create({
            el: tag_el.find(".ct_tag_color_picker_toggle")[0],
            appClass: "caption-tag__color-picker",
            theme: "nano",
            useAsButton: true,
            swatches: picker_swatches,
            padding: 6,
            lockOpacity: true,
            components: {
               hue: true,
               interaction: {
                  hex: true,
                  rgba: true,
                  input: true,
               },
            },
         });
         picker_el
            .on("change", (color, e, instance) => {
               let hex = color.toHEXA().toString();
               tag_el.val(hex);
               container_el.css(`--caption-tag-color-${id}`, hex);
            })
            .on(
               "changestop",
               onCaptionConfigChange(function (preset, e, instance) {
                  let tag = preset.config.tags[id];
                  tag.color = instance.getColor().toHEXA().toString();

                  return { render: true, save: true };
               })
            )
            .on(
               "swatchselect",
               onCaptionConfigChange(function (preset, color, instance) {
                  let tag = preset.config.tags[id];
                  tag.color = color.toHEXA().toString();

                  return { render: true, save: true };
               })
            )
            .on("show", (color, instance) => {
               tag_el.find(".ct_tag_color_picker_toggle").addClass("active");
               picker_el.setColor(tag.color, true);
            })
            .on("hide", (color, instance) => {
               tag_el.find(".ct_tag_color_picker_toggle").removeClass("active");
            });
         tag_el.on("beforeremove", () => {
            let i = caption_tag_color_picker_els.indexOf(picker_el);
            if (i !== -1) {
               caption_tag_color_picker_els.splice(i, 1);
            }
            picker_el.destroyAndRemove();
         });
         caption_tag_color_picker_els.push(picker_el);
         tag_el.insertAfter(add_tag_button_container_el);
      } else {
         tag_els = tag_els.not(tag_el);
      }

      container_el.css(`--caption-tag-color-${id}`, tag.color);

      tag_el.attr("data-id", id);
      tag_el.find(".ct-tag-label").val(tag.name);
      tag_el
         .find(".ct-tag-shape")
         .css("color", `var(--caption-tag-color-${id})`);
   }
   tag_els.trigger("beforeremove");
   tag_els.remove();

   if (selected_tag_ids == null) {
      selected_tag_ids = $(".ct-tag.selected")
         .map((_, el) => $(el).data("id"))
         .toArray();
   }

   let entry_els = $("#ct_entries_list .ct-entry");
   let add_entry_button_container_el = $(
      "#ct_entries_list #ct_entries_add_container"
   );

   let entries = structuredClone(preset.config.entries);
   for (let id in entries) {
      let entry = entries[id];
      entry.tags.sort((a, b) => tag_ids.indexOf(b) - tag_ids.indexOf(a));
   }

   let sorted_entry_ids = Object.keys(entries).sort((a, b) => {
      let cmp = 0;
      let i = 0;
      while (cmp === 0) {
         cmp =
            (entries[a].tags[i]
               ? tag_ids.indexOf(entries[a].tags[i])
               : Number.MAX_VALUE) -
            (entries[b].tags[i]
               ? tag_ids.indexOf(entries[b].tags[i])
               : Number.MAX_VALUE);
         if (i >= entries[a].tags.length || i >= entries[b].tags.length) {
            break;
         }
         i++;
      }
      return cmp;
   });

   let filtered_out_entries_count = 0;
   for (let i = 0; i < sorted_entry_ids.length; i++) {
      let id = sorted_entry_ids[i];
      let entry = entries[id];

      let entry_el = entry_els.filter(`[data-id="${id}"]`);
      if (!entry_el.length) {
         entry_el = $(`
            <div class="ct-entry">
               <div class="ct-entry-inner">
                  <input class="ct-entry-label" maxlength="${CAPTION_ENTRY_VALUE_CHAR_LIMIT}" data-input-flexgrow="true">
                  <button class="ct-entry-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill="currentColor"></path></svg></button>
               </div>
            </div>
         `);
         entry_el.insertAfter(add_entry_button_container_el);
      } else {
         entry_els = entry_els.not(entry_el);
      }

      entry_el.css("order", sorted_entry_ids.length - i - 1);
      if (1 < entry.tags.length) {
         let colors = [];
         for (let i = 0; i < entry.tags.length; i++) {
            let tag_id = entry.tags[i];
            colors.push(
               `var(--caption-tag-color-${tag_id}) ${
                  (i / entry.tags.length) * 100 + 1
               }%, var(--caption-tag-color-${tag_id}) ${
                  ((i + 1) / entry.tags.length) * 100 - 1
               }%`
            );
         }
         colors = colors.join(", ");
         entry_el.css("background", `linear-gradient(90deg, ${colors})`);
      } else {
         entry_el.css("background", "none");
         if (entry.tags.length == 1) {
            entry_el.css(
               "background-color",
               `var(--caption-tag-color-${entry.tags[0]})`
            );
         } else {
            entry_el.css("background-color", "var(--main-text-color)");
         }
      }
      entry_el.attr("data-id", id);
      let label_el = entry_el.find(".ct-entry-label");
      label_el.val(entry.value);
      if (
         0 < selected_tag_ids.length &&
         !selected_tag_ids.some((tag_id) => entry.tags.includes(tag_id))
      ) {
         entry_el.addClass("ct-entry-filtered-out");
         filtered_out_entries_count++;
      } else {
         entry_el.removeClass("ct-entry-filtered-out");
      }

      updateInputFlexgrowSize(label_el);
   }
   entry_els.remove();

   if (selected_entry_ids == null) {
      selected_entry_ids = $(".ct-entry.selected")
         .map((_, el) => $(el).data("id"))
         .toArray();
   }

   let entries_count = Object.keys(entries).length;
   if (selected_tag_ids.length) {
      $("#ct_filtered").text(
         ` - ${
            entries_count - filtered_out_entries_count
         } filtered entries out of ${entries_count} total entries`
      );
   } else {
      $("#ct_filtered").text(` - ${entries_count} total entries`);
   }

   if (0 < selected_entry_ids.length) {
      let selected_entries = selected_entry_ids.map(
         (id) => preset.config.entries[id]
      );

      let on_content_counter = populatePerKlassIndex(() => 0);
      let is_all_chance_same = true;
      let prev_chance = null;
      for (let entry of selected_entries) {
         if (!entry) continue;

         for (let label_index of entry.onContent ?? entry.on_content) {
            on_content_counter[label_index]++;
         }

         if (prev_chance != null && prev_chance !== entry.chance) {
            is_all_chance_same = false;
         }
         prev_chance = entry.chance;
      }

      let on_content_container_el = $(`.ct-bottom-r1, .ct-bottom-r2`);
      on_content_container_el
         .find(".labelButton-s")
         .removeClass("selected")
         .removeClass("partially-selected");

      $(
         "#ct-entry-on-content-toggle-all, #ct-entry-on-content-toggle-none"
      ).attr("disabled", false);
      for (let label_key in klasses) {
         let label_index = klasses[label_key].index;
         if (on_content_counter[label_index] === selected_entries.length) {
            on_content_container_el
               .find(
                  `.labelButton-s[name="${klasses_by_index[label_index].key}"]`
               )
               .addClass("selected");
         } else if (0 < on_content_counter[label_index]) {
            on_content_container_el
               .find(
                  `.labelButton-s[name="${klasses_by_index[label_index].key}"]`
               )
               .addClass("partially-selected");
         }
      }

      let chance_el = $("#ct-entry-chance");
      if (is_all_chance_same) {
         chance_el.css("width", "auto");
         updateInputField(chance_el, prev_chance);
         chance_el.removeAttr("data-input-allow-empty");
      } else {
         chance_el
            .css("width", "1rem")
            .val("...")
            .removeAttr("data-fallback-value")
            .attr("data-input-allow-empty", true);
      }
      chance_el.prop("disabled", false);
   } else {
      $(
         "#ct-entry-on-content-toggle-all, #ct-entry-on-content-toggle-none"
      ).attr("disabled", true);
      let on_content_container_el = $(".ct-bottom-r1, .ct-bottom-r2");
      on_content_container_el
         .find(".labelButton-s")
         .removeClass("selected")
         .removeClass("partially-selected");
      $("#ct-entry-chance")
         .val("")
         .attr("data-input-allow-empty", true)
         .prop("disabled", true)
         .removeAttr("data-fallback-value");
   }

   updateInputField($("#caption_mode"), preset.config.mode, do_highlight);
   updateInputField($("#caption_color"), preset.config.color, do_highlight);
   $("#caption_color").css("background-color", preset.config.color);
   updateInputField($("#caption_font"), preset.config.font, do_highlight);
   updateInputField(
      $("#caption_font_style"),
      preset.config.fontStyle,
      do_highlight
   );
   updateInputField(
      $("#caption_shadow_size"),
      preset.config.shadowSize,
      do_highlight
   );
   updateInputField(
      $("#caption_shadow_color"),
      preset.config.shadowColor,
      do_highlight
   );
   $("#caption_shadow_color").css(
      "background-color",
      preset.config.shadowColor
   );
   updateInputField(
      $("#caption_line_height"),
      preset.config.lineHeight * 100,
      do_highlight
   );
   updateInputField($("#caption_padding"), preset.config.padding, do_highlight);

   onCaptionModeChange();
}

// Excluding tags and entries
async function saveCaptionConfig() {
   const $tab_presets = $(`.presets[data-caption-censor-extra] .tab-preset`);
   const selectedPresetIndex = parseInt(
      $tab_presets.filter(".tab-preset-selected").attr("data-index")
   );
   saveCaptionPresetConfig(caption_configuration.presets[selectedPresetIndex]);
   for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
      if (caption_configuration.presets[i] == null) continue;
      caption_configuration.presets[i].name = $tab_presets
         .filter(`[data-index="${i}"]`)
         .find("input")

         .val();
   }
   caption_configuration.selectedPresetIndex = selectedPresetIndex;

   await trySavingCaptionConfig();
}

function restoreCaptionConfig() {
   if (caption_configuration.enabled) {
      $(".typecpm").addClass("selected");
      $(".caption-toggle").attr("check", true);
   } else {
      $(".typecpm").removeClass("selected");
      $(".caption-toggle").removeAttr("check");
   }
   updatePresets(
      $(`.presets[data-caption-censor-extra]`),
      caption_configuration,
      updateCaptionPresetConfig
   );
   let general_setting_extra_caption_selects_els = $(".gse-caption ul");
   general_setting_extra_caption_selects_els.empty();
   for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
      let preset = caption_configuration.presets[i];
      if (preset == null) continue;

      general_setting_extra_caption_selects_els.append(
         $(`<li value="${i}"><a>${replaceHtmlEntities(preset.name)}</a></li>`)
      );
   }
}

function validateCaptionTags(tags) {
   if (!isObject(tags)) return false;

   if (CAPTION_TAG_COUNT_LIMIT < Object.keys(tags).length) return false;

   for (let id in tags) {
      if (6 < id.length) return false;

      // Allow only base 64 characters, using - and _
      if (!id.match(/^[a-zA-Z0-9-_]+$/)) return false;

      let tag = tags[id];
      if (!isObject(tag)) return false;

      if (!isString(tag.name) || CAPTION_TAG_NAME_CHAR_LIMIT < tag.name.length)
         return false;

      if (!isString(tag.color) || !tag.color.match(/^#[0-9a-fA-F]{6}$/))
         return false;
   }

   return true;
}

// Tags is assumed to have already been validated
function validateCaptionEntries(entries, tags) {
   if (!isObject(entries)) return false;

   if (CAPTION_ENTRY_COUNT_LIMIT < Object.keys(entries).length) return false;

   for (let id in entries) {
      if (6 < id.length) return false;

      // Allow only base 64 characters, using - and _
      if (!id.match(/^[a-zA-Z0-9-_]+$/)) return false;

      let entry = entries[id];
      if (!isObject(entry)) return false;

      if (
         !isString(entry.value) ||
         CAPTION_ENTRY_VALUE_CHAR_LIMIT < entry.value ||
         entry.value.match(/^\s|\s\s|\s$/)
      )
         return false;

      if (
         !isNumber(entry.chance) ||
         entry.chance < CAPTION_ENTRY_CHANCE_MIN ||
         CAPTION_ENTRY_CHANCE_MAX < entry.chance
      )
         return false;

      // limit precision to 3 decimal places
      entry.chance = parseFloat(entry.chance.toFixed(3));

      entry.onContent = entry.onContent ?? [];
      if (!isArray(entry.onContent)) return false;

      // Remove duplicates
      entry.onContent = [...new Set(entry.onContent)];

      for (let label_index of entry.onContent) {
         if (!isNumber(label_index) || ALL_LABELS_COUNT <= label_index)
            return false;
      }

      entry.tags = entry.tags ?? [];
      if (!isArray(entry.tags) || CAPTION_ENTRY_MAX_TAGS < entry.tags.length)
         return false;

      // Remove duplicates
      entry.tags = [...new Set(entry.tags)];

      for (let tag_id of entry.tags) {
         // We don't need to verify the tag_id since we'll know it's valid if it's in the tags object
         if (tags[tag_id] == null) return false;
      }
   }

   return true;
}
