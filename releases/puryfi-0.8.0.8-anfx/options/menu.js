document.addEventListener("DOMContentLoaded", () => {
   restoreOptions();
});

let isCompactMode = false;
function udpateCompactMode() {
   let remSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
   );
   let minSize = 228 * 2 + 646 + 6 * remSize;
   if (document.body.clientWidth < minSize) {
      if (!isCompactMode) {
         isCompactMode = true;
         restoreMascot(user ?? null, $("#language").val());
         $("#right-sidebar").hide();
         $("#secondary-tab-group").insertAfter("#primary-tab-group");
      }
   } else {
      if (isCompactMode) {
         isCompactMode = false;
         restoreMascot(user ?? null, $("#language").val());
         $("#right-sidebar").show();
         $("#secondary-tab-group").appendTo(
            "#right-sidebar .tab-group-scroll-container [data-overlayscrollbars-viewport]"
         );
      }
   }
}

async function getData() {
   let async = await browser.storage.sync.get(null);
   if (async.user != null) {
      delete async.user.password;
      delete async.password;
   }

   let { sticker_collections } = await browser.runtime.sendMessage({
      type: "GET_STICKER_COLLECTIONS",
      keep_files: false,
      version: 2,
   });

   let { detections } = await browser.runtime.sendMessage({
      type: "GET_DETECTIONS",
      version: 2,
   });
   return {
      storage: {
         async: async,
         local: await browser.storage.local.get(null),
         indexedDB: {
            sticker_collections,
            detections,
         },
      },
   };
}

async function getReport() {
   return {
      ...(await getData()),
      navigator: {
         userAgent: navigator.userAgent,
         hardwareConcurrency: navigator.hardwareConcurrency,
         onLine: navigator.onLine,
         webdriver: navigator.webdriver,
      },
      tabs: await browser.tabs.query({}),
      runtime: {
         extensionVersion: browser.runtime.getManifest().version,
         lastError: browser.runtime.lastError,
         extensionId: browser.runtime.id,
         browserInfo: await browser.runtime.getBrowserInfo(),
         platformInfo: await browser.runtime.getPlatformInfo(),
      },
      extension: {
         isAllowedIncognitoAccess:
            await browser.extension.isAllowedIncognitoAccess(),
         isAllowedFileSchemeAccess:
            await browser.extension.isAllowedFileSchemeAccess(),
      },
      permissions: await browser.permissions.getAll(),
      installedAddonsInfo:
         browser.management.getAll != null
            ? await browser.management.getAll()
            : "Error: browser.management.getALL not available",
      privacy:
         browser.privacy != null
            ? {
                 network: {
                    networkPredictionEnabled:
                       await browser.privacy.network.networkPredictionEnabled?.get(
                          {}
                       ),
                    peerConnectionEnabled:
                       await browser.privacy.network.peerConnectionEnabled?.get(
                          {}
                       ),
                    webRTCIPHandlingPolicy:
                       await browser.privacy.network.webRTCIPHandlingPolicy?.get(
                          {}
                       ),
                    httpsOnlyMode:
                       await browser.privacy.network.httpsOnlyMode?.get({}),
                    globalPrivacyControl:
                       await browser.privacy.network.globalPrivacyControl?.get(
                          {}
                       ),
                 },
                 services: {
                    passwordSavingEnabled:
                       await browser.privacy.services.passwordSavingEnabled?.get(
                          {}
                       ),
                 },
                 websites: {
                    cookieConfig:
                       await browser.privacy.websites.cookieConfig?.get({}),
                    firstPartyIsolate:
                       await browser.privacy.websites.firstPartyIsolate?.get(
                          {}
                       ),
                    hyperlinkAuditingEnabled:
                       await browser.privacy.websites.hyperlinkAuditingEnabled?.get(
                          {}
                       ),
                    protectedContentEnabled:
                       await browser.privacy.websites.protectedContentEnabled?.get(
                          {}
                       ),
                    referrersEnabled:
                       await browser.privacy.websites.referrersEnabled?.get({}),
                    resistFingerprinting:
                       await browser.privacy.websites.resistFingerprinting?.get(
                          {}
                       ),
                    thirdPartyCookiesAllowed:
                       await browser.privacy.websites.thirdPartyCookiesAllowed?.get(
                          {}
                       ),
                    trackingProtectionMode:
                       await browser.privacy.websites.trackingProtectionMode?.get(
                          {}
                       ),
                 },
              }
            : "Error: browser.privacy not available",
   };
}

function encryptDecryptData(data, key) {
   let result = "";
   for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(
         data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
   }
   return result;
}

$("#create-report").on("click", async function (e) {
   let requestingPermissions = browser.permissions.request({
      permissions: ["management", "privacy"],
   });

   let permissions = await browser.permissions.getAll();
   if (
      !permissions.permissions.includes("management") ||
      !permissions.permissions.includes("privacy")
   ) {
      let { response, accept, cancel } = createModalWithActions(
         getI18nStr("on-create-report__permissions-request"),
         {
            accept: false,
            cancel: true,
         }
      );

      requestingPermissions.then((res) => {
         if (res) {
            accept();
         } else {
            cancel();
         }
      });

      if (!(await response)) return;
   }

   let v = browser.runtime.getManifest().version;

   let data = await getReport();
   let json = JSON.stringify(data);
   let str = encryptDecryptData(json, v);

   let blob = new Blob([str]);
   browser.runtime.sendMessage({
      type: "SAVE_FILE",
      blob: blob,
      file_ext: "data",
      filename: `report_${getVersion()}`,
      save_as: true,
      version: 2,
   });
});

let overlayscrollbars_options = {
   scrollbars: {
      autoHide: "leave",
      autoHideDelay: 100,
   },
};
let ct_tags_scroll_instance = OverlayScrollbarsGlobal.OverlayScrollbars(
   $("#ct_tags_scroll")[0],
   overlayscrollbars_options
);
let ct_entries_scroll_instance = OverlayScrollbarsGlobal.OverlayScrollbars(
   $("#ct_entries_scroll")[0],
   overlayscrollbars_options
);
OverlayScrollbarsGlobal.OverlayScrollbars(
   $("#primary-tab-group-scroll-container")[0],
   overlayscrollbars_options
);
OverlayScrollbarsGlobal.OverlayScrollbars(
   $("#secondary-tab-group-scroll-container")[0],
   overlayscrollbars_options
);

function generateUid(length = 4) {
   // Create a Uint8Array of 'length' random bytes
   const randomBytes = new Uint8Array(length);
   window.crypto.getRandomValues(randomBytes);

   // Convert the Uint8Array to a base64 string
   const base64String = window.btoa(
      String.fromCharCode.apply(null, randomBytes)
   );

   // Replace '+' and '/' with URL-safe characters and trim '=' padding
   return base64String
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
}

function generateUidForObject(obj, len = 4) {
   let id = generateUid(len);
   while (obj.hasOwnProperty(id)) {
      id = generateUid(len);
   }
   return id;
}

let is_theme_restored = false;
async function restoreOptions() {
   await requesting_config;
   let windowResizeObserver = new ResizeObserver(udpateCompactMode);
   windowResizeObserver.observe(document.body);

   restoreTranslation().then(() => {
      restoreFiletypes();
   });
   udpateCompactMode();
   restoreMascot(user ?? null);
   restoreTheme().then(() => {
      is_theme_restored = true;
   });
   restoreVersion();
   restoreUnaddressedIssues();
   restoreONOFF();
   restoreLoginState();
   restoreLockUnlock();
   updateRemoteSubscription();
   restoreScanConfiguration();
   restoreIcons();
   restoreLabels();
   restoreCensorType();
   restoreFileOptions();
   restoreConfig();
   restoreDebug();
   updateHelpButtons();
   // updateQuickSettings();
   updateHelp();
   updateStatistics();
   startUpdateInterval();
   restoreView();
   restoreSavingConfig();

   // Tell the svelete componenet that is the whitelist and blacklist page to also update
   let ownTab = await browser.tabs.getCurrent();
   browser.tabs.sendMessage(ownTab.id, {
      type: "CONFIGURATION_CHANGED",
      keysChanged: ["whiteblacklist_configuration"],
   });
}

function restoreVersion() {
   $("#version").html(getVersion());
}

function restoreUnaddressedIssues() {
   let unaddressed_issues_keys = Object.keys(unaddressed_issues ?? {});
   if (unaddressed_issues_keys.length === 0) {
      $("#unaddressed-issues")
         .hide()
         .find("#unaddressed-issues__count")
         .text("");
   } else {
      $("#unaddressed-issues")
         .show()
         .find("#unaddressed-issues__count")
         .text(unaddressed_issues_keys.length);
   }
}

function restoreMascot(user, lang = null) {
   let mascot_elem = $("#mascot");
   let mascot_front = $("#mascot_front");
   let mascot_censor = $('#mascot_censor_heart');
   let mascot_box = $('#mascot-box');
   let path = "../images/purychan/";
   let file_name_bg_layer = "puryfichan_base_pose_2.png";
   let file_name_front_layer = "puryfichan_base_pose_2_fl.png";
   let langg = lang ?? language;
   let mascot_class = "mascot_"+langg;

   let is_supporter = !(user === null ||
       user.patreon_tier === null ||
       user.patreon_tier === 0);
   if (isCompactMode) {
      file_name_bg_layer = "sign.png";
      file_name_front_layer = "sign.png";
      mascot_class = 'mascot_compact';
   } else if (isWeekAroundEaster()) {
      file_name_bg_layer = "patreon_base_easter.png";
      file_name_front_layer = 'patreon_base_easter_fl.png';
      mascot_class = 'mascot_easter';
   } else if (isLastTwoWeeksOfYear()) {
      file_name_bg_layer = "patreon_base_christmas.png";
      file_name_front_layer = 'patreon_base_christmas_fl.png';
      mascot_class = 'mascot_christmas';
   } else if (is_supporter) {
      if (langg === "zh-CN") {
         file_name_bg_layer = "puryfichan_base_cn_pose_1.png";
         file_name_front_layer = "puryfichan_base_cn_pose_1_fl.png";
      } else if (langg === "es" || langg === "pt-BR") {
         file_name_bg_layer = "puryfichan_base_es_pose_1.png";
         file_name_front_layer = "puryfichan_base_es_pose_1_fl.png";
      } else if (langg === "fr-FR") {
         file_name_bg_layer = "puryfichan_base_fr_pose_2.png";
         file_name_front_layer = "puryfichan_base_fr_pose_1_fl.png";
      } else {
         file_name_bg_layer = "puryfichan_base_pose_2.png";
         file_name_front_layer = "puryfichan_base_pose_2_fl.png";
      }
   } else {
      if (langg === "zh-CN") {
         file_name_bg_layer = "puryfichan_base_cn_pose_1.png";
         file_name_front_layer = "puryfichan_base_cn_pose_1_fl.png";
      } else if (langg === "es" || langg === "pt-BR") {
         file_name_bg_layer = "puryfichan_base_es_pose_1.png";
         file_name_front_layer = "puryfichan_base_es_pose_1_fl.png";
      } else if (langg === "fr-FR") {
         file_name_bg_layer = "puryfichan_base_fr_pose_1.png";
         file_name_front_layer = "puryfichan_base_fr_pose_1_fl.png";
      } else {
         file_name_bg_layer = "puryfichan_base_pose_1.png";
         file_name_front_layer = "puryfichan_base_pose_1_fl.png";
      }
   }
   if (!mascot_elem.attr("src").includes(file_name_bg_layer) || !mascot_elem.hasClass(mascot_class) || isCompactMode) {
      mascot_elem.removeClass().toggleClass(mascot_class);
      mascot_front.removeClass().toggleClass(mascot_class);
      mascot_censor.removeClass().toggleClass(mascot_class);
      mascot_box.removeClass().toggleClass(mascot_class);
      if(is_supporter){
         $('#mascot-box').toggleClass('mascot_supporter');
      }
      mascot_box.hide();
      mascot_front.attr("src", path + file_name_front_layer);
      mascot_elem.show();
      mascot_front.show();
      mascot_elem.attr("src", path + file_name_bg_layer).on("load", function () {
         $('#mascot-box').fadeIn(200);
      });
   }
}

function restoreLabels() {
   toggleIoToggle(
      $("#experimental-content-toggle, #experimental-content-button"),
      experimental_content
   );
   $(".experimental-content-required").toggle(experimental_content);
   $(".bodypart-grid .labelButton").each(function (i, obj) {
      if (labels.includes(obj.id)) {
         $(this).addClass("selected");
         let btn = $("button[label=" + $(this).attr("id") + "]");
         btn.attr("check", true);
         btn.parent().attr("check", true);
      } else {
         $(this).removeClass("selected");
         let btn = $("button[label=" + $(this).attr("id") + "]");
         btn.removeAttr("check");
         btn.parent().removeAttr("check");
      }
   });
}

function restoreCensorType() {
   enableCensorType(
      $(
         `.general-accordion-container[data-censor-type="${
            parseEffectFromName(censor_type).index
         }"]`
      )
   );
}

function restoreLoginState() {
   if (user) {
      loginSuccess(user);
      $("#video_overlay_log_in_warning").hide();
   } else {
      $("#video_overlay_log_in_warning").show();
      if (user?.username) {
         $("#profile_name").html(replaceHtmlEntities(user.username));
         $("#profile_tier").html("");
      }
      $("#login_form :input").prop("disabled", false);
      $("#login_form").show("slow");
      $("#profile").hide();
   }
}

function restoreDebug() {
   let debug = browser.storage.sync.get("debug");
   debug.then((res) => {
      $(".debugToggle").each(function (i, obj) {
         if (res.debug) {
            $(this).attr("check", true);
            $("#" + $(this).attr("label")).addClass("selected");
         } else {
            $(this).removeAttr("check");
            $("#" + $(this).attr("label")).removeClass("selected");
         }
      });
   });
   browser.storage.sync.getBytesInUse(null).then((store) => {
      $("#storage-synced-size").text(formatBytes(store));
   });
   let detections_db_size;
   browser.runtime
      .sendMessage({
         type: "GET_DETECTIONS_DB_SIZE",
         version: 2,
      })
      .then((res) => {
         detections_db_size = res.size;
         $("#storage-edited-detections-size").text(
            formatBytes(detections_db_size)
         );
      })
      .then(() => {
         browser.storage.local.get(null).then((res) => {
            let sticker_size = 0;
            let lock_timer_logs_size = 0;
            let oom_size = 0;
            let oom_containers_count = 0;
            let oom_tree_count = 0;
            sticker_collections.forEach(function (collection, key) {
               collection._stickers.forEach(function (sticker, name) {
                  sticker_size += new Blob([sticker.url]).size;
               });
            });
            $("#storage-local-sticker-size").text(formatBytes(sticker_size));
            if (res.lock_timer_logs) {
               lock_timer_logs_size = JSON.stringify(
                  res.lock_timer_logs
               ).length;
            }
            $("#storage-lock-timer-logs-size").text(
               formatBytes(lock_timer_logs_size)
            );
            if (
               res.only_once_mode_storage_manager &&
               res.only_once_mode_storage_manager.trees
            ) {
               let local_request = browser.storage.local.get(
                  res.only_once_mode_storage_manager.trees
               );
               local_request.then((local) => {
                  oom_tree_count =
                     res.only_once_mode_storage_manager.trees.length;
                  for (const tree_reference of res
                     .only_once_mode_storage_manager.trees) {
                     if (local.hasOwnProperty(tree_reference)) {
                        let compressed = local[tree_reference];
                        let decompressed = LZString.decompress(compressed);
                        const obj = JSON.parse(decompressed);
                        oom_containers_count += obj.count;
                        oom_size += decompressed.length;
                     } else {
                        console.error(
                           "Corrupted oom data storage!",
                           tree_reference
                        );
                     }
                  }
                  $("#oom-cache-size").text(formatBytes(oom_size));
                  $("#oom-containers").text(oom_tree_count);
                  $("#oom-image-hashes").text(oom_containers_count);
                  $("#statistics-oom").text(oom_containers_count);
                  $("#storage-local-size").text(
                     formatBytes(sticker_size + detections_db_size + oom_size)
                  );
               });
            }
         });
      });
}

function countLeaves(obj) {
   return Object.values(obj).reduce(
      (count, v) => (count += typeof v === "object" ? countLeaves(v) : 1),
      0
   );
}

$("#remote-settings-subscribe, #settings-import-cloud, #settings-load").on(
   "click mousedown mouseup submit",
   function (e) {
      if (!lock_configuration || lock_configuration.enabled) {
         e.preventDefault();
         e.stopImmediatePropagation();
         e.stopPropagation();
      }
   }
);

$("#import-data, #clear-data").on(
   "click mousedown mouseup submit",
   function (e) {
      if (
         !lock_configuration ||
         !remote_configuration ||
         lock_configuration.enabled ||
         remote_configuration.lock
      ) {
         e.preventDefault();
         e.stopImmediatePropagation();
         e.stopPropagation();
      }
   }
);

$("#remote-settings-unsubscribe, #remote-settings-unsubscribe-patreon").on(
   "click mousedown mouseup submit keydown keyup keypress",
   function (e) {
      if (
         !remote_configuration ||
         (remote_configuration.lock &&
            (!user ||
               user.permissions.permission_unsubscribe_remote >
                  user.patreon_tier))
      ) {
         e.preventDefault();
         e.stopImmediatePropagation();
         e.stopPropagation();
      }
   }
);

$("#remote-settings-unsubscribe, #remote-settings-unsubscribe-patreon").on(
   "click mousedown mouseup submit keydown keyup keypress",
   function (e) {
      if (
         remote_configuration.lock &&
         (!user ||
            user.permissions.permission_unsubscribe_remote > user.patreon_tier)
      ) {
         e.preventDefault();
         e.stopImmediatePropagation();
         e.stopPropagation();
      }
   }
);

$("#settings-load").on("click mousedown mouseup submit", function (e) {
   if (
      lock_configuration.enabled &&
      lock_configuration.locked_options.includes("settings")
   ) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
   }
});

$("#remote-settings-identifier, #settings-import-cloud-identifier").on(
   "keydown keyup keypress input change submit",
   function (e) {
      if (lock_configuration.enabled) {
         e.preventDefault();
         e.stopImmediatePropagation();
         e.stopPropagation();
      }
   }
);

$("#settings_import_dropzone").on("dragover dragenter drop", function (e) {
   if (lock_configuration.enabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
   }
});

function updateOnCensorShapeChange($input) {
   let name = parseEffectFromIndex(
      parseInt(
         $input.closest(".general-accordion-container").attr("data-censor-type")
      )
   ).name;
   if (name === "black") name = "bar";

   if (parseInt($input.val()) === 0) {
      $(`#${name}_rounding`).closest(".general-setting").show();
   } else {
      $(`#${name}_rounding`).closest(".general-setting").hide();
   }
}

$(
   "#bar_shape, #pixel_shape, #blur_shape, #triangle_shape, #sobel_shape"
).change(function (e) {
   updateOnCensorShapeChange($(this));
});

function updateOnBarTypeChange() {
   if (parseInt($("#bar_type").val()) === 0) {
      $("#bar_color").closest(".general-setting").show();
      $("#bar_opacity").closest(".general-setting").hide();
   } else {
      $("#bar_color").closest(".general-setting").hide();
      $("#bar_opacity").closest(".general-setting").show();
   }
}

$("#bar_type").change(function (e) {
   updateOnBarTypeChange();
});

$("#content_toggle_all").on("click", async function () {
   await requesting_config;
   if (lock_configuration.enabled) {
      return;
   }

   labels = [];
   for (let entry in klasses) {
      if (!experimental_content && klasses[entry].experimental) continue;
      labels.push(klasses[entry].key);
      setMixedLabelTypeRowSelected(klasses[entry].index, true);
   }
   restoreLabels();

   browser.storage.sync.set({
      labels: labels,
   });
});

$("#content_toggle_none").on("click", async function () {
   await requesting_config;
   if (lock_configuration.enabled) {
      return;
   }

   labels = [];
   for (let entry in klasses) {
      setMixedLabelTypeRowSelected(klasses[entry].index, false);
   }
   restoreLabels();

   browser.storage.sync.set({
      labels: labels,
   });
});

$("#content_toggle_flip").on("click", async function () {
   await requesting_config;
   if (lock_configuration.enabled) {
      return;
   }

   for (let entry in klasses) {
      if (!experimental_content && klasses[entry].experimental) continue;
      if (labels.includes(klasses[entry].key)) {
         labels = labels.filter((e) => e !== klasses[entry].key);
         setMixedLabelTypeRowSelected(klasses[entry].index, false);
      } else {
         labels.push(klasses[entry].key);
         setMixedLabelTypeRowSelected(klasses[entry].index, true);
      }
   }
   restoreLabels();

   browser.storage.sync.set({
      labels: labels,
   });
});

let mixed_multiselect_info = null;

$(document).click(function (e) {
   if ($(e.target).closest(".mixed-censor-type-popup").length) return;

   let $entry = $(e.target).closest(".mixed-entry");
   if (!$entry.length) {
      $(".mixed-entry").removeClass("selected");
      mixed_multiselect_info = null;
      return;
   }

   if (!e.shiftKey && !e.ctrlKey) {
      if (
         !$entry.hasClass("selected") ||
         !$(e.target).closest(
            ".mixed-entry-select, .mixed-entry-button-container"
         ).length
      ) {
         $(".mixed-entry").removeClass("selected");
         mixed_multiselect_info = null;
         return;
      }
   } else {
      if (e.shiftKey) {
         // If no anchor is set
         if (mixed_multiselect_info == null) {
            // Select this entry and set is as the anchor
            $entry.addClass("selected");
            mixed_multiselect_info = {
               anchor: $entry,
            };
         } else {
            let $table_cols = $(".entries-table").find("tr");
            let $entries_rows;
            // Get the rows for the table section in which the click happened
            if ($entry.parent().attr("data-label-type")) {
               $entries_rows = $table_cols.find(
                  ".mixed-entries-row[data-label-type]:eq(0)"
               );
               if (!$entries_rows.find($entry).length) {
                  $entries_rows = $table_cols.find(
                     ".mixed-entries-row[data-label-type]:eq(1)"
                  );
               }
            } else {
               $entries_rows = $entry.parent();
            }

            let anchor_row_index = $entries_rows.index(
               mixed_multiselect_info.anchor.parent()
            );
            // If the anchor is in the same table section as this click
            if (anchor_row_index !== -1) {
               // Get only the entries rows between the anchor and this entry
               let row_index = $entries_rows.index($entry.parent());
               if (row_index < anchor_row_index) {
                  $entries_rows = $entries_rows.slice(
                     row_index,
                     anchor_row_index + 1
                  );
               } else {
                  $entries_rows = $entries_rows.slice(
                     anchor_row_index,
                     row_index + 1
                  );
               }

               // Get only the entries between the anchor and this entry
               let layer = parseInt($entry.attr("data-index"));
               let anchor_layer = parseInt(
                  mixed_multiselect_info.anchor.attr("data-index")
               );
               let [min_layer, max_layer] =
                  layer <= anchor_layer
                     ? [layer, anchor_layer]
                     : [anchor_layer, layer];
               let $entries = $entries_rows
                  .find(".mixed-entry")
                  .filter(function () {
                     let other_layer = parseInt($(this).attr("data-index"));
                     return (
                        min_layer <= other_layer && other_layer <= max_layer
                     );
                  });

               // If ctrl+click, set this entry as the anchor, otherwise, deselect the previous selection and store the new one
               if (e.ctrlKey) {
                  mixed_multiselect_info = {
                     anchor: $entry,
                  };
               } else {
                  mixed_multiselect_info.selection
                     ?.not(mixed_multiselect_info.anchor)
                     .removeClass("selected");
                  mixed_multiselect_info.selection = $entries;
               }

               // Finally select the selection
               $entries.addClass("selected");
            } else {
               // If ctrl+click, set this entry as the anchor, otherwise, deselect the previous selection and store this entry as the selection
               if (e.ctrlKey) {
                  mixed_multiselect_info = {
                     anchor: $entry,
                  };
               } else {
                  mixed_multiselect_info.selection
                     ?.not(mixed_multiselect_info.anchor)
                     .removeClass("selected");
                  mixed_multiselect_info.selection = $entry;
               }

               // Finally select this entry
               $entry.addClass("selected");
            }
         }
      } else {
         // Toggle selecting this entry and set it as the anchor
         let is_selected = $entry.hasClass("selected");
         if (is_selected) {
            $entry.removeClass("selected");
         } else {
            $entry.toggleClass("selected");
            mixed_multiselect_info = {
               anchor: $entry,
            };
         }
      }
   }
});

// On shift/ctrl + dblclick, deselect all but the clicked mixed entry
$(document).dblclick(function (e) {
   if ($(e.target).closest(".mixed-censor-type-popup").length) return;
   if (e.shiftKey || e.ctrlKey) {
      $(".mixed-entry").removeClass("selected");
      let $mixed_entry = $(e.target).closest(".mixed-entry");
      if ($mixed_entry.length) {
         $mixed_entry.addClass("selected");
         mixed_multiselect_info = {
            anchor: $mixed_entry,
         };
      }
   }
});

$(".mixed-entry-select ul").hide();

$(document).click(function (e) {
   if (e.shiftKey || e.ctrlKey) return;
   let $select = $(e.target).closest(".mixed-entry-select");
   if (!$select.length) {
      $(".mixed-entry-select ul").hide();
      return;
   }

   let $select_option_label = $(e.target).closest(
      ".mixed-entry-select ul li a"
   );
   if ($select_option_label.length) {
      $(".mixed-entry-select ul").hide();
      let censor_type = parseInt(
         $select.closest(".mixed-entry").attr("data-censor-type")
      );
      setMixedPreset(
         $select.add(
            `.mixed-entry.selected[data-censor-type="${censor_type}"] .mixed-entry-select`
         ),
         $select_option_label.parent().val()
      );

      saveConfig();
      return;
   }

   let $select_name = $(e.target).closest(".mixed-entry-select a");
   if ($select_name.length) {
      let $select_items = $select.children("ul");
      $(".mixed-entry-select ul").not($select_items).hide();
      $select_items.toggle();
      return;
   }
});

$(document).on("click", function (e) {
   if ($(e.target).closest(".mixed-censor-type-popup").length) return;
   $(".mixed-censor-type-popup").hide();
});
$(document).on(
   "click",
   ".mixed-censor-type-popup .type-button-s",
   function (e) {
      const popup_el = $(this).closest(".mixed-censor-type-popup");
      censorTypeSelectorCallback?.(parseInt($(this).attr("data-censor-type")));
      popup_el.hide();
   }
);

let censorTypeSelectorCallback;
function spawnCensorTypeSelector(buttonEl, callback) {
   censorTypeSelectorCallback = callback;

   const popupEl = $(".mixed-censor-type-popup");
   popupEl.show();

   popupEl.position({
      my: "left top+4",
      at: "left bottom",
      of: buttonEl,
      collision: "fit flipfit",
   });
}

$(document)
   .click(function (e) {
      const $remove_button = $(e.target).closest(".mixed-entry-remove-button");
      if (!$remove_button.length) return;
      if (e.shiftKey || e.ctrlKey) return;
      removeMixedCensorType(
         $remove_button.closest(".mixed-entry").add(".mixed-entry.selected")
      );
      saveConfig();
   })
   .click(function (e) {
      const buttonEl = $(e.target).closest(".mixed-entry-button");
      if (!buttonEl.length) return;
      if (e.shiftKey || e.ctrlKey) return;

      const entryEl = buttonEl.closest(".mixed-entry");
      const entriesRowEl = entryEl.closest(".mixed-entries-row");

      let index = entryEl.attr("data-index");
      let label_type = null;
      let reverse_type = false;
      if (entriesRowEl.is("[data-reverse-type]")) {
         reverse_type = true;
      } else {
         label_type = entriesRowEl.attr("data-label-type");
      }

      $('.mixed-censor-type-popup button[data-censor-type="10"]').hide();
      spawnCensorTypeSelector(buttonEl, (censor_type) => {
         let mixed_entry;
         if (reverse_type) {
            mixed_entry = $("#mixed_setting_group").find(
               `.mixed-entries-row[data-reverse-type] .mixed-entry[data-index="${index}"]`
            );
         } else {
            mixed_entry = $("#mixed_setting_group").find(
               `.mixed-entries-row[data-label-type="${label_type}"] .mixed-entry[data-index="${index}"]`
            );
         }

         let entryEls = mixed_entry.add(".mixed-entry.selected");
         setMixedCensorType(
            mixed_entry.add(".mixed-entry.selected"),
            censor_type
         );
         setMixedPreset(
            entryEls.find(".mixed-entry-select"),
            censor_type === 0 ? null : 0
         );

         saveConfig();
      });
   });

function setMixedLabelTypeRowSelected(label_type, selected) {
   const $label_type_button = $(
      `#mixed_setting_group .mixed-label-type-button[data-label-type="${label_type}"]`
   );
   const $censor_type_button = $(
      `#mixed_setting_group .mixed-entries-row[data-label-type="${label_type}"] .mixed-entry-button`
   );

   if (selected) {
      $label_type_button.addClass("selected");
      $censor_type_button.addClass("selected");
   } else {
      $label_type_button.removeClass("selected");
      $censor_type_button.removeClass("selected");
   }
}

function setMixedReverseRowSelected(selected) {
   const $censor_type_button = $(
      `#mixed_setting_group .mixed-entries-row[data-reverse-type] .mixed-entry-button`
   );

   if (selected) {
      $censor_type_button.addClass("selected");
   } else {
      $censor_type_button.removeClass("selected");
   }
}

function restoreMixedLabelsSelected() {
   $(".body-part-element .body-part-toggle io-toggle").each(function () {
      const label_type = klasses_by_key[$(this).attr("label")].index;
      setMixedLabelTypeRowSelected(
         label_type,
         $(this).attr("check") ? true : false
      );
   });
}

function restoreConfig() {
   if (clustering_configuration.enabled) {
      $(".typecm").addClass("selected");
      $(".clusteringToggle").attr("check", true);
   } else {
      $(".typecm").removeClass("selected");
      $(".clusteringToggle").removeAttr("check");
   }
   updatePresets(
      $(`.presets[data-cluster-censor-extra]`),
      clustering_configuration,
      updateClusterPresetConfig
   );
   let general_setting_extra_cluster_selects_els = $(".gse-cluster ul");
   general_setting_extra_cluster_selects_els.empty();
   for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
      let preset = clustering_configuration.presets[i];
      if (preset == null) continue;

      general_setting_extra_cluster_selects_els.append(
         $(`<li value="${i}"><a>${replaceHtmlEntities(preset.name)}</a></li>`)
      );
   }

   restoreCaptionConfig();

   if (word_wall_configuration.enabled) {
      $(".typeww").addClass("selected");
      $(".word-wall-toggle").attr("check", true);
   } else {
      $(".typeww").removeClass("selected");
      $(".word-wall-toggle").removeAttr("check");
   }
   updatePresets(
      $(`.presets[data-word-wall-censor-extra]`),
      word_wall_configuration,
      updateWordWallPresetConfig
   );
   let general_setting_extra_word_wall_selects_els = $(".gse-word-wall ul");
   general_setting_extra_word_wall_selects_els.empty();
   for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
      let preset = word_wall_configuration.presets[i];
      if (preset == null) continue;

      general_setting_extra_word_wall_selects_els.append(
         $(`<li value="${i}"><a>${replaceHtmlEntities(preset.name)}</a></li>`)
      );
   }

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

   for (const censor_type in censor_configs_by_type) {
      updatePresets(
         $(`.presets[data-censor-type=${censor_type}]`),
         censor_configs_by_type[censor_type],
         updateCensorTypePresetConfig[censor_type]
      );
   }

   restoreMixedLabelsSelected();

   if (reverse_mode_configuration.enabled) {
      $(".reverseToggle").attr("check", true);
      $("button.typerm").addClass("selected");
   } else {
      $(".reverseToggle").removeAttr("check");
      $("button.typerm").removeClass("selected");
   }
   setMixedReverseRowSelected(reverse_mode_configuration.enabled);

   const reverseModeModeEl = $("#reverse-mode-mode");
   updateIterable(reverseModeModeEl, reverse_mode_configuration.mode);

   if (only_once_mode_configuration.enabled) {
      $(".oomToggle").attr("check", true);
   } else {
      $(".oomToggle").removeAttr("check");
   }

   if (only_once_mode_configuration.precision != null) {
      $("#only_once_mode_precision").val(
         only_once_mode_configuration.precision
      );
   }
   if (only_once_mode_configuration.message != null) {
      $("#only_once_mode_message").val(only_once_mode_configuration.message);
   }
   if (only_once_mode_configuration.date_time_format != null) {
      $("#only_once_mode_date_time_format").val(
         only_once_mode_configuration.date_time_format
      );
   } else {
      $("#only_once_mode_date_time_format").val("");
   }
   if (only_once_mode_configuration.mode != null) {
      $(".oomModeRadio").prop("checked", false);
      $(
         '.oomModeRadio[value="' + only_once_mode_configuration.mode + '"]'
      ).prop("checked", true);
      $(
         $(
            '.oomModeRadio[value="' + only_once_mode_configuration.mode + '"]'
         ).attr("hide")
      ).hide();
      $(
         $(
            '.oomModeRadio[value="' + only_once_mode_configuration.mode + '"]'
         ).attr("show")
      ).show();
   }
   $("#only_once_mode_timer").prop(
      "checked",
      only_once_mode_configuration.timer
   );
   $($("#only_once_mode_timer").attr("enable")).toggleClass(
      "disabled",
      !only_once_mode_configuration.timer
   );
   $("#only_once_mode_timer_refresh").prop(
      "checked",
      only_once_mode_configuration.timer_autorefresh
   );
   $($("#only_once_mode_timer_refresh").attr("enable")).toggleClass(
      "disabled",
      !only_once_mode_configuration.timer_autorefresh
   );
   if (only_once_mode_configuration.timer_animation) {
      if (only_once_mode_configuration.timer_animation == 1) {
         $("#only_once_mode_timer_animation_progressbar").prop("checked", true);
      } else if (only_once_mode_configuration.timer_animation == 2) {
         $("#only_once_mode_timer_animation_black").prop("checked", true);
      } else {
         $("#only_once_mode_timer_animation_blur").prop("checked", true);
      }
   }
   if (only_once_mode_configuration.timer_min_duration != null) {
      let dur = only_once_mode_configuration.timer_min_duration;
      let obj = msToDMHSObject(dur);
      $("#oom-min-timer-days").val(obj.days);
      $("#oom-min-timer-hours").val(obj.hours);
      $("#oom-min-timer-minutes").val(obj.minutes);
      $("#oom-min-timer-seconds").val(obj.seconds);
      validateInputValueOnChange.call($("#oom-min-timer-days")[0]);
      validateInputValueOnChange.call($("#oom-min-timer-hours")[0]);
      validateInputValueOnChange.call($("#oom-min-timer-minutes")[0]);
      validateInputValueOnChange.call($("#oom-min-timer-seconds")[0]);
   }
   if (only_once_mode_configuration.timer_max_duration != null) {
      let dur = only_once_mode_configuration.timer_max_duration;
      let obj = msToDMHSObject(dur);
      $("#oom-max-timer-days").val(obj.days);
      $("#oom-max-timer-hours").val(obj.hours);
      $("#oom-max-timer-minutes").val(obj.minutes);
      $("#oom-max-timer-seconds").val(obj.seconds);
      validateInputValueOnChange.call($("#oom-max-timer-days")[0]);
      validateInputValueOnChange.call($("#oom-max-timer-hours")[0]);
      validateInputValueOnChange.call($("#oom-max-timer-minutes")[0]);
      validateInputValueOnChange.call($("#oom-max-timer-seconds")[0]);
   }

   if (only_once_mode_configuration.width_min != null) {
      $("#only_once_mode_min_width").val(
         only_once_mode_configuration.width_min
      );
   }
   if (only_once_mode_configuration.height_min != null) {
      $("#only_once_mode_min_height").val(
         only_once_mode_configuration.height_min
      );
   }
   if (only_once_mode_configuration.trigger != null) {
      $(".oom-label").each(function () {
         let key = $(this).attr("label");
         let r = Object.values(klasses).find((e) => e.key == key);
         $(this).prop(
            "checked",
            only_once_mode_configuration.trigger.includes(r.index)
         );
      });
   }
   if (only_once_mode_configuration.display_classes) {
      $("#only_once_mode_display_classes").prop("checked", true);
   }
   if (
      only_once_mode_configuration.mode_configuration[1].transparency != null
   ) {
      $("#only_once_mode_mode_see_trough_advanced_transparency").val(
         only_once_mode_configuration.mode_configuration[1].transparency * 100
      );
   }

   if (only_once_mode_configuration.mode_configuration[2].distance != null) {
      $("#only_once_mode_mode_border_advanced_distance").val(
         only_once_mode_configuration.mode_configuration[2].distance * 100
      );
   }
   if (only_once_mode_configuration.mode_configuration[2].radius != null) {
      $("#only_once_mode_mode_border_advanced_radius").val(
         only_once_mode_configuration.mode_configuration[2].radius
      );
   }

   if (only_once_mode_configuration.mode_configuration[3].blur != null) {
      $("#only_once_mode_mode_thumbnail_advanced_blur").val(
         only_once_mode_configuration.mode_configuration[3].blur * 100
      );
   }

   if (only_once_mode_configuration.mode_configuration[4].strength != null) {
      $("#only_once_mode_mode_grid_advanced_strength").val(
         only_once_mode_configuration.mode_configuration[4].strength
      );
   }
   if (
      only_once_mode_configuration.mode_configuration[4].color_1 != null &&
      only_once_mode_configuration.mode_configuration[4].color_2 != null
   ) {
      $("#only_once_mode_mode_grid_advanced_color_1").val(
         only_once_mode_configuration.mode_configuration[4].color_1
      );
      $("#only_once_mode_mode_grid_advanced_color_1").css(
         "background-color",
         only_once_mode_configuration.mode_configuration[4].color_1
      );
      $("#only_once_mode_mode_grid_advanced_color_2").val(
         only_once_mode_configuration.mode_configuration[4].color_2
      );
      $("#only_once_mode_mode_grid_advanced_color_2").css(
         "background-color",
         only_once_mode_configuration.mode_configuration[4].color_2
      );
   }

   if (only_once_mode_configuration.mode_configuration[5].blur != null) {
      $("#only_once_mode_mode_blur_advanced_blur").val(
         only_once_mode_configuration.mode_configuration[5].blur * 100
      );
   }
   if (only_once_mode_configuration.mode_configuration[5].grayscale != null) {
      $("#only_once_mode_mode_blur_advanced_grayscale").prop(
         "checked",
         only_once_mode_configuration.mode_configuration[5].grayscale
      );
   }

   if (only_once_mode_configuration.mode_configuration[6].allow_faces != null) {
      $("#only_once_mode_mode_box_tease_advanced_allow_faces").prop(
         "checked",
         only_once_mode_configuration.mode_configuration[6].allow_faces
      );
   }

   setCustomOOMModeCensorType(
      only_once_mode_configuration.mode_configuration[7].censor_type
   );

   setCustomOOMModeCensorPresetIndex(
      only_once_mode_configuration.mode_configuration[7].censor_preset_index
   );

   if (remote_configuration.check_mode != null) {
      $("input[name=remoteCheckModeRadio]").val([
         remote_configuration.check_mode,
      ]);
   }

   $("#sticker_collections").empty();
   sticker_collections.forEach(function (collection, key) {
      $("#sticker_collections").append(
         $("<option>", {
            value: key,
            text: capitalizeFirstLetter(collection._name),
            name: collection._name,
            class:
               " " +
               (collection._enabled
                  ? "sticker_collection_enabled"
                  : "sticker_collection_disabled") +
               " " +
               (collection._locked ? "sticker_collection_locked" : ""),
         })
      );
   });
}

async function saveConfig() {
   await requesting_config;

   if (lock_configuration.enabled) return;

   {
      const $tab_presets = $(`.presets[data-cluster-censor-extra] .tab-preset`);
      const selectedPresetIndex = parseInt(
         $tab_presets.filter(".tab-preset-selected").attr("data-index")
      );
      saveClusterPresetConfig(
         clustering_configuration.presets[selectedPresetIndex]
      );
      for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
         if (clustering_configuration.presets[i] == null) continue;
         clustering_configuration.presets[i].name = $tab_presets
            .filter(`[data-index="${i}"]`)
            .find("input")

            .val();
      }
      clustering_configuration.selectedPresetIndex = selectedPresetIndex;
   }

   {
      const $tab_presets = $(
         `.presets[data-word-wall-censor-extra] .tab-preset`
      );
      const selectedPresetIndex = parseInt(
         $tab_presets.filter(".tab-preset-selected").attr("data-index")
      );
      saveWordWallPresetConfig(
         word_wall_configuration.presets[selectedPresetIndex]
      );
      for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
         if (word_wall_configuration.presets[i] == null) continue;
         word_wall_configuration.presets[i].name = $tab_presets
            .filter(`[data-index="${i}"]`)
            .find("input")

            .val();
      }
      word_wall_configuration.selectedPresetIndex = selectedPresetIndex;
   }

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

   for (const censor_type in censor_configs_by_type) {
      const censor_config = censor_configs_by_type[censor_type];

      const $tab_presets = $(
         `.presets[data-censor-type=${censor_type}] .tab-preset`
      );
      const selectedPresetIndex = parseInt(
         $tab_presets.filter(".tab-preset-selected").attr("data-index")
      );
      saveCensorTypePresetConfig[censor_type](
         censor_config.presets[selectedPresetIndex]
      );

      for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
         if (censor_config.presets[i] == null) continue;
         censor_config.presets[i].name = $tab_presets
            .filter(`[data-index="${i}"]`)
            .find("input")
            .val();
      }

      censor_config.selectedPresetIndex = selectedPresetIndex;
   }

   reverse_mode_configuration.mode = parseInt(
      $("#reverse-mode-mode").attr("value") ?? 0
   );

   only_once_mode_configuration.precision = Math.min(
      64,
      Math.max(58, $("#only_once_mode_precision").val())
   );
   only_once_mode_configuration.message = $("#only_once_mode_message").val();
   only_once_mode_configuration.date_time_format = $(
      "#only_once_mode_date_time_format"
   ).val()
      ? $("#only_once_mode_date_time_format").val()
      : "";
   only_once_mode_configuration.mode = parseInt(
      $(".oomModeRadio").filter(":checked").val()
   );

   only_once_mode_configuration.timer = $("#only_once_mode_timer").is(
      ":checked"
   )
      ? true
      : false;
   only_once_mode_configuration.timer_autorefresh = $(
      "#only_once_mode_timer_refresh"
   ).is(":checked")
      ? true
      : false;

   only_once_mode_configuration.timer_animation = $(
      "#only_once_mode_timer_animation_progressbar"
   ).is(":checked")
      ? 1
      : $("#only_once_mode_timer_animation_black").is(":checked")
        ? 2
        : $("#only_once_mode_timer_animation_blur").is(":checked")
          ? 3
          : 0;

   only_once_mode_configuration.mode_configuration[1].transparency = Math.min(
      0.08,
      Math.max(
         0.01,
         $("#only_once_mode_mode_see_trough_advanced_transparency").val() / 100
      )
   );

   only_once_mode_configuration.mode_configuration[2].distance = Math.min(
      0.2,
      Math.max(
         0.01,
         $("#only_once_mode_mode_border_advanced_distance").val() / 100
      )
   );
   only_once_mode_configuration.mode_configuration[2].radius = Math.min(
      300,
      Math.max(0, $("#only_once_mode_mode_border_advanced_radius").val())
   );

   only_once_mode_configuration.mode_configuration[3].blur = Math.min(
      0.1,
      Math.max(
         0.0,
         $("#only_once_mode_mode_thumbnail_advanced_blur").val() / 100
      )
   );

   only_once_mode_configuration.mode_configuration[4].strength = Math.min(
      1,
      Math.max(0.1, $("#only_once_mode_mode_grid_advanced_strength").val())
   );
   only_once_mode_configuration.mode_configuration[4].color_1 = $(
      "#only_once_mode_mode_grid_advanced_color_1"
   ).val();
   only_once_mode_configuration.mode_configuration[4].color_2 = $(
      "#only_once_mode_mode_grid_advanced_color_2"
   ).val();

   only_once_mode_configuration.mode_configuration[5].blur = Math.min(
      0.2,
      Math.max(0.01, $("#only_once_mode_mode_blur_advanced_blur").val() / 100)
   );
   only_once_mode_configuration.mode_configuration[5].grayscale = $(
      "#only_once_mode_mode_blur_advanced_grayscale"
   ).is(":checked")
      ? true
      : false;

   only_once_mode_configuration.mode_configuration[6].allow_faces = $(
      "#only_once_mode_mode_box_tease_advanced_allow_faces"
   ).is(":checked")
      ? true
      : false;

   if (!only_once_mode_configuration.mode) {
      only_once_mode_configuration.mode = 0;
   }
   only_once_mode_configuration.width_min = Math.max(
      0,
      $("#only_once_mode_min_width").val()
   );
   only_once_mode_configuration.height_min = Math.max(
      0,
      $("#only_once_mode_min_height").val()
   );
   let triggers = [];
   $(".oom-label").each(function () {
      if ($(this).is(":checked")) {
         let key = $(this).attr("label");
         let r = Object.values(klasses).find((e) => e.key == key);
         triggers.push(r.index);
      }
   });
   only_once_mode_configuration.trigger = triggers;
   only_once_mode_configuration.display_classes = !!$(
      "#only_once_mode_display_classes"
   ).is(":checked");

   await browser.storage.sync.set({
      bar_configuration: bar_configuration,
      blur_configuration: blur_configuration,
      pixel_configuration: pixel_configuration,
      glitch_configuration: glitch_configuration,
      triangle_configuration: triangle_configuration,
      box_configuration: box_configuration,
      sticker_configuration: sticker_configuration,
      sobel_configuration: sobel_configuration,
      splatter_configuration: splatter_configuration,
      mixed_configuration: mixed_configuration,
      random_configuration: random_configuration,
      clustering_configuration: clustering_configuration,
      word_wall_configuration: word_wall_configuration,
      reverse_mode_configuration: reverse_mode_configuration,
      only_once_mode_configuration: only_once_mode_configuration,
   });
}

function restoreView() {
   let option_page_view = browser.storage.sync.get([
      "option_page_view",
      "only_once_mode_configuration",
   ]);
   option_page_view.then((res) => {
      if (res.option_page_view) {
         $(".tab[content=" + res.option_page_view + "]").click();
      }
      if (res.only_once_mode_configuration.mode) {
         let elem = $(
            '.oomModeRadio[value="' +
               res.only_once_mode_configuration.mode +
               '"]'
         );
      }
   });
}

function updateHelp() {
   let cache = browser.storage.sync.get("do_cache");
   cache.then((res) => {
      $(".do_cacheToggle").each(function (i, obj) {
         if (res.do_cache) {
            $(this).attr("check", true);
         } else {
            $(this).removeAttr("check");
         }
      });
   });
   let sending = browser.runtime.sendMessage({
      getdata: true,
   });
   sending.then(function (message) {
      $("#ts-backend").html(message.tsbackend);
      $("#ts-tensors").html(message.tstensors);

      $("#ts-numBytes").html(bytesToSize(message.tsnumBytes));
      $("#ts-numBytesInGPU").html(bytesToSize(message.tsnumBytesInGPU));
      $("#ts-numDataBuffers").html(message.tsnumDataBuffers);
      $("#ts-unreliable").html(message.tsunreliable ? "False" : "True");
      if (message.tsreasons) {
         $("#help_error").show();
         $("#ts-reasons").html(message.tsreasons);
      }

      $("#cached-count").html(message.cache.size);

      let mem = 0;
      message.cache.forEach(function (value, key, map) {
         mem += value._imgdata.size + roughSizeOfObject(value);
      });
      mem = formatBytes(mem);
      $("#cached-size").html(mem);
   }, handleError);
}

function updateStatistics() {
   let sending = browser.runtime.sendMessage({
      syncstatictics: true,
   });
   sending.then((t) => {
      let cache = browser.storage.sync.get([
         "statistics",
         "statistics_enabled",
      ]);
      cache.then((res) => {
         if (res.statistics_enabled) {
            $(".statistics_enabled").attr("check", true);
         } else {
            $(".statistics_enabled").removeAttr("check");
         }
         $("#statistics-total").html(res.statistics.images.total);
         $("#statistics-total-positive").html(
            res.statistics.images.total_positive
         );
         if (res.statistics.images.total_average_duration) {
            $("#statistics-total-average-duration").html(
               res.statistics.images.total_average_duration.toFixed(2) + " ms"
            );
         } else {
            $("#statistics-total-average-duration").html("-");
         }
         if (res.statistics.images.total_average_ai_duration) {
            $("#statistics-total-average-ai-duration").html(
               res.statistics.images.total_average_ai_duration.toFixed(2) +
                  " ms"
            );
         } else {
            $("#statistics-total-average-ai-duration").html("-");
         }
         if (res.statistics.images.total_average_paint_duration) {
            $("#statistics-total-average-paint-duration").html(
               res.statistics.images.total_average_paint_duration.toFixed(2) +
                  " ms"
            );
         } else {
            $("#statistics-total-average-paint-duration").html("-");
         }
         $("#statistics-image-type-jpeg").html(res.statistics.images.type.jpeg);
         $("#statistics-image-type-png").html(res.statistics.images.type.png);
         $("#statistics-image-type-bmp").html(res.statistics.images.type.bmp);
         $("#statistics-image-type-webp").html(res.statistics.images.type.webp);
         $("#statistics-image-type-avif").html(res.statistics.images.type.avif);

         // GIF
         $("#statistics-image-type-gif").html(
            res.statistics.images.type.gif.full
         );
         $("#statistics-image-type-gif-thumb").html(
            res.statistics.images.type.gif.thumbnails
         );
         if (res.statistics.images.type.gif.total_average_frames) {
            $("#statistics-image-type-gif-average-frame-count").html(
               res.statistics.images.type.gif.total_average_frames.toFixed(2)
            );
         } else {
            $("#statistics-image-type-gif-average-frame-count").html("-");
         }
         if (res.statistics.images.type.gif.total_average_duration) {
            $("#statistics-image-type-gif-average-duration").html(
               res.statistics.images.type.gif.total_average_duration.toFixed(
                  2
               ) + " ms"
            );
         } else {
            $("#statistics-image-type-gif-average-duration").html("-");
         }

         $("#statistics-video-total").html(res.statistics.videos.total);
         $("#statistics-video-frames").html(res.statistics.videos.frames);
         $("#statistics-local-files-total").html(
            res.statistics.local_files.total
         );
         $("#statistics-batch-converter-total").html(
            res.statistics.batch_converter.total
         );

         $("#statistics-klasses").empty();
         let total = 0;
         let max_entry_total = -Infinity;
         for (const entry in res.statistics.klasses.label) {
            total += res.statistics.klasses.label[entry].total;
            if (res.statistics.klasses.label[entry].total > max_entry_total) {
               max_entry_total = res.statistics.klasses.label[entry].total;
            }
         }
         for (const entry in res.statistics.klasses.label) {
            if (entry === "NONE") {
               continue;
            }

            let entry_total = res.statistics.klasses.label[entry].total;
            let entry_avg =
               entry_total > 0
                  ? ((100 / total) * entry_total).toFixed(2) + "%"
                  : "-";

            let $info = $(`.stat-bodypart-info[label="${entry}"]`);
            $info.children(".stat-bodypart-count").html(entry_total);
            $info.children(".stat-bodypart-percent").html(entry_avg);
            if (0 < total) {
               $info
                  .children(".stat-bodypart-bar")
                  .css(
                     "width",
                     ((100 / total) * entry_total) / (max_entry_total / total) +
                        "%"
                  );
            } else {
               $info.children(".stat-bodypart-bar").css("width", "100%");
            }
         }
      });
   });
}

function showModalWindow(selector) {
   $(selector).show();
   $("#overlay").show();
}

function hideModalWindow(selector) {
   $(selector).hide();
   $("#overlay").hide();
}

let updateInterval;

function startUpdateInterval() {
   let lockd = null;
   let dur = null;
   updateInterval = window.setInterval(function () {
      // Check if extension got disabled
      let o = browser.storage.sync.get(["lock_configuration"]);
      o.then((res) => {
         if (res.lock_configuration) {
            if (lockd == null) {
               lockd = res.lock_configuration.enabled;
               dur = res.lock_configuration.duration;
            } else if (
               lockd !== res.lock_configuration.enabled ||
               (res.lock_configuration.enabled &&
                  dur !== res.lock_configuration.duration)
            ) {
               lockd = res.lock_configuration.enabled;
               dur = res.lock_configuration.duration;
               if (!res.lock_configuration.enabled) {
                  window.location.reload();
               } else {
                  restoreLockUnlock();
               }
            }
         }
      });
   }, 1000);
}

$("#refresh-cache").click(function () {
   updateHelp();
});

$("#refresh-statistics").click(function () {
   updateStatistics();
});

$("#reset-statistics").click(function () {
   let sending = browser.runtime.sendMessage({
      resetstatistics: true,
   });
   sending.then(function (message) {
      updateStatistics();
   });
});

$("#clear-cache").click(function () {
   let sending = browser.runtime.sendMessage({
      clearcache: true,
   });
   sending.then(function (message) {
      updateHelp();
   });
});

$(".tab").on("click", function () {
   let id = $(this).attr("id");
   if (id !== "gallery_viewer" && id !== "editor") {
      $(".tab").removeClass("tab-selected");
      $(this).addClass("tab-selected");
      $(".content, .content-whitelist").removeClass("content-displayed");
      $("#" + $(this).attr("content")).addClass("content-displayed");
      browser.storage.sync.set({
         option_page_view: $(this).attr("content"),
      });
   }
   setTimeout(function () {
      const url = new URL(window.location);
      url.hash = "";
      window.history.pushState({}, "", url);
   }, 10);
});

$("io-toggle").click(function (e) {
   toggleIoToggle($(this));
});

$("#onoff-toggle").click(function (e) {
   e.stopImmediatePropagation();
   if ($(this).attr("disabled") === "disabled") {
      return;
   }
   if ($(this).is("#onoff-button")) {
      toggleIoToggle($(this));
   }
   $("#onoff").html($(this).attr("check") ? "ON" : "OFF");
   activatePuryFi(!!$(this).attr("check"));
});

$("io-toggle.labelToggle").click(function (e) {
   if (lock_configuration.enabled) {
      return;
   }

   let labellist = labels || [];
   const label = $(this).attr("label");
   if ($(this).attr("check")) {
      if (labellist.indexOf(label) === -1) {
         labellist.push(label);
         $(`button.labelButton[id="${label}"]`).addClass("selected");
         setMixedLabelTypeRowSelected(parseKlassFromKey(label).index, true);
      }
   } else {
      if (labellist.indexOf(label) !== -1) {
         labellist = removeItemAll(labellist, label);
         $(`button.labelButton[id="${label}"]`).removeClass("selected");
         setMixedLabelTypeRowSelected(parseKlassFromKey(label).index, false);
      }
   }
   labels = labellist;
   browser.storage.sync.set({
      labels: labels,
   });
});

$("io-toggle.statisticsToggle").click(function (e) {
   //e.stopImmediatePropagation();
   browser.storage.sync.set({
      statistics_enabled: $(this).attr("check") ? true : false,
   });
});

$("button.cluster-button").click(async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) return;
   let value = $(this).hasClass("selected");
   if (value) {
      $(".clusteringToggle").removeAttr("check");
      $(".typecm").removeClass("selected");
   } else {
      $(".clusteringToggle").attr("check", true);
      $(".typecm").addClass("selected");
   }
   clustering_configuration.enabled = !value;
   browser.storage.sync.set({
      clustering_configuration: clustering_configuration,
   });
});

$("io-toggle.clusteringToggle").click(async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) return;
   let value = $(this).attr("check") ? true : false;
   if (value) {
      $(".typecm").addClass("selected");
   } else {
      $(".typecm").removeClass("selected");
   }
   clustering_configuration.enabled = value;
   browser.storage.sync.set({
      clustering_configuration: clustering_configuration,
   });
});

$("button.caption-button").click(async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) return;
   let value = $(this).hasClass("selected");
   if (value) {
      $(".caption-toggle").removeAttr("check");
      $(".typecpm").removeClass("selected");
   } else {
      $(".caption-toggle").attr("check", true);
      $(".typecpm").addClass("selected");
   }
   caption_configuration.enabled = !value;

   browser.storage.sync.set(
      storeCaptionConfiguration(
         caption_configuration,
         CaptionConfigurationMessage
      )
   );
});

$("io-toggle.caption-toggle").click(async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) return;
   let value = $(this).attr("check") ? true : false;
   if (value) {
      $(".typecpm").addClass("selected");
   } else {
      $(".typecpm").removeClass("selected");
   }
   caption_configuration.enabled = value;

   browser.storage.sync.set(
      storeCaptionConfiguration(
         caption_configuration,
         CaptionConfigurationMessage
      )
   );
});

$("#sticker_enabled_sources").on("focus", async function () {
   await requesting_config;
   if (!$(this).data("autocomplete")) {
      var availableStickers = sticker_collections.map(
         (collection) => collection._name
      );
      $(this).autocomplete({
         source: function (request, response) {
            var term = request.term.split(";").pop().trim();
            var currentStickers = request.term
               .split(";")
               .map((item) => item.trim());
            var suggestions = availableStickers.filter(
               (sticker) => !currentStickers.includes(sticker)
            );
            var matches = $.ui.autocomplete.filter(suggestions, term);
            response(matches);
         },
         focus: function () {
            return false;
         },
         select: function (event, ui) {
            var terms = this.value.split(";");
            terms.pop();
            terms.push(ui.item.value);
            terms.push("");
            this.value = terms.join(";");
            return false;
         },
      });
   }
});

$("#sticker_enabled_sources").on("change focusout", function () {
   // TODO: validate the inputted names refer to existing collections or groups
   $(this).val($(this).val().toLowerCase());
});

function updateOnPixelTypeChange() {
   if ($("#pixel_type").val() == 3) {
      $("#pixel_color_mode").closest(".general-setting").show();
      $("#pixel_density").closest(".general-setting").show();
      $("#pixel_scale_with_detection").closest(".general-setting").hide();
      $("#pixel_grid_width").closest(".general-setting").hide();
      $("#pixel_grid_color").closest(".general-setting").hide();
      $("#pixel_channel_colors").closest(".general-setting").hide();
      $("#pixel_grayscale").closest(".general-setting").hide();
   } else {
      $("#pixel_color_mode").closest(".general-setting").hide();
      $("#pixel_density").closest(".general-setting").hide();
      $("#pixel_grid_width").closest(".general-setting").show();
      $("#pixel_grid_color").closest(".general-setting").show();
      $("#pixel_channel_colors").closest(".general-setting").show();
      $("#pixel_grayscale").closest(".general-setting").show();
      $("#pixel_scale_with_detection").closest(".general-setting").show();
   }
   updateOnPixelColorModeChange();
}

function updateOnPixelColorModeChange() {
   if ($("#pixel_type").val() != 3 || $("#pixel_color_mode").val() == 0) {
      $("#pixel_color").closest(".general-setting").hide();
      $("#pixel_bg_color").closest(".general-setting").hide();
   } else {
      $("#pixel_color").closest(".general-setting").show();
      $("#pixel_bg_color").closest(".general-setting").show();
   }
}

function updateOnTriangleFillColorModeChange() {
   if ($("#triangle_fill_color_mode").val() == 0) {
      $("#triangle_fill_color").closest(".general-setting").hide();
   } else {
      $("#triangle_fill_color").closest(".general-setting").show();
   }
}

function updateOnTriangleStrokeColorModeChange() {
   if ($("#triangle_stroke_color_mode").val() == 0) {
      $("#triangle_stroke_color").closest(".general-setting").hide();
   } else {
      $("#triangle_stroke_color").closest(".general-setting").show();
   }
}

function updateOnTriangleGradientsChange() {
   if (!$("#triangle_gradients").is(":checked")) {
      $("#triangle_gradient_stops").closest(".general-setting").hide();
   } else {
      $("#triangle_gradient_stops").closest(".general-setting").show();
   }
}

function updateOnGlitchTypeChange() {
   $("#glitch_multiple_panels_preview")
      .find("#glitch_multiple_panels_preset_name")
      .html("");
   if ($(this).val() == 0) {
      $('[id^="glitch_chromatic_aberration"]')
         .closest(".general-setting")
         .show();
      $('[id^="glitch_multiple_panels"]').closest(".general-setting").hide();
   } else if ($("#glitch_type").val() == 1) {
      $('[id^="glitch_multiple_panels"]').closest(".general-setting").show();
      $('[id^="glitch_chromatic_aberration"]')
         .closest(".general-setting")
         .hide();
      previewGlitchMultiplePanelsPreset();
   }
}

function onCaptionModeChange() {
   if ($("#caption_mode").val() == 0) {
      $("#caption_color").closest(".general-setting").hide();
   } else {
      $("#caption_color").closest(".general-setting").show();
   }
}

function onWordWallColorModeChange() {
   if ($("#word_wall_color_mode").val() == 0) {
      $("#word_wall_color").closest(".general-setting").hide();
   } else {
      $("#word_wall_color").closest(".general-setting").show();
   }
}

$("#pixel_type").on("change", updateOnPixelTypeChange);
$("#pixel_color_mode").on("change", updateOnPixelColorModeChange);
$("#triangle_fill_color_mode").on(
   "change",
   updateOnTriangleFillColorModeChange
);
$("#triangle_stroke_color_mode").on(
   "change",
   updateOnTriangleStrokeColorModeChange
);
$("#triangle_gradients").on("change", updateOnTriangleGradientsChange);
$("#glitch_type").on("change", updateOnGlitchTypeChange);
$("#caption_mode").on("change", onCaptionModeChange);
$("#word_wall_color_mode").on("change", onWordWallColorModeChange);

function toggleIoToggle(toggleEl, val) {
   toggleEl = toggleEl.add(toggleEl.children("button"));

   if (
      toggleEl.attr("disabled") === "disabled" ||
      toggleEl.hasClass("patreon_locked")
   ) {
      toggleEl.toggleAttr("check", false);
      return;
   }

   if (toggleEl.hasClass("lock-on-toggle")) {
      toggleEl.attr("check", true);
   } else if (val != null) {
      if (val) {
         toggleEl.attr("check", val);
      } else {
         toggleEl.removeAttr("check");
      }
   } else {
      toggleEl.toggleAttr("check", true);
   }
}

$("#batch_converter").click(function (e) {
   let file_types = browser.storage.sync.get([
      "file_types",
      "gif_configuration",
   ]);
   file_types.then((res) => {
      let file_typeslist = res.file_types || [];
      $("#batch_converter_png").addClass("filetype-inactive");
      $("#batch_converter_jpg").addClass("filetype-inactive");
      $("#batch_converter_bmp").addClass("filetype-inactive");
      $("#batch_converter_webp").addClass("filetype-inactive");
      $("#batch_converter_gif").addClass("filetype-inactive");
      file_typeslist.forEach(function (type) {
         $("#batch_converter_" + type).removeClass("filetype-inactive");
      });
      if (res.gif_configuration._thumbnails) {
         $("#batch_converter_gif").removeClass("filetype-inactive");
      }
   });
});

$("io-toggle.debugToggle").click(function (e) {
   $("#" + $(this).attr("label")).toggleClass(
      "selected",
      $(this).attr("check") ? true : false
   );
   let debug = browser.storage.sync.get("debug");
   debug.then((res) => {
      let debugging = res.debug || false;
      browser.storage.sync.set({
         debug: $(this).attr("check") ? true : false,
      });
   });
});

$("io-toggle.do_cacheToggle").click(function (e) {
   $("#" + $(this).attr("label")).toggleClass(
      "selected",
      $(this).attr("check") ? true : false
   );
   let censor = browser.storage.sync.get("do_cache");
   censor.then((res) => {
      browser.storage.sync.set({
         do_cache: $(this).attr("check") ? true : false,
      });
   });
});

// jquery toggle whole attribute
$.fn.toggleAttr = function (attr, val) {
   var test = $(this).attr(attr);
   if (test) {
      // if attrib exists with ANY value, still remove it
      $(this).removeAttr(attr);
   } else {
      $(this).attr(attr, val);
   }
   return this;
};

// jquery toggle just the attribute value
$.fn.toggleAttrVal = function (attr, val1, val2) {
   var test = $(this).attr(attr);
   if (test === val1) {
      $(this).attr(attr, val2);
      return this;
   }
   if (test === val2) {
      $(this).attr(attr, val1);
      return this;
   }
   // default to val1 if neither
   $(this).attr(attr, val1);
   return this;
};

$(".labelButton").on("click", function (event) {
   if (lock_configuration.enabled) {
      return;
   }
   $(this).toggleClass("selected");
   const id = $(this).attr("id");
   if ($(this).hasClass("selected")) {
      $("button[label=" + id + "]").attr("check", true);
      $("button[label=" + id + "]")
         .parent()
         .attr("check", true);
   } else {
      $("button[label=" + id + "]").removeAttr("check");
      $("button[label=" + id + "]")
         .parent()
         .removeAttr("check");
   }
   let labellist = labels || [];
   if ($(this).hasClass("selected")) {
      if (labellist.indexOf(this.id) === -1) {
         labellist.push(this.id);
         setMixedLabelTypeRowSelected(parseKlassFromKey(id).index, true);
      }
   } else {
      if (labellist.indexOf(this.id) !== -1) {
         labellist = removeItemAll(labellist, this.id);
         setMixedLabelTypeRowSelected(parseKlassFromKey(id).index, false);
      }
   }
   labels = labellist;
   browser.storage.sync.set({
      labels: labels,
   });
});

function expandGeneralAccordion() {
   let $settings_cont = $(this).find(".general-settings-container");
   $settings_cont.removeClass("collapsed");
   let ver_padding =
      parseInt($settings_cont.css("padding-top")) +
      parseInt($settings_cont.css("padding-bottom"));
   let scroll_height = $settings_cont.prop("scrollHeight");

   const top_margin = 35;
   const bottom_margin = 50;
   $settings_cont.stop().animate(
      {
         height: scroll_height - ver_padding + "px",
      },
      {
         duration: scroll_height / 3,
         step: function (now, fx) {
            let bottom = $settings_cont[0].getBoundingClientRect().bottom;
            if (bottom + bottom_margin > window.innerHeight) {
               window.scrollBy({
                  top: bottom + bottom_margin - window.innerHeight,
                  behavior: "smooth",
               });
            }
         },
         complete: function () {
            $settings_cont.css("overflow", "visible");
            $settings_cont.css("height", "auto");
         },
      }
   );
   let top = $(this)[0].getBoundingClientRect().top;
   if (top - top_margin < 0) {
      window.scrollBy({ top: top - top_margin, behavior: "smooth" });
   }

   $(this).next(".general-accordion-buttons").show();
   $(this).find(".general-accordion-collapsible").html("-");

   let censor_type = $(this).attr("data-censor-type");
   if (censor_type) {
      selectAccordionTab(
         $(
            `.general-accordion-buttons[data-censor-type="${censor_type}"] .tab-accordion[name="general"]`
         )
      );
   }
}

function collapseGeneralAccordion() {
   let $settings_cont = $(this).find(".general-settings-container");
   $settings_cont.addClass("collapsed");
   let scroll_height = $settings_cont.prop("scrollHeight");

   $settings_cont.css("overflow", "hidden");
   $settings_cont.stop().animate(
      {
         height: 0,
      },
      {
         duration: scroll_height / 3,
         easing: "linear",
      }
   );

   $(this).find(".general-accordion-collapsible").html("+");
   $(this).next(".general-accordion-buttons").hide();
}

function toggleGeneralAccordion() {
   if (!$(this).find(".general-settings").length) return;

   if ($(this).find(".general-accordion-collapsible").html() === "+") {
      expandGeneralAccordion.call(this);
   } else {
      collapseGeneralAccordion.call(this);
   }
}

$(".general-accordion").on("click", async function (e) {
   if (
      $(e.target).is(".icon-button-l, .icon-button-l *, io-toggle, io-toggle *")
   )
      return;
   await requesting_config;

   if (lock_configuration.enabled) return;
   toggleGeneralAccordion.call($(this).closest(".general-accordion-container"));
});

function enableCensorType(accordionEl) {
   $(".censor-type-toggle").removeAttr("check");
   $(".type-button-l").removeClass("selected");
   accordionEl.find(".censor-type-toggle").attr("check", true);
   accordionEl.find(".type-button-l").addClass("selected");
}

$(".censor-type-toggle, .type-button-l").on("click", function (e) {
   let res = browser.storage.sync.get(["lock_configuration"]);
   res.then((res) => {
      if (res.lock_configuration.enabled) return;

      let accordionEl = $(this).closest(".general-accordion-container");
      enableCensorType(accordionEl);

      const censorType = parseInt(accordionEl.attr("data-censor-type"));
      browser.storage.sync.set({
         censor_type: parseEffectFromIndex(censorType).name,
      });
   });
});

$(".debugButton").on("click", function (e) {
   if (!$(this).hasClass("selected")) {
      $(this).addClass("selected");
      $(".debugToggle").attr("check", true);
   } else {
      $(this).removeClass("selected");
      $(".debugToggle").removeAttr("check");
   }
   let debug = browser.storage.sync.get("debug");
   debug.then((res) => {
      let debugging = res.debug || false;
      browser.storage.sync.set({
         debug: $(this).hasClass("selected"),
      });
   });
});

function updateHelpButtons() {
   $("#import-data").toggleClass(
      "locked",
      lock_configuration.enabled || remote_configuration.lock
   );
   $("#clear-data").toggleClass(
      "locked",
      lock_configuration.enabled || remote_configuration.lock
   );
}

$("#export-data").on("click", async function () {
   let v = browser.runtime.getManifest().version;

   let data = await getData();
   delete data.user;
   delete data.username;

   let json = JSON.stringify(data);
   let str = encryptDecryptData(json, v);

   let blob = new Blob([str]);

   browser.runtime.sendMessage({
      type: "SAVE_FILE",
      blob: blob,
      file_ext: "data",
      filename: `data_${getVersion()}`,
      save_as: true,
      version: 2,
   });
});

$("#import-data").on("click", async function () {
   // open a file selector
   let input = document.createElement("input");
   input.type = "file";
   input.accept = ".data";
   input.onchange = async function () {
      let file = this.files[0];
      let reader = new FileReader();
      reader.onload = async function (e) {
         let v = browser.runtime.getManifest().version;

         let data;
         try {
            let str = encryptDecryptData(e.target.result, v);
            data = JSON.parse(str);
            if (data.storage.async.version.replace("B", "") !== v)
               throw "Error: Non-matching version";
         } catch (err) {
            createNotification(
               getI18nStr("on-import-data__invalid-file"),
               `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18,8H16V4H18M15,8H13V4H15M12,8H10V4H12M18,2H10L4,8V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z" fill="currentColor"/></svg>`,
               "danger"
            );
            return;
         }

         browser.runtime
            .sendMessage({
               type: "IMPORT_DATA",
               data: data,
               version: 2,
            })
            .then(() => {
               window.location.reload();
            });
      };
      reader.readAsText(file);
   };
   input.click();
});

$("#unfreeze").on("click", async function () {
   browser.runtime.sendMessage({
      type: "ATTEMPT_UNFREEZE",
      version: 2,
   });
});

$("#clear-data").on("click", async function () {
   if (
      await createConfirm(`
         ${getI18nStr("on-clear-data__confirm")}
         <div class="modal__quote warning" style="margin-top:0.5rem">
            -<b> ${getI18nStr("on-non-reversible-action-warning")}</b>
         </div>
      `)
   ) {
      browser.runtime
         .sendMessage({
            type: "CLEAR_DATA",
            version: 2,
         })
         .then(() => {
            window.location.reload();
         });
   }
});

function animateHighlight($elem) {
   $({ brightness: 1 }).animate(
      { brightness: 2 },
      {
         duration: 50,
         step: function (now) {
            $elem.css("filter", `brightness(${now})`);
         },
         complete: function () {
            $elem.css("filter", "brightness(2)");
            $({ brightness: 2 }).animate(
               { brightness: 1 },
               {
                  duration: 550,
                  step: function (now) {
                     $elem.css("filter", `brightness(${now})`);
                  },
                  complete: function () {
                     $elem.css("filter", "");
                  },
                  easing: "easeInQuad",
                  queue: false,
               }
            );
         },
         easing: "linear",
         queue: false,
      }
   );
}

$("#experimental-content-toggle").on("click", async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) return;

   experimental_content = $(this).attr("check") ? true : false;
   if (!experimental_content) {
      if (
         settingsContainExperimentalContent({
            labels: labels,
            mixed_configuration: mixed_configuration,
            only_once_mode_configuration: only_once_mode_configuration,
            lock_configuration: lock_configuration,
         })
      ) {
         if (
            !(await createConfirm(
               getI18nStr("on-disable-experimental-content__confirm")
            ))
         ) {
            experimental_content = true;
            toggleIoToggle($(this), true);
         } else {
            labels = labels.filter(
               (label) =>
                  ![
                     "EYE",
                     "MOUTH",
                     "NIPPLECOVERED",
                     "NIPPLEEXPOSED",
                     "HANDCOVERED",
                     "HANDEXPOSED",
                  ].includes(label)
            );
            restoreLabels();
            for (let preset of mixed_configuration.presets) {
               if (preset == null) continue;
               preset.config.censor_types[20] = [];
               preset.config.censor_types[21] = [];
               preset.config.censor_types[22] = [];
               preset.config.censor_types[23] = [];
               preset.config.censor_types[24] = [];
               preset.config.censor_types[25] = [];
               preset.config.censor_preset_indexes[20] = [];
               preset.config.censor_preset_indexes[21] = [];
               preset.config.censor_preset_indexes[22] = [];
               preset.config.censor_preset_indexes[23] = [];
               preset.config.censor_preset_indexes[24] = [];
               preset.config.censor_preset_indexes[25] = [];
            }
            only_once_mode_configuration.trigger =
               only_once_mode_configuration.trigger.filter(
                  (trigger) => ![20, 21, 22, 23, 24, 25].includes(trigger)
               );
            restoreConfig();
            lock_configuration.timer_plus_data["EYE"] = 0;
            lock_configuration.timer_plus_data["MOUTH"] = 0;
            lock_configuration.timer_plus_data["NIPPLE_COVERED"] = 0;
            lock_configuration.timer_plus_data["NIPPLE_EXPOSED"] = 0;
            lock_configuration.timer_plus_data["HAND_COVERED"] = 0;
            lock_configuration.timer_plus_data["HAND_EXPOSED"] = 0;
            restoreLockUnlock();
            browser.storage.sync.set({
               experimental_content: experimental_content,
               labels: labels,
               mixed_configuration: mixed_configuration,
               only_once_mode_configuration: only_once_mode_configuration,
               lock_configuration: lock_configuration,
            });
         }
      } else {
         browser.storage.sync.set({
            experimental_content: experimental_content,
         });
      }
   } else {
      browser.storage.sync.set({
         experimental_content: experimental_content,
      });
   }
   $(".experimental-content-required").toggle(experimental_content);
});
