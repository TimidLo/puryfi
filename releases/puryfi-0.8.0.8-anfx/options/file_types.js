let recommendedVideoProcessorAppVersion = null;

async function restoreFiletypes() {
   $("#concurrent-processes").val(concurrent_processes);

   $(".filetypeToggle").each(function (i, obj) {
      if (file_types.includes($(this).attr("label"))) {
         $(this).attr("check", true);
      } else {
         $(this).removeAttr("check");
      }
   });

   if (file_types.includes("gif")) {
      if (gif_configuration._thumbnails) {
         $(".gif-thumb").attr("check", true);
         $(".gif-frames").removeAttr("check");
      } else {
         $(".gif-thumb").removeAttr("check");
         $(".gif-frames").attr("check", true);
      }
   } else {
      $(".gif-thumb").removeAttr("check");
      $(".gif-frames").removeAttr("check");
   }

   $(".video-mode").removeAttr("check");
   toggleIoToggle(
      $(`.video-mode[data-video-mode='${video_configuration.mode}']`),
      true
   );
   $("#video-file-processor__max-fps").val(
      video_configuration.file_processor_max_fps
   );
   $("#video-file-processor__max-resolution").val(
      video_configuration.file_processor_max_resolution
   );
   $("#video-file-processor__quality").val(
      video_configuration.file_processor_quality
   );
   $("#video-file-processor__threads").val(
      video_configuration.file_processor_threads
   );
   $("#video-file-processor__inactivity-timeout").val(
      video_configuration.file_processor_inactivity_timeout
   );
   $("#video-overlay__processing-mode").val(
      video_configuration.overlay_processing_mode
   );
   $("#video-overlay__fps-limit").val(
      Math.floor(1000 / video_configuration.overlay_fps_ms_limit)
   );
   $("#video-overlay__cache-size").val(
      video_configuration.overlay_gif_exporting_cache_size / 1048576
   );
   $("#video-overlay__max-resolution").val(
      video_configuration.overlay_gif_exporting_max_resolution
   );

   let platformInfo = await browser.runtime.getPlatformInfo();
   let isWinOrLinux = ["win", "linux"].includes(platformInfo.os);
   let is64Bit = platformInfo.arch === "x86-64";
   if (!isWinOrLinux || !is64Bit) {
      $("#video-file-processor__not-supported-device-message").show();
   } else {
      $("#video-file-processor__not-supported-device-message").hide();

      let res = await browser.runtime.sendMessage({
         type: "CHECK_VIDEO_PROCCESSOR_APP",
         version: 2,
      });
      let missingMessageEl = $(
         "#video-file-processor__missing-video-processor-app-message"
      );
      let upgradeRequiredMessageEl = $(
         "#video-file-processor__upgrade-required-video-processor-app-message"
      );
      let downgradeRequiredMessageEl = $(
         "#video-file-processor__downgrade-required-video-processor-app-message"
      );
      let upgradeRecommendedMessageEl = $(
         "#video-file-processor__upgrade-recommended-video-processor-app-message"
      );
      missingMessageEl.hide();
      upgradeRequiredMessageEl.hide();
      downgradeRequiredMessageEl.hide();
      upgradeRecommendedMessageEl.hide();
      if (res.result === "missing") {
         let textEl = missingMessageEl.find(
            ".content-described-field-message__text"
         );
         textEl.text(getI18nStr("popup__missing-video-processor-app"));
         missingMessageEl.show();
      } else if (res.result === "upgrade_required") {
         let textEl = upgradeRequiredMessageEl.find(
            ".content-described-field-message__text"
         );
         textEl.text(
            getI18nStr(
               "popup__upgrade-required-video-processor-app",
               res.recommended
            )
         );
         upgradeRequiredMessageEl.show();
      } else if (res.result === "downgrade_required") {
         let textEl = downgradeRequiredMessageEl.find(
            ".content-described-field-message__text"
         );
         textEl.text(
            getI18nStr(
               "popup__downgrade-required-video-processor-app",
               res.recommended
            )
         );
         downgradeRequiredMessageEl.show();
      } else if (res.result === "upgrade_recommended") {
         let textEl = upgradeRecommendedMessageEl.find(
            ".content-described-field-message__text"
         );
         textEl.text(
            getI18nStr(
               "popup__upgrade-recommended-video-processor-app",
               res.recommended
            )
         );
         upgradeRecommendedMessageEl.show();
      }

      if (res.recommended != null) {
         recommendedVideoProcessorAppVersion = res.recommended;
      }

      // TODO: "unknown"
   }

   if (!isWinOrLinux) {
      $("#video-overlay__not-supported-device-message").show();
   } else {
      $("#video-overlay__not-supported-device-message").hide();
   }

   updateVideoWarningMessages();
}

function updateVideoWarningMessages() {
   if (
      pixel_configuration.presets.some(
         (preset) => preset != null && preset.config.ty === PixelType.GLITCH
      )
   ) {
      $("#video-file-processor__glitch-type-for-pixel-not-supported").show();
   } else {
      $("#video-file-processor__glitch-type-for-pixel-not-supported").hide();
   }

   if (
      pixel_configuration.presets.some(
         (preset) => preset != null && preset.config.ty === PixelType.HALFTONE
      )
   ) {
      $("#video-file-processor__halftone-type-for-pixel-not-supported").show();
   } else {
      $("#video-file-processor__halftone-type-for-pixel-not-supported").hide();
   }

   if (
      random_configuration.presets.some(
         (preset) =>
            preset != null && preset.config.mode === RandomMode.SuperRandom
      )
   ) {
      $(
         "#video-file-processor__super-random-mode-for-random-not-supported"
      ).show();
   } else {
      $(
         "#video-file-processor__super-random-mode-for-random-not-supported"
      ).hide();
   }

   if (
      mixed_configuration.presets.some(
         (preset) =>
            preset != null &&
            doesMixedPresetConfigContainType(preset.config, EffectIndex.RANDOM)
      )
   ) {
      $("#video-file-processor__random-entries-in-mixed-not-supported").show();
   } else {
      $("#video-file-processor__random-entries-in-mixed-not-supported").hide();
   }
}

function restoreFileOptions() {
   $("#file-types-selector-png").click();
}

$("io-toggle.filetypeToggle").on("click", async function (e) {
   await requesting_config;
   if (lock_configuration.enabled) {
      if (
         !lock_configuration.locked_options.includes("video") &&
         $(this).attr("label") === "video"
      ) {
         if ($(this).attr("check")) {
            if (file_types.indexOf("video") === -1) {
               file_types.push("video");
            }
         } else {
            file_types = removeItemAll(file_types, "video");
         }

         browser.storage.sync.set({
            file_types: file_types,
         });
         return;
      }

      $(this)
         .add($(this).find("button"))
         .toggleAttr("check", !!$(this).attr("check"));
      return;
   }
   if ($(this).attr("check")) {
      if (file_types.indexOf($(this).attr("label")) === -1) {
         file_types.push($(this).attr("label"));
      }
   } else {
      file_types = removeItemAll(file_types, $(this).attr("label"));
   }

   if ($(this).hasClass("gif-thumb") && $(this).attr("check")) {
      $(".gif-frames").removeAttr("check");
      gif_configuration._thumbnails = true;
   } else if ($(this).hasClass("gif-frames") && $(this).attr("check")) {
      $(".gif-thumb").removeAttr("check");
      gif_configuration._thumbnails = false;
   }

   if (!$(".gif-thumb").attr("check") && !$(".gif-frames").attr("check")) {
      file_types = removeItemAll(file_types, "gif");
   } else {
      if (file_types.includes("gif")) {
         file_types.push("gif");
      }
   }

   browser.storage.sync.set({
      file_types: file_types,
      gif_configuration: gif_configuration,
   });
});

$(".filetype-item-flex *").on("click", async function (e) {
   if (e.target.closest(".filetype-toggle-flex *")) return;

   await requesting_config;
   let config = getFileTypesConfig();

   if (lock_configuration.enabled) {
      let $item_flex = $(".file-types-selector[file_type='video']").closest(
         ".filetype-item-flex"
      );
      $(".file-types-selector").removeClass("selected");
      $(".filetype-toggle-flex").removeClass("selected");
      $(".filetype-toggle-label-flex").removeClass("selected");
      $item_flex.find(".file-types-selector").addClass("selected");
      $item_flex.find(".filetype-toggle-flex").addClass("selected");
      $item_flex.find(".filetype-toggle-label-flex").addClass("selected");
      $("#content-video-container").show();
      $("#content_filetypes_gif").hide();
      $("#content_filetypes_images").hide();
      return;
   }

   let $item_flex = $(this).closest(".filetype-item-flex");
   let ft = $item_flex.attr("label");

   if (ft) {
      $(".file-types-selector").removeClass("selected");
      $(".filetype-toggle-flex").removeClass("selected");
      $(".filetype-toggle-label-flex").removeClass("selected");
      $item_flex.find(".file-types-selector").addClass("selected");
      $item_flex.find(".filetype-toggle-flex").addClass("selected");
      $item_flex.find(".filetype-toggle-label-flex").addClass("selected");
      if (ft === "video") {
         $("#content-video-container").show();
         $("#content_filetypes_gif").hide();
         $("#content_filetypes_images").hide();
         return;
      }
      $("#content-video-container").hide();
      $("#content_filetypes_images").show();
      $("#file-min-width").val(config[ft + "_configuration"]._width_min);
      $("#file-min-height").val(config[ft + "_configuration"]._height_min);
      $("#file-max-height").val(config[ft + "_configuration"]._height_max);
      $("#file-max-width").val(config[ft + "_configuration"]._width_max);

      if (ft === "gif") {
         $("#content_filetypes_gif").show();
         $("#content_filetypes_images").hide();
         $("#gif-max-frames").val(gif_configuration._frame_count_max);
         $("#gif-fallback-to-thumbnail").prop(
            "checked",
            gif_configuration._thumbnail_fallback
         );

         $("#file-gif-min-size").val(
            config[ft + "_configuration"]._filesize_min / 1000
         );
         $("#file-gif-max-size").val(
            config[ft + "_configuration"]._filesize_max / 1000
         );
      } else {
         $("#content_filetypes_gif").hide();
         $("#content_filetypes_images").show();
         $("#file-min-size").val(
            config[ft + "_configuration"]._filesize_min / 1000
         );
         $("#file-max-size").val(
            config[ft + "_configuration"]._filesize_max / 1000
         );
      }
      $(".file-output-type").prop("checked", false);
      switch (config[ft + "_configuration"]._file_output_type) {
         case "image/jpeg":
            $("#file-output-type-jpg").prop("checked", true);
            break;
         case "image/png":
            $("#file-output-type-png").prop("checked", true);
            break;
         case "image/bmp":
            $("#file-output-type-bmp").prop("checked", true);
            break;
         case "image/webp":
            $("#file-output-type-webp").prop("checked", true);
            break;
         case "image/avif":
            $("#file-output-type-avif").prop("checked", true);
            break;
         default:
            if ($("#file-output-type-" + ft).length) {
               $("#file-output-type-" + ft).prop("checked", true);
            } else {
               $("#file-output-type-png").prop("checked", true);
            }
      }
   }
});

async function saveFileConfig() {
   await requesting_config;

   concurrent_processes = parseInt($("#concurrent-processes").val());

   let ft = $(".file-types-selector.selected").attr("file_type");
   let config = getFileTypesConfig();
   if (!lock_configuration.enabled) {
      if (ft === "gif") {
         config[ft + "_configuration"]._frame_count_max = parseInt(
            $("#gif-max-frames").val()
         );
         config[ft + "_configuration"]._thumbnail_fallback = $(
            "#gif-fallback-to-thumbnail"
         ).is(":checked");
         config[ft + "_configuration"]._filesize_min =
            parseInt($("#file-gif-min-size").val()) * 1000;
         config[ft + "_configuration"]._filesize_max =
            parseInt($("#file-gif-max-size").val()) * 1000;
         browser.storage.sync.set({
            gif_configuration: gif_configuration,
         });
      } else if (config[ft + "_configuration"] && ft !== "video") {
         config[ft + "_configuration"]._filesize_min =
            parseInt($("#file-min-size").val()) * 1000;
         config[ft + "_configuration"]._filesize_max =
            parseInt($("#file-max-size").val()) * 1000;
         config[ft + "_configuration"]._width_min = parseInt(
            $("#file-min-width").val()
         );
         config[ft + "_configuration"]._height_min = parseInt(
            $("#file-min-height").val()
         );
         config[ft + "_configuration"]._height_max = parseInt(
            $("#file-max-height").val()
         );
         config[ft + "_configuration"]._width_max = parseInt(
            $("#file-max-width").val()
         );
         config[ft + "_configuration"]._file_output_type =
            "image/" +
            $('input[name="file-output-type"]:checked')
               .attr("file_type")
               .replace("jpg", "jpeg");
      }
   }

   if (
      ft === "video" &&
      (!lock_configuration.enabled ||
         lock_configuration.locked_options.includes("video"))
   ) {
      video_configuration.file_processor_max_fps = parseInt(
         $("#video-file-processor__max-fps").val()
      );
      video_configuration.file_processor_max_resolution = parseFloat(
         $("#video-file-processor__max-resolution").val()
      );
      video_configuration.file_processor_quality = parseInt(
         $("#video-file-processor__quality").val()
      );
      video_configuration.file_processor_threads = parseInt(
         $("#video-file-processor__threads").val()
      );
      video_configuration.file_processor_inactivity_timeout = parseInt(
         $("#video-file-processor__inactivity-timeout").val()
      );
      video_configuration.overlay_processing_mode = parseInt(
         $("#video-overlay__processing-mode").val()
      );
      video_configuration.overlay_fps_ms_limit = Math.floor(
         1000 / parseFloat($("#video-overlay__fps-limit").val())
      );
      video_configuration.overlay_gif_exporting_cache_size =
         $("#video-overlay__cache-size").val() * 1048576;
      video_configuration.overlay_gif_exporting_max_resolution = Math.min(
         2000,
         Math.max(0, $("#video-overlay__max-resolution").val())
      );
   }

   browser.storage.sync.set({
      concurrent_processes: concurrent_processes,
      png_configuration: png_configuration,
      jpg_configuration: jpg_configuration,
      bmp_configuration: bmp_configuration,
      webp_configuration: webp_configuration,
      avif_configuration: avif_configuration,
      video_configuration: video_configuration,
   });
}

$(".video-mode").on("click", function (e) {
   let res = browser.storage.sync.get([
      "lock_configuration",
      "video_configuration",
   ]);
   res.then((res) => {
      if (
         res.lock_configuration.enabled &&
         res.lock_configuration.locked_options.includes("video")
      )
         return;

      $(".video-mode").removeAttr("check");
      $(this).add($(this).find("button")).attr("check", true);

      video_configuration.mode = parseInt($(this).attr("data-video-mode"));
      browser.storage.sync.set({
         video_configuration,
      });
   });
});

$(".download-video-processor").on("click", async function (e) {
   if (recommendedVideoProcessorAppVersion == null) {
      let res = await browser.runtime.sendMessage({
         type: "GET_VIDEO_PROCESSOR_APP_COMPAT_VERSIONS",
         version: 2,
      });

      if (res.error) {
         console.error(res.error);
         return;
      }

      recommendedVideoProcessorAppVersion = res.maxAppCompatVersion;
   }

   let platformInfo = await browser.runtime.getPlatformInfo();

   let fileName;
   if (platformInfo.os === "linux") {
      fileName = `puryfi-video-processor-linux64.tar.gz`;
   } else if (platformInfo.os === "win") {
      fileName = `puryfi-video-processor-setup-win64.exe`;
   }

   const VIDEO_PROCESSOR_INSTALLER_DOWNLOAD_URL = `https://github.com/pury-fi/PuryFi-Video-Processor-Releases/releases/download/${recommendedVideoProcessorAppVersion}/${fileName}`;
   const VIDEO_PROCESSOR_INSTALLER_DOWNLOAD_MIRROR_URL = `https://pury.fi/puryfirefox/apps/video_processor/${recommendedVideoProcessorAppVersion}/${fileName}`;

   browser.downloads
      .download({
         url: VIDEO_PROCESSOR_INSTALLER_DOWNLOAD_URL,
      })
      .then((item_id) => {
         const listener = (delta) => {
            if (delta.id === item_id && delta.state) {
               if (delta.state.current === "complete") {
                  browser.downloads.onChanged.removeListener(listener);
               } else if (delta.state.current === "interrupted") {
                  browser.downloads.onChanged.removeListener(listener);
                  if (
                     !["USER_CANCELED", "USER_SHUTDOWN"].includes(delta.error)
                  ) {
                     browser.downloads.download({
                        url: VIDEO_PROCESSOR_INSTALLER_DOWNLOAD_MIRROR_URL,
                     });
                  }
               }
            }
         };
         browser.downloads.onChanged.addListener(listener);
      }, console.error);
});
