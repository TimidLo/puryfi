var experimental_content;
var labels;
var censor_type;
var bar_configuration;
var blur_configuration;
var pixel_configuration;
var glitch_configuration;
var triangle_configuration;
var box_configuration;
var sticker_configuration;
var sobel_configuration;
var splatter_configuration;
var mixed_configuration;
var random_configuration;
var clustering_configuration;
var caption_configuration;
var word_wall_configuration;
var reverse_mode_configuration;
var performance_configuration;
var concurrent_processes;
var file_types;
var gif_configuration;
var png_configuration;
var jpg_configuration;
var bmp_configuration;
var webp_configuration;
var avif_configuration;
var video_configuration;
var lock_configuration;
var only_once_mode_configuration;
var whiteblacklist_configuration;
var icon_configuration;
var remote_configuration;
var saving_configuration;
var look_and_feel_configuration;
var language;
var user;

var lock_timer_logs;
var sticker_collections;
var unaddressed_issues;

var is_options_page = $("#login_form").length;

var is_requesting_config = true;
var requesting_config;

let CaptionConfigurationMessage;

let loading_caption_config_message;

function getFileTypesConfig() {
   return {
      file_types_configuration: file_types,
      gif_configuration: gif_configuration,
      png_configuration: png_configuration,
      jpg_configuration: jpg_configuration,
      bmp_configuration: bmp_configuration,
      webp_configuration: webp_configuration,
      avif_configuration: avif_configuration,
      video_configuration: video_configuration,
   };
}

async function requestConfig() {
   is_requesting_config = true;

   await loading_caption_config_message;

   let sync = browser.storage.sync
      .get([
         "experimental_content",
         "labels",
         "censor_type",
         "bar_configuration",
         "blur_configuration",
         "pixel_configuration",
         "glitch_configuration",
         "triangle_configuration",
         "box_configuration",
         "sticker_configuration",
         "sobel_configuration",
         "splatter_configuration",
         "mixed_configuration",
         "random_configuration",
         "clustering_configuration",
         ...CAPTION_CONFIGURATION_KEYS,
         "word_wall_configuration",
         "reverse_mode_configuration",
         "scan_configuration",
         "concurrent_processes",
         "file_types",
         "gif_configuration",
         "png_configuration",
         "jpg_configuration",
         "bmp_configuration",
         "webp_configuration",
         "avif_configuration",
         "video_configuration",
         "lock_configuration",
         "only_once_mode_configuration",
         "whiteblacklist_configuration",
         "icon_configuration",
         "remote_configuration",
         "saving_configuration",
         "look_and_feel_configuration",
         "language",
         "user",
      ])
      .then((res) => {
         ({
            experimental_content,
            labels,
            censor_type,
            bar_configuration,
            blur_configuration,
            pixel_configuration,
            glitch_configuration,
            triangle_configuration,
            box_configuration,
            sticker_configuration,
            sobel_configuration,
            splatter_configuration,
            mixed_configuration,
            random_configuration,
            clustering_configuration,
            word_wall_configuration,
            reverse_mode_configuration,
            scan_configuration: performance_configuration,
            concurrent_processes,
            file_types,
            gif_configuration,
            png_configuration,
            jpg_configuration,
            bmp_configuration,
            webp_configuration,
            avif_configuration,
            video_configuration,
            lock_configuration,
            only_once_mode_configuration,
            whiteblacklist_configuration,
            icon_configuration,
            remote_configuration,
            saving_configuration,
            look_and_feel_configuration,
            language,
            user,
         } = res);
         try {
            caption_configuration = unstoreCaptionConfiguration(
               res,
               CaptionConfigurationMessage
            );
         } catch (e) {
            console.error("Error while unstoring caption configuration:", e);
            caption_configuration = new CaptionConfiguration();
         }
      });

   let local = browser.storage.local
      .get(["lock_timer_logs", "unaddressed_issues"])
      .then((res) => {
         ({ lock_timer_logs, unaddressed_issues } = res);
      });

   let indexed = browser.runtime
      .sendMessage({
         type: "GET_STICKER_COLLECTIONS",
         keep_files: false,
         version: 2,
      })
      .then((res) => {
         ({ sticker_collections } = res);
      });

   await Promise.all([sync, local, indexed]).then(() => {
      is_requesting_config = false;
   });
}

if (is_options_page) {
   loading_caption_config_message = fetch(
      browser.runtime.getURL("static/caption.proto")
   )
      .then((response) => response.text())
      .then((protoText) => {
         const root = protobuf.parse(protoText).root;
         CaptionConfigurationMessage = root.lookupType(
            "captionpackage.CaptionConfiguration"
         );
      })
      .catch((error) =>
         console.error("Error loading the caption.proto file:", error)
      );

   requesting_config = requestConfig().then(() => {
      browser.storage.onChanged.addListener((changes, area) => {
         if (area === "sync") {
            if (
               changes.pixel_configuration?.newValue != null ||
               changes.random_configuration?.newValue != null ||
               changes.mixed_configuration?.newValue != null
            ) {
               updateVideoWarningMessages();
            }

            if (changes.saving_configuration?.newValue != null) {
               saving_configuration = changes.saving_configuration.newValue;
            }
            if (changes.lock_configuration?.newValue != null) {
               lock_configuration = changes.lock_configuration.newValue;
               updateHelpButtons();
            }
            if (changes.remote_configuration?.newValue != null) {
               remote_configuration = changes.remote_configuration.newValue;
               updateHelpButtons();
               updateRemoteSubscription();
            }
            user = changes.user?.newValue ?? user;
         } else if (area === "local") {
            if (changes.lock_timer_logs?.newValue) {
               lock_timer_logs = changes.lock_timer_logs.newValue;
               updateTimerLogsPopup();
            }

            if (changes.unaddressed_issues?.newValue) {
               unaddressed_issues = changes.unaddressed_issues.newValue;
               restoreUnaddressedIssues();
            }
         }
      });
   });
}

if (is_options_page) {
   const MESSAGE_HANDLER = {
      CONFIGURATION_CHANGED: async (request, sender) => {
         let { keysChanged } = request;

         if (!is_requesting_config) {
            await requestConfig();
         }

         if (keysChanged.includes("active")) {
            restoreONOFF();
         }

         if (keysChanged.includes("labels")) {
            restoreLabels();
            restoreMixedLabelsSelected();
         }

         if (keysChanged.includes("censor_type")) {
            restoreCensorType();
         }

         if (
            [
               "bar_configuration",
               "blur_configuration",
               "pixel_configuration",
               "glitch_configuration",
               "triangle_configuration",
               "box_configuration",
               "sticker_configuration",
               "sobel_configuration",
               "splatter_configuration",
               "mixed_configuration",
               "random_configuration",
               "clustering_configuration",
               "caption_configuration",
               "word_wall_configuration",
               "reverse_mode_configuration",
               "only_once_mode_configuration",
            ].some((key) => keysChanged.includes(key))
         ) {
            restoreConfig();
         }

         return {};
      },
   };

   function handleMessage(request, sender, sendResponse) {
      if (MESSAGE_HANDLER[request.type] != null) {
         MESSAGE_HANDLER[request.type](request, sender)
            .catch((err) => {
               console.error(
                  "Error while handling options tab message: ",
                  err
               );
               sendResponse({
                  error: "INTERNAL_ERROR",
               });
            })
            .then((res) => {
               sendResponse(res);
            });
         return true;
      }
   }

   browser.runtime.onMessage.addListener(handleMessage);
}

async function activatePuryFi(active) {
   await requesting_config;
   if (!lock_configuration.enabled) {
      browser.storage.sync.set({
         active: active,
      });
   }
}

function checkLockState(lock_configuration) {
   var tmsp_now =
      lock_configuration.timer_mode === 0
         ? lock_configuration.duration_timestamp
         : lock_configuration.timestamp;
   if (lock_configuration.timer_enabled && lock_configuration.enabled) {
      var now = new Date().getTime();
      var distance = tmsp_now + lock_configuration.duration - now;
      if (distance <= 0) {
         lock_configuration = new LockConfiguration();
         var reason = isLockConfigNotValid(lock_configuration);
         if (reason && saving_configuration.actions.lock_extension) {
            saving_configuration.actions.lock_extension = false;
            browser.storage.sync.set({
               saving_configuration: saving_configuration,
            });
         }
         updateInvalidLockConfigReason(reason);
         browser.storage.sync.set({
            lock_configuration: lock_configuration,
         });
      }
   }
   return lock_configuration;
}

function restoreONOFF() {
   browser.storage.sync.get("active").then((res) => {
      if (res.active) {
         $(".onoff").attr("check", res.active);
      } else {
         $(".onoff").removeAttr("check");
      }
      $("#onoff").html(res.active ? "ON" : "OFF");
   });
}

function restoreLockUnlock() {
   lock_configuration = checkLockState(lock_configuration);
   if (lock_configuration.enabled) {
      $(".locked-icon").show();
      $("#lock-token").html(lock_configuration.token);
      $(".locked-inactive").show();
      $(".unlocked-show").hide();
      $("#emergency_unlock_container").show();
      if (lock_configuration.password_enabled) {
         $("#locked-inactive-password").show();
      }
      if (lock_configuration.timer_enabled) {
         startTimer(
            lock_configuration.timer_mode === 0
               ? lock_configuration.duration_timestamp
               : lock_configuration.timestamp,
            lock_configuration.duration
         );
         $("#lock-timer-plus-advanced").show();
         $("#locked-inactive-timer").show();
      }
      $("#onoff-toggle").attr("disabled", true);
      $("#onoff-button").prop("disabled", true);
      hideLockOptions(lock_configuration);
      updateTimerLogsPopup();
   } else {
      $(".locked-icon").hide();
      if (lock_configuration.password_enabled) {
         $(".lock-password-check").attr("check", true);
      } else {
         $(".lock-password-check").removeAttr("check");
      }
      $("#lock_password").val(lock_configuration.password);
      $("#lock_confirm_password").val(lock_configuration.password_confirmation);

      var duration = lock_configuration.duration;
      var days, hours, minutes;
      if (duration) {
         days = Math.floor(duration / (1000 * 60 * 60 * 24));
         hours = Math.floor(
            (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      }
      $("#lock-timer-days").val(days ?? 0);
      $("#lock-timer-hours").val(hours ?? 0);
      $("#lock-timer-minutes").val(minutes ?? 0);
      validateInputValueOnChange.call($("#lock-timer-days")[0]);
      validateInputValueOnChange.call($("#lock-timer-hours")[0]);
      validateInputValueOnChange.call($("#lock-timer-minutes")[0]);

      if (lock_configuration.timer_enabled) {
         $(".lock-timer-check").attr("check", true);
      } else {
         $(".lock-timer-check").removeAttr("check");
      }

      $(
         `input:radio[name='lock-timer-format'][value='${lock_configuration.timer_mode}']`
      ).prop("checked", true);

      if (lock_configuration.timer_plus) {
         $(".lock-timer-plus-check").attr("check", true);
      } else {
         $(".lock-timer-plus-check").removeAttr("check");
      }

      $(".timer-plus-label").each(function () {
         var key = $(this).attr("label");
         var klass = Object.values(klasses).find((e) => e.key == key);
         var label = Object.keys(klasses).find((k) => klasses[k].key === key);
         if (klass) {
            var val = lock_configuration.timer_plus_data[label];
            $(this).val(val);
         }
      });

      if (lock_configuration.timer_plus_weight_box) {
         $("#lock-timer-plus-box-size-show").prop("checked", true);
      } else {
         $("#lock-timer-plus-box-size-show").prop("checked", false);
      }

      $("#lock-timer-plus-box-size").val(
         lock_configuration.timer_plus_weight_box_size
      );

      $("#lock-option-censor-type").prop(
         "checked",
         lock_configuration.locked_options.includes("censor_type")
      );
      $("#lock-option-settings").prop(
         "checked",
         lock_configuration.locked_options.includes("settings")
      );
      $("#lock-option-video").prop(
         "checked",
         lock_configuration.locked_options.includes("video")
      );
      $("#lock-option-editor").prop(
         "checked",
         lock_configuration.locked_options.includes("editor")
      );

      if (lock_configuration.timer_enabled) {
         $("#lock-timer-plus-advanced").show();
      } else {
         $("#lock-timer-plus-advanced").hide();
      }

      if (lock_configuration.timer_mode === 1) {
         $("#lock-timer-date").show();
         const currentDate = new Date();
         const newDate = new Date(
            currentDate.getTime() + lock_configuration.duration
         );
         $("#lock-timer-date").html(newDate.toLocaleString());
      } else {
         $("#lock-timer-date").hide();
      }

      $(".unlocked-show").show();
      $(".locked-inactive").hide();
      $("#locked-inactive-password").hide();
      $("#emergency_unlock_container").hide();
      $("#locked-inactive-timer").hide();
      $("#onoff-toggle").attr("disabled", false);
      $("#onoff-button").prop("disabled", false);
      showLockOptions();
   }
}

function hideLockOptions(lock_configuration) {
   $("#menu-entry-general").remove();
   $(".file-types-selector:not([file_type='video'])")
      .closest(".filetype-item-flex")
      .addClass("locked");
   $("#menu-entry-censor").remove();
   $("#menu-entry-oom").remove();
   $(
      "#remote-settings-identifier, #settings-import-cloud-identifier, #settings_import_dropzone, #settings-import"
   )
      .addClass("locked")
      .attr("disabled", true);
   // NOTE: if buttons are disabled then they remain clickable unless the pointer events are removed, but then the cursor is always default, so the button can't be disabled, and this doesn't apply to inputs, so those can be disabled, love you css
   $("#remote-settings-subscribe, #settings-import-cloud").addClass("locked");

   $("#content-wblist-container").addClass("locked");

   if (lock_configuration.locked_options.includes("video")) {
      $("#menu-entry-filetypes").remove();
   }
   if (lock_configuration.locked_options.includes("settings")) {
      $("#settings-load").addClass("locked");
   }
}

function showLockOptions() {
   /*
    $('#menu-entry-general').show();
    $('#menu-entry-filetypes').show();
    $('#menu-entry-censor').show();
    $('#menu-entry-oom').show();
    $('#menu-entry-whitelist').show();
    */
   //$('#blacklist_locked_container').show();
}

var lock_timer_interval = null;

function startTimer(stmp, dur) {
   if (lock_timer_interval) {
      clearInterval(lock_timer_interval);
   }
   var f = function () {
      var now = new Date().getTime();
      var distance = stmp + dur - now;
      if (distance > 0) {
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
         var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
         $("#locked-days").html(days);
         $("#locked-hours").html(hours);
         $("#locked-minutes").html(minutes);
         $("#locked-seconds").html(seconds);
      } else {
         if (lock_timer_interval) clearInterval(lock_timer_interval);
         unlockExtension();
      }
   };
   f();
   lock_timer_interval = setInterval(f, 1000);
}
