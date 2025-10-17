$("button.typerm").click(async function (e) {
   if ($(this).hasClass("patreon_locked")) return;

   await requesting_config;
   if (lock_configuration.enabled) return;
   let value = $(this).hasClass("selected");
   if (value) {
      $(".reverseToggle").removeAttr("check");
      $(this).removeClass("selected");
   } else {
      $(".reverseToggle").attr("check", true);
      $(this).addClass("selected");
   }
   reverse_mode_configuration.enabled = !value;
   setMixedReverseRowSelected(reverse_mode_configuration.enabled);
   browser.storage.sync.set({
      reverse_mode_configuration: reverse_mode_configuration,
   });
});

$("io-toggle.reverseToggle").click(async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) return;
   let value = $(this).attr("check") ? true : false;
   if (value) {
      $("button.typerm").addClass("selected");
   } else {
      $("button.typerm").removeClass("selected");
   }
   reverse_mode_configuration.enabled = value;
   setMixedReverseRowSelected(reverse_mode_configuration.enabled);
   browser.storage.sync.set({
      reverse_mode_configuration: reverse_mode_configuration,
   });
});
