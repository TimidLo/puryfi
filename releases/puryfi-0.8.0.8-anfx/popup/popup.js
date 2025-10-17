$(document).ready(function () {
   $("body").show();
});

async function setStorageSync(set) {
   await browser.storage.sync.set(set);
   messageOptionsPage({
      type: "CONFIGURATION_CHANGED",
      keysChanged: Object.keys(set),
      version: 2,
   });
}

window.onload = function () {
   restoreTheme();

   $("#onoff-toggle").on("click", function (e) {
      e.stopImmediatePropagation();
      if ($(this).attr("disabled") === "disabled") {
         return;
      }
      document.getElementById("onoff-button").toggleAttribute("check");
      document.getElementById("onoff-toggle").toggleAttribute("check");
      $("#onoff").html($(this).attr("check") === "" ? "ON" : "OFF");

      browser.storage.sync.get(["lock_configuration"]).then((res) => {
         if (res.lock_configuration.enabled) return;
         setStorageSync({
            active: $(this).attr("check") === "" ? true : false,
         });
      });
   });

   document
      .getElementById("reverse_censoring")
      .addEventListener("click", function () {
         document
            .getElementById("reverse_censoring-io")
            .toggleAttribute("check");
         document
            .getElementById("reverse_censoring-button")
            .toggleAttribute("check");
         let sync = browser.storage.sync.get(["reverse_mode_configuration"]);
         sync.then((res) => {
            res.reverse_mode_configuration.enabled = document
               .getElementById("reverse_censoring-button")
               .hasAttribute("check")
               ? true
               : false;
            setStorageSync({
               reverse_mode_configuration: res.reverse_mode_configuration,
            });
         });
      });

   $(".type-button").on("click", function (e) {
      setStorageSync({
         censor_type: $(this).attr("id"),
      });
      $(".type-button").removeClass("selected");
      $(this).addClass("selected");
   });

   $(".label-button").on("click", function (event) {
      $(this).toggleClass("selected");
      let labels = browser.storage.sync.get("labels");
      labels.then((res) => {
         labellist = res.labels || [];
         if ($(this).hasClass("selected")) {
            if (labellist.indexOf(this.id) === -1) {
               labellist.push(this.id);
            }
         } else {
            if (labellist.indexOf(this.id) != -1) {
               labellist = removeItemAll(labellist, this.id);
            }
         }
         setStorageSync({
            labels: labellist,
         });
      });
   });

   $("#options, #popup__unaddressed-issues").on("click", function () {
      browser.runtime.openOptionsPage();
      $("body").hide();
   });

   $("#toggle_labels").on("click", function (event) {
      browser.storage.sync
         .get(["labels", "experimental_content"])
         .then((res) => {
            let { labels, experimental_content } = res;
            for (let entry in klasses) {
               if (!experimental_content && klasses[entry].experimental)
                  continue;
               if (labels.includes(klasses[entry].key)) {
                  labels = labels.filter((e) => e !== klasses[entry].key);
               } else {
                  labels.push(klasses[entry].key);
               }
            }
            restoreLabels(experimental_content, labels);
            setStorageSync({
               labels: labels,
            });
         });
   });

   $("#settings-select").change(function () {
      let setting_name = $("#settings-select").find(":selected").val();
      loadSettings(setting_name);
   });

   browser.storage.local.get(["unaddressed_issues"]).then((res) => {
      restoreUnaddressedIssues(res.unaddressed_issues);
   });

   restoreTranslation();
};

function restoreUnaddressedIssues(unaddressed_issues) {
   let unaddressed_issues_keys = Object.keys(unaddressed_issues ?? {});
   if (unaddressed_issues_keys.length === 0) {
      $("#popup__unaddressed-issues").hide().find("span").text("");
   } else {
      $("#popup__unaddressed-issues")
         .show()
         .find("span")
         .text(`${unaddressed_issues_keys.length}`);
   }
}

function removeItemAll(arr, value) {
   let i = 0;
   while (i < arr.length) {
      if (arr[i] === value) {
         arr.splice(i, 1);
      } else {
         ++i;
      }
   }
   return arr;
}

function restoreOptions() {
   browser.storage.sync
      .get([
         "active",
         "censor_type",
         "experimental_content",
         "labels",
         "lock_configuration",
         "reverse_mode_configuration",
         "user",
      ])
      .then((res) => {
         let {
            active,
            censor_type,
            experimental_content,
            labels,
            lock_configuration,
            reverse_mode_configuration,
            user,
         } = res;
         restorePopupONOFF(active);
         restoreCensorType(censor_type);
         restoreLabels(experimental_content, labels);
         restoreAdvanced(user, reverse_mode_configuration);
         restorePopupLockUnlock(user, lock_configuration);
      });
}

function restorePopupONOFF(active) {
   if (active) {
      $(".onoff").attr("check", active);
   } else {
      $(".onoff").removeAttr("check");
   }
   $("#onoff").html(active ? "ON" : "OFF");
}

function restoreCensorType(censor_type) {
   document.getElementById("normal").classList.remove("selected");
   document.getElementById("box").classList.remove("selected");
   document.getElementById("black").classList.remove("selected");
   document.getElementById("pixel").classList.remove("selected");
   document.getElementById("blur").classList.remove("selected");
   document.getElementById("glitch").classList.remove("selected");
   document.getElementById("" + censor_type).classList.add("selected");
}

function restoreLabels(experimental_content, labels) {
   $(".experimental-content-required").toggle(experimental_content);
   $(".label-button").each(function (i, obj) {
      if (labels.includes(obj.id)) {
         $(this).addClass("selected");
      } else {
         $(this).removeClass("selected");
      }
   });
}

function restoreAdvanced(user, reverse_mode_configuration) {
   if (reverse_mode_configuration.enabled) {
      document
         .getElementById("reverse_censoring-button")
         .setAttribute("check", "true");
      document
         .getElementById("reverse_censoring-io")
         .setAttribute("check", "true");
   } else {
      document
         .getElementById("reverse_censoring-button")
         .removeAttribute("check");
      document.getElementById("reverse_censoring-io").removeAttribute("check");
   }

   if (
      user &&
      user.permissions.permission_reverse_censoring <= user.patreon_tier
   ) {
      $("#reverse_mode").show();
   } else {
      $("#reverse_mode").hide();
   }
}

function restorePopupLockUnlock(user, lock_configuration) {
   if (lock_configuration.enabled) {
      $("#normal").hide();
      $("#body-labels-container").hide();
      if (lock_configuration.locked_options.includes("censor_type")) {
         $("#censor-types-container").hide();
      }
      $("#reverse_mode").hide();
      if (lock_configuration.locked_options.includes("settings")) {
         $("#quick-setting-container").addClass("locked");
         $("#quick-setting-container").hide();
      }
      if (lock_configuration.timer_enabled) {
         $("#timer-container").show();
         startTimer(
            lock_configuration.timer_mode === 0
               ? lock_configuration.duration_timestamp
               : lock_configuration.timestamp,
            lock_configuration.duration
         );
      }
      $(".locked-icon").show();
      $("#onoff-toggle").attr("disabled", true);
      $("#onoff-button").prop("disabled", true);
   } else {
      $("#normal").show();
      $("#body-labels-container").show();
      $("#censor-types-container").show();
      $("#quick-setting-container").removeClass("locked");
      if (
         user &&
         user.permissions.permission_reverse_censoring <= user.patreon_tier
      ) {
         $("#reverse_mode").show();
      }
      $(".locked-icon").hide();
      $("#onoff-toggle").attr("disabled", false);
      $("#onoff-button").prop("disabled", false);
   }
}

document.addEventListener("DOMContentLoaded", restoreOptions);

browser.storage.sync.get("labels").then((res) => {
   if (res.labels == null) {
      let labels = browser.storage.sync.get("labels");
      labels.then((res) => {
         let labellist = [];
         $(".label-button").each(function (i, obj) {
            labellist.push(obj.id);
            $(this).addClass("selected");
         });
         setStorageSync({
            labels: labellist,
         });
      });
   }
});

let icon_mode = browser.storage.sync.get("icon_configuration");
icon_mode.then((res) => {
   if (res.icon_configuration != null && !res.icon_configuration.save_mode) {
      $(".icon-public").addClass("icon-nude").removeClass("icon-public");
   }
});
