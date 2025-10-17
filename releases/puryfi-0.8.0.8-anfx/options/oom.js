$("#oom_triggers_toggle_all").on("click", async function () {
   await requesting_config;
   if (lock_configuration.enabled) {
      return;
   }

   only_once_mode_configuration.trigger = [];
   let end = experimental_content
      ? ALL_LABELS_COUNT
      : ALL_NON_EXPERIMENTAL_LABELS_COUNT;
   for (let i = 0; i < end; i++) {
      only_once_mode_configuration.trigger.push(i);
   }
   restoreConfig();
   saveConfig();
});

$("#oom_triggers_toggle_none").on("click", async function () {
   await requesting_config;

   if (lock_configuration.enabled) {
      return;
   }
   only_once_mode_configuration.trigger = [];
   restoreConfig();
   saveConfig();
});

$("#oom_triggers_toggle_flip").on("click", async function () {
   await requesting_config;

   if (lock_configuration.enabled) {
      return;
   }
   let end = experimental_content
      ? ALL_LABELS_COUNT
      : ALL_NON_EXPERIMENTAL_LABELS_COUNT;
   for (let i = 0; i < end; i++) {
      if (only_once_mode_configuration.trigger.includes(i)) {
         only_once_mode_configuration.trigger =
            only_once_mode_configuration.trigger.filter((e) => e !== i);
      } else {
         only_once_mode_configuration.trigger.push(i);
      }
   }
   restoreConfig();
   saveConfig();
});

$("io-toggle.oomToggle").click(async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) return;

   only_once_mode_configuration.enabled = $(this).attr("check") ? true : false;
   browser.storage.sync.set({
      only_once_mode_configuration: only_once_mode_configuration,
   });
});

$("#only_once_mode_clear_data").click(async function () {
   await requesting_config;
   if (lock_configuration.enabled) {
      return;
   }
   if (
      await createConfirm(`
         ${getI18nStr("on-clear-oom-data__confirm")}
         <div class="modal__quote warning" style="margin-top:0.5rem">
            -<b> ${getI18nStr("on-non-reversible-action-warning")}</b>
         </div>
      `)
   ) {
      let p = reloadOOMTree();
      p.then((e) => {
         window.location.reload();
      });
   }
});

$("#only_once_mode_mode_grid_advanced_color_preset").change(function () {
   if ($(this).val() == 0) {
      //$("#only_once_mode_mode_grid_advanced_color_custom").show();
   } else {
      //$("#only_once_mode_mode_grid_advanced_color_custom").hide();
      $("#only_once_mode_mode_grid_advanced_color_1").val(
         $(this).val().split(";")[0]
      );
      $("#only_once_mode_mode_grid_advanced_color_1").css(
         "background-color",
         $(this).val().split(";")[0]
      );
      $("#only_once_mode_mode_grid_advanced_color_2").val(
         $(this).val().split(";")[1]
      );
      $("#only_once_mode_mode_grid_advanced_color_2").css(
         "background-color",
         $(this).val().split(";")[1]
      );

      saveConfig();
   }
});

$(".oom-timer-input").on("keypress keyup blur", function (event) {
   $(this).val(
      $(this)
         .val()
         .replace(/[^\d].+/, "")
   );
   if (event.which < 48 || event.which > 57) {
      event.preventDefault();
   }
});
$("#oom-min-timer-container .oom-timer-input").change(async function () {
   await requesting_config;
   if (lock_configuration.enabled) return;
   let d =
      $("#oom-min-timer-days").val() > 0
         ? $("#oom-min-timer-days").val() * 24 * 60 * 60 * 1000
         : 0;
   let h =
      $("#oom-min-timer-hours").val() > 0
         ? $("#oom-min-timer-hours").val() * 60 * 60 * 1000
         : 0;
   let m =
      $("#oom-min-timer-minutes").val() > 0
         ? $("#oom-min-timer-minutes").val() * 60 * 1000
         : 0;
   let s =
      $("#oom-min-timer-seconds").val() > 0
         ? $("#oom-min-timer-seconds").val() * 1000
         : 0;
   let sum = d + h + m + s;
   only_once_mode_configuration.timer_min_duration = sum;
   browser.storage.sync.set({
      only_once_mode_configuration: only_once_mode_configuration,
   });
});

$("#oom-max-timer-container .oom-timer-input").change(async function () {
   await requesting_config;
   if (lock_configuration.enabled) return;
   let d =
      $("#oom-max-timer-days").val() > 0
         ? $("#oom-max-timer-days").val() * 24 * 60 * 60 * 1000
         : 0;
   let h =
      $("#oom-max-timer-hours").val() > 0
         ? $("#oom-max-timer-hours").val() * 60 * 60 * 1000
         : 0;
   let m =
      $("#oom-max-timer-minutes").val() > 0
         ? $("#oom-max-timer-minutes").val() * 60 * 1000
         : 0;
   let s =
      $("#oom-max-timer-seconds").val() > 0
         ? $("#oom-max-timer-seconds").val() * 1000
         : 0;
   let sum = d + h + m + s;
   only_once_mode_configuration.timer_max_duration = sum;
   browser.storage.sync.set({
      only_once_mode_configuration: only_once_mode_configuration,
   });
});

function reloadOOMTree() {
   return browser.runtime.sendMessage({
      reset_oom_tree: true,
   });
}

function setCustomOOMModeCensorType(censor_type) {
   only_once_mode_configuration.mode_configuration[7].censor_type = censor_type;
   $("#only_once_mode_mode_custom_advanced_censor_type").attr(
      "data-censor-type",
      censor_type
   );

   const itemsEl = $(
      "#only_once_mode_mode_custom_advanced_censor_preset_index > ul"
   );
   itemsEl.empty();
   const censor_configs_by_type = {
      1: pixel_configuration,
      2: blur_configuration,
      3: bar_configuration,
      4: triangle_configuration,
      5: box_configuration,
      6: glitch_configuration,
      7: sticker_configuration,
      8: sobel_configuration,
      9: splatter_configuration,
      10: mixed_configuration,
      11: random_configuration,
   };
   if (censor_type !== 0) {
      for (
         let i = 0;
         i < censor_configs_by_type[censor_type].presets.length;
         i++
      ) {
         if (censor_configs_by_type[censor_type].presets[i] == null) continue;

         itemsEl.append(
            `<li value="${i}"><a>${
               replaceHtmlEntities(
                  censor_configs_by_type[censor_type].presets[i].name
               ) || "&nbsp"
            }</a></li>`
         );
      }
   }
}

function setCustomOOMModeCensorPresetIndex(index) {
   let selectEl = $("#only_once_mode_mode_custom_advanced_censor_preset_index");
   only_once_mode_configuration.mode_configuration[7].censor_preset_index =
      index;
   selectEl.attr("value", index);
   let name = selectEl.find(`ul li[value="${index}"] a`).html();
   if (name == null && index != null) {
      selectEl
         .children("a")
         .html(`--Preset ${index + 1}--`)
         .addClass("danger");
   } else {
      selectEl
         .children("a")
         .html(name || "&nbsp;")
         .removeClass("danger");
   }

   saveConfig();
}

$(document).on("click", function (e) {
   let buttonEl = $(e.target).closest(
      "#only_once_mode_mode_custom_advanced_censor_type"
   );
   if (buttonEl.length === 0) return;
   $('.mixed-censor-type-popup button[data-censor-type="10"]').show();
   spawnCensorTypeSelector(buttonEl, (censor_type) => {
      setCustomOOMModeCensorType(censor_type);
      setCustomOOMModeCensorPresetIndex(censor_type === 0 ? null : 0);
   });
});

$("#only_once_mode_mode_custom_advanced_censor_preset_index > a").on(
   "click",
   function (e) {
      let itemEls = $(
         "#only_once_mode_mode_custom_advanced_censor_preset_index > ul"
      );
      itemEls.toggle();
      return;
   }
);

$(document).on(
   "click",
   "#only_once_mode_mode_custom_advanced_censor_preset_index > ul > li > a",
   function (e) {
      $(this)
         .closest(
            "#only_once_mode_mode_custom_advanced_censor_preset_index > ul"
         )
         .hide();

      let index = $(this).closest("li").val();
      setCustomOOMModeCensorPresetIndex(index);
   }
);
