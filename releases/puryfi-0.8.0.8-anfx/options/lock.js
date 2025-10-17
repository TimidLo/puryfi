$("#lock_password_toggle_vis").click(function () {
   const type =
      $("#lock_password").attr("type") === "password" ? "text" : "password";
   $("#lock_password").attr("type", type);
   $("#lock_confirm_password").attr("type", type);
   if (type == "text") {
      $(this).find(".eye").hide();
      $(this).find(".eye-off").show();
   } else {
      $(this).find(".eye").show();
      $(this).find(".eye-off").hide();
   }
});

const password_valid_chars = [
   "a",
   "b",
   "c",
   "d",
   "e",
   "f",
   "g",
   "h",
   "i",
   "j",
   "k",
   "l",
   "m",
   "n",
   "o",
   "p",
   "q",
   "r",
   "s",
   "t",
   "u",
   "v",
   "w",
   "x",
   "y",
   "z",
   "A",
   "B",
   "C",
   "D",
   "E",
   "F",
   "G",
   "H",
   "I",
   "J",
   "K",
   "L",
   "M",
   "N",
   "O",
   "P",
   "Q",
   "R",
   "S",
   "T",
   "U",
   "V",
   "W",
   "X",
   "Y",
   "Z",
   "0",
   "1",
   "2",
   "3",
   "4",
   "5",
   "6",
   "7",
   "8",
   "9",
   "!",
   "@",
   "#",
   "$",
   "%",
   "^",
   "&",
   "*",
   "(",
   ")",
   "_",
   "+",
   "-",
   "=",
   "{",
   "}",
   "[",
   "]",
   "|",
   ":",
   ";",
   "<",
   ">",
   "?",
   "/",
   ".",
   "`",
   "~",
];

$("#lock_password_randomize").click(function () {
   let rand_password = "";
   for (let i = 0; i < 20; i++) {
      const rand_i = Math.floor(Math.random() * password_valid_chars.length);
      rand_password += password_valid_chars[rand_i];
   }

   $("#lock_password").val(rand_password).trigger("input");
   $("#lock_confirm_password").val(rand_password).trigger("input");

   navigator.clipboard.writeText(rand_password).catch((err) => {
      console.error("Failed to copy randomized password to clipboard: " + err);
   });

   animateHighlight($("#lock_password, #lock_confirm_password"));

   createClipboardCopyNotification($("#lock_password_randomize"));
});

$("#lock_password, #lock_confirm_password").on("input", function () {
   saveLockConfig();
});

$("#lock-show-advanced").click(function () {
   $("#lock-advanced").toggle();
});

$("#lock_timer_check").on("click", function () {
   if ($(this).attr("check")) {
      $("#lock-timer-plus-advanced").show();
   } else {
      $("#lock-timer-plus-advanced").hide();
   }
});

$("#lock_password_check, #lock_timer_check, #lock_timer_plus").on(
   "click",
   function () {
      saveLockConfig();
   }
);

$(document).on("change", ".save-lock-config", function () {
   saveLockConfig();
});

function updateInvalidLockConfigReason(reason) {
   if (!reason) {
      $("#lock-button").removeClass("disabled");
      $("#lock_button_disabled_reason").html("");
   } else {
      $("#lock_button_disabled_reason").html(reason);
      $("#lock-button").addClass("disabled");
   }
   restoreSavingConfig();
}

$(".lock-timer-input, #lock_password, #lock_confirm_password").on("input", function () {
   saveLockConfig();
});

function getLockTimeSum() {
   let d =
      $("#lock-timer-days").val() > 0
         ? $("#lock-timer-days").val() * 24 * 60 * 60
         : 0;
   let h =
      $("#lock-timer-hours").val() > 0
         ? $("#lock-timer-hours").val() * 60 * 60
         : 0;
   let m =
      $("#lock-timer-minutes").val() > 0
         ? $("#lock-timer-minutes").val() * 60
         : 0;
   return (d + h + m) * 1000;
}

let security_token = null;

$("#unlock-token").on("input", async function () {
   let unlock_token = $(this).val();
   if (security_token == null) {
      await requesting_config;
      security_token = lock_configuration.token;
      if (checkUnlockToken(unlock_token, security_token)) {
         unlockExtension();
      }
   } else {
      if (checkUnlockToken(unlock_token, security_token)) {
         unlockExtension();
      }
   }
});

$("#unlock-extension-patreon").click(function () {
   let user_req = browser.storage.sync.get(["user"]);
   user_req.then((res) => {
      if (
         res.user != null &&
         res.user.permissions.permission_unlock_extension <=
            res.user.patreon_tier
      ) {
         unlockExtension();
      }
   });
});
$("#emergency_unlock_help").click(function () {
   $("#emergency_unlock_info").toggle();
});

function checkUnlockToken(unlock_token, security_token) {
   let u = parseInt(unlock_token);
   let s = parseInt(security_token);
   if (
      ("" + unlock_token).length === ("" + security_token).length &&
      validateUnlockToken(u, s) //&&
      //(u+s) % 2 == 0
   ) {
      $("#unlock-token").removeClass("unlock-token-invalid");
      return true;
   } else {
      $("#unlock-token")
         .removeClass("unlock-token-invalid")
         .addClass("unlock-token-invalid");
      return false;
   }
}

function validateUnlockToken(unlock_token, security_token) {
   let u = "" + unlock_token;
   let s = "" + security_token;
   for (let i = 0; i < s.length; i++) {
      let cs = s.charAt(i);
      let cu = u.charAt(i);
      let ns = parseInt(cs);
      let nu = parseInt(cu);
      if (((ns + nu) % 10) % 2 != i % 2) {
         return false;
      }
   }
   return true;
}

function generateUnlockToken(security_token) {
   let s = "" + security_token;
   let r = "";
   for (let i = 0; i < s.length; i++) {
      let ung = [1, 3, 5, 7, 9].sort(function () {
         return 0.5 - Math.random();
      });
      let ger = [2, 4, 6, 8].sort(function () {
         return 0.5 - Math.random();
      });
      let c = s.charAt(i);
      let n = parseInt(c);
      let goal = i % 2;
      let p = ung[0];
      if (goal == 0) {
         if (n % 2 == 0) {
            p = ger[0];
         }
      } else {
         if (n % 2 == 1) {
            p = ger[0];
         }
      }
      let d = p;
      r += d;
   }
   return r;
}

$("#unlock-button").click(function () {
   let pwd = $("#unlock_password").val();
   unlockExtension(pwd);
});

async function unlockExtension(pwd = null) {
   await requesting_config;
   if (
      pwd === null ||
      pwd === lock_configuration.password ||
      hashFnv32a(pwd, true, LOCK_SALT) === lock_configuration.password
   ) {
      lock_configuration = {
         ...new LockConfiguration(),
         timestamp: lock_configuration.timestamp,
         remote_lock: lock_configuration.remote_lock,
      };

      let reason = isLockConfigNotValid(lock_configuration);
      if (reason && saving_configuration.actions.lock_extension) {
         saving_configuration.actions.lock_extension = false;
         browser.storage.sync.set({
            saving_configuration: saving_configuration,
         });
      }
      updateInvalidLockConfigReason(reason);
      browser.storage.sync
         .set({
            lock_configuration: lock_configuration,
         })
         .then(function () {
            window.location.reload();
         });
   } else if (pwd !== "") {
      $("#unlock_password")
         .css({
            animation: "horizontal-shaking 0.25s ease-out",
         })
         .one("animationend", function () {
            $(this).css("animation", "");
         });
   }
}

$("input:radio[name='lock-timer-format']").on("change", function (event) {
   if (parseInt($(this).val()) === 1) {
      $("#lock-timer-date").show();
   } else {
      $("#lock-timer-date").hide();
   }
});

$("#lock-timer-days, #lock-timer-hours, #lock-timer-minutes").on(
   "input",
   function () {
      const curr_date = new Date();
      const new_date = new Date(curr_date.getTime() + getLockTimeSum());
      $("#lock-timer-date").html(new_date.toLocaleString());
   }
);

async function saveLockConfig() {
   await requesting_config;
   if (lock_configuration.enabled) return;

   lock_configuration.password_enabled = $("#lock_password_check").attr("check")
      ? true
      : false;

   lock_configuration.password = $("#lock_password").val();
   lock_configuration.password_confirmation = $("#lock_confirm_password").val();

   lock_configuration.timer_enabled = $("#lock_timer_check").attr("check")
      ? true
      : false;

   lock_configuration.timer_mode = parseInt(
      $("input:radio[name='lock-timer-format']:checked").val()
   );

   let duration = getLockTimeSum();
   if (Number.isInteger(duration) && duration != null && duration > 0) {
      lock_configuration.initial_duration = lock_configuration.duration =
         duration;
   } else {
      lock_configuration.initial_duration = lock_configuration.duration = null;
   }

   lock_configuration.timer_plus = $("#lock_timer_plus").attr("check")
      ? true
      : false;

   $(".timer-plus-label").each(function () {
      let key = $(this).attr("label");
      let klass = Object.values(klasses).find((e) => e.key == key);
      let label = Object.keys(klasses).find((k) => klasses[k].key === key);
      if (klass) {
         let val = parseInt($(this).val());
         lock_configuration.timer_plus_data[label] = val;
      }
   });

   lock_configuration.timer_plus_weight_box = $(
      "#lock-timer-plus-box-size-show"
   ).is(":checked");

   lock_configuration.timer_plus_weight_box_size = parseInt(
      $("#lock-timer-plus-box-size").val()
   );

   lock_configuration.locked_options = [];
   if ($("#lock-option-censor-type").is(":checked")) {
      lock_configuration.locked_options.push("censor_type");
   }
   if ($("#lock-option-settings").is(":checked")) {
      lock_configuration.locked_options.push("settings");
   }
   if ($("#lock-option-video").is(":checked")) {
      lock_configuration.locked_options.push("video");
   }
   if ($("#lock-option-editor").is(":checked")) {
      lock_configuration.locked_options.push("editor");
   }

   let reason = isLockConfigNotValid(lock_configuration);
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

$("#lock-button").click(async function () {
   await saveLockConfig();

   if (isLockConfigNotValid(lock_configuration)) return;
   prepareLockConfigForLocking(lock_configuration);
   security_token = lock_configuration.token;

   browser.storage.sync
      .set({
         lock_configuration: lock_configuration,
      })
      .then(function () {
         window.location.reload();
      });
});

$("#lock-timer-plus-increase").click(function (e) {
   let ms = Math.max(0, $("#lock-timer-plus-increase-input").val());
   let format = $("#lock-timer-plus-increase-format").val();
   if (ms == 0) {
      return;
   }
   let c = browser.storage.sync.get(["lock_configuration"]);
   c.then((res) => {
      switch (format) {
         case "s":
            ms = ms * 1000;
            break;
         case "m":
            ms = ms * 1000 * 60;
            break;
         case "h":
            ms = ms * 1000 * 60 * 60;
            break;
         case "d":
            ms = ms * 1000 * 60 * 60 * 24;
            break;
      }
      $("#lock-timer-plus-increase-input").val(0);
      res.lock_configuration.duration += ms;
      browser.storage.sync
         .set({
            lock_configuration: res.lock_configuration,
         })
         .then(function () {
            window.location.reload();
         });
   });
});

$("#lock-timer-plus-increase-format").change(function (e) {
   let format = $("#lock-timer-plus-increase-format").val();
   switch (format) {
      case "s":
         $("#lock-timer-plus-increase-input").attr({
            max: 100000,
         });
         break;
      case "m":
         $("#lock-timer-plus-increase-input").attr({
            max: 10000,
         });
         break;
      case "h":
         $("#lock-timer-plus-increase-input").attr({
            max: 1000,
         });
         break;
      case "d":
         $("#lock-timer-plus-increase-input").attr({
            max: 100,
         });
         break;
   }
});

function updateTimerLogsPopup() {
   let mode = parseInt(
      $("[name='lock-timer-plus-times']:checked").attr("value")
   );

   if (mode === 0) {
      $(".lock-timer-plus-bodypart").each(function () {
         let val_el = $(this).find(".timer-plus-bodypart-value");
         let unit_el = $(this).find(".timer-plus-bodypart-unit");
         let label = val_el.attr("label");
         let val = lock_configuration.timer_plus_data[label];
         if (0 === val) {
            $(this).removeClass("red-plus");
            $(this).removeClass("green-minus");
         } else if (0 < val) {
            $(this).addClass("red-plus");
            $(this).removeClass("green-minus");
         } else {
            $(this).removeClass("red-plus");
            $(this).addClass("green-minus");
         }
         val = clamp(val, -9999, 9999);
         if (3600 <= Math.abs(val)) {
            val /= 3600;
            val_el.text(val.toFixed(val < 100 ? 1 : 0));
            unit_el.text("h");
         } else if (60 <= Math.abs(val)) {
            val /= 60;
            val_el.text(val.toFixed(val < 100 ? 1 : 0));
            unit_el.text("m");
         } else {
            val_el.text(val.toFixed(val < 100 ? 1 : 0));
            unit_el.text("s");
         }
      });
   } else {
      let max_age;
      switch (mode) {
         case 1:
            max_age = 24 * 60 * 60 * 1000;
            break;
         case 2:
            max_age = 7 * 24 * 60 * 60 * 1000;
            break;
         case 3:
            max_age = 30 * 24 * 60 * 60 * 1000;
      }

      let min_timestamp = Date.now() - max_age;
      let times_per_class = populatePerKlassIndex(() => 0);
      for (let i = lock_timer_logs.length - 1; i >= 0; i--) {
         let entry = lock_timer_logs[i];
         if (entry.timestamp > min_timestamp) {
            for (let type of Object.keys(entry.times)) {
               times_per_class[type] += entry.times[type];
            }
         } else {
            break;
         }
      }

      $(".lock-timer-plus-bodypart").each(function () {
         let val_el = $(this).find(".timer-plus-bodypart-value");
         let unit_el = $(this).find(".timer-plus-bodypart-unit");
         let label = val_el.attr("label");
         let val = times_per_class[klasses[label].index];
         if (0 === val) {
            $(this).removeClass("red-plus");
            $(this).removeClass("green-minus");
         } else if (0 < val) {
            $(this).addClass("red-plus");
            $(this).removeClass("green-minus");
         } else {
            $(this).removeClass("red-plus");
            $(this).addClass("green-minus");
         }
         val = clamp(val, -9999, 9999);
         if (3600 <= Math.abs(val)) {
            val /= 3600;
            val_el.text(val.toFixed(val < 100 ? 1 : 0));
            unit_el.text("h");
         } else if (60 <= Math.abs(val)) {
            val /= 60;
            val_el.text(val.toFixed(val < 100 ? 1 : 0));
            unit_el.text("m");
         } else {
            val_el.text(val.toFixed(val < 100 ? 1 : 0));
            unit_el.text("s");
         }
      });
   }
}

$("[name='lock-timer-plus-times']").on("change", async function () {
   await requesting_config;
   updateTimerLogsPopup();
});

$(".lock-timer-plus-refresh-icon").on("click", async function () {
   await requesting_config;
   ({ lock_timer_logs } = await browser.storage.local.get(["lock_timer_logs"]));
   updateTimerLogsPopup();
});
