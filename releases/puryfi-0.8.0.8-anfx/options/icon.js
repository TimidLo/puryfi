function restoreIcons() {
   let icon_mode = browser.storage.sync.get("icon_configuration");
   icon_mode.then((res) => {
      if (res.icon_configuration != null) {
         $('link[rel="icon"]').attr("href", res.icon_configuration["16"]);

         if (!res.icon_configuration.save_mode) {
            $(".icon-public").addClass("icon-nude").removeClass("icon-public");
            $(".icon-nudityToggle").removeAttr("check");
         } else {
            $(".icon-nudityToggle").attr("check", true);
         }
      }
   });
}

$(".iconButton").click(async function () {
   await requesting_config;
   if (this.value === "classic") {
      icon_configuration = {
         16: "/icons/icon_16.png",
         32: "/icons/icon_32.png",
         64: "/icons/icon_64.png",
         save_mode: icon_configuration.save_mode,
      };
   } else if (this.value === "minimalistic") {
      icon_configuration = {
         16: "/icons/icon_16_minimalistic.png",
         32: "/icons/icon_32_minimalistic.png",
         64: "/icons/icon_64_minimalistic.png",
         save_mode: icon_configuration.save_mode,
      };
   } else if (this.value === "eye") {
      icon_configuration = {
         16: "/icons/icon_16_eye.png",
         32: "/icons/icon_32_eye.png",
         64: "/icons/icon_64_eye.png",
         save_mode: icon_configuration.save_mode,
      };
   }
   $('link[rel="icon"]').attr("href", icon_configuration["16"]);
   browser.storage.sync
      .set({
         icon_configuration: icon_configuration,
      })
});

$("io-toggle.icon-nudityToggle").click(async function (e) {
   icon_configuration.save_mode = $(this).attr("check") ? true : false;
   if (!icon_configuration.save_mode) {
      if (
         await createConfirm(getI18nStr("on-disable-sfw-icons__confirm__1"), {
            accept_text: "Yes",
            cancel_text: "No",
         })
      ) {
         if (
            await createConfirm(
               getI18nStr("on-disable-sfw-icons__confirm__2"),
               {
                  accept_text: "Yes",
                  cancel_text: "No",
               }
            )
         ) {
            await createAlert(getI18nStr("on-disable-sfw-icons__confirm__3"));
            $(".icon-public").addClass("icon-nude").removeClass("icon-public");
         } else {
            $(".icon-nudityToggle").attr("check", true);
            return;
         }
      } else {
         $(".icon-nudityToggle").attr("check", true);
         return;
      }
   } else {
      $(".icon-nude").addClass("icon-public").removeClass("icon-nude");
   }
   browser.storage.sync
      .set({
         icon_configuration: icon_configuration,
      })
});
