function restoreScanConfiguration() {
   if (performance_configuration.warmUp) {
      $(".performance__warm-up").attr("check", true);
   } else {
      $(".performance__warm-up").removeAttr("check");
   }

   if (performance_configuration.downscaleInput) {
      $(".performance__downscale-input").attr("check", true);
   } else {
      $(".performance__downscale-input").removeAttr("check");
   }

   if (performance_configuration.preferEditedDetections) {
      $(".performance__prefer-edited-detections").attr("check", true);
   } else {
      $(".performance__prefer-edited-detections").removeAttr("check");
   }

   if (performance_configuration.interpolate) {
      $(".performance__interpolate").attr("check", true);
   } else {
      $(".performance__interpolate").removeAttr("check");
   }

   $("#performance__scan-rate").val(performance_configuration.scanRate);
   $("#performance__confidence").val(
      performance_configuration.confidence * 100
   );
   $("#performance__extra-interpolation").val(
      performance_configuration.extraInterpolation
   );
}

function savePerformancePageConfiguration() {
   performance_configuration.scanRate = parseInt(
      $("#performance__scan-rate").val()
   );
   performance_configuration.confidence = parseFloat(
      $("#performance__confidence").val() / 100 ?? 0
   );
   performance_configuration.extraInterpolation = parseInt(
      $("#performance__extra-interpolation").val()
   );

   browser.storage.sync.set({
      scan_configuration: performance_configuration,
   });
}

$(".performance__warm-up").on("click", async function (e) {
   await requesting_config;

   performance_configuration.warmUp = $(this).attr("check") ? true : false;
   browser.storage.sync.set({
      scan_configuration: performance_configuration,
   });
});

$(".performance__downscale-input").on("click", async function (e) {
   await requesting_config;

   performance_configuration.downscaleInput = $(this).attr("check")
      ? true
      : false;
   browser.storage.sync.set({
      scan_configuration: performance_configuration,
   });
});

$(".performance__prefer-edited-detections").on("click", async function (e) {
   await requesting_config;

   performance_configuration.preferEditedDetections = $(this).attr("check")
      ? true
      : false;

   browser.storage.sync.set({
      scan_configuration: performance_configuration,
   });

   let sending = browser.runtime.sendMessage({
      clearcache: true,
   });
   sending.then(function (message) {
      updateHelp();
   });
});

$(".performance__interpolate").on("click", async function (e) {
   await requesting_config;

   performance_configuration.interpolate = $(this).attr("check") ? true : false;
   browser.storage.sync.set({
      scan_configuration: performance_configuration,
   });
});

$(document).on(
   "change",
   ".save-performance-page-config",
   savePerformancePageConfiguration
);
