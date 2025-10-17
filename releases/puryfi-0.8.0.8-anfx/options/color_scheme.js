$(".color-scheme-picker").on("change", async function () {
   if (!is_theme_restored) return;
   saveTheme();
});

async function restoreTheme() {
   let{ look_and_feel_configuration} = await browser.storage.sync.get(
      "look_and_feel_configuration"
   );
   applyTheme(look_and_feel_configuration);

   $("#main_background_color_picker").val(
      look_and_feel_configuration.main_bg_color
   );
   $("#main_background_color_picker").css(
      "background-color",
      look_and_feel_configuration.main_bg_color
   );

   $("#secondary_background_color_picker").val(
      look_and_feel_configuration.secondary_bg_color
   );
   $("#secondary_background_color_picker").css(
      "background-color",
      look_and_feel_configuration.secondary_bg_color
   );

   $("#secondary_background_variant_color_picker").val(
      look_and_feel_configuration.secondary_bg_color_variant_1
   );
   $("#secondary_background_variant_color_picker").css(
      "background-color",
      look_and_feel_configuration.secondary_bg_color_variant_1
   );

   $("#main_accent_color_picker").val(
      look_and_feel_configuration.main_accent_color
   );
   $("#main_accent_color_picker").css(
      "background-color",
      look_and_feel_configuration.main_accent_color
   );

   $("#font_color_picker").val(look_and_feel_configuration.main_text_color);
   $("#font_color_picker").css(
      "background-color",
      look_and_feel_configuration.main_text_color
   );
}

function applyTheme(look_and_feel_configuration) {
   let r = document.querySelector(":root");
   r.style.setProperty(
      "--main-background-color",
      look_and_feel_configuration.main_bg_color
   );
   $("#main_background_color_picker").val(
      look_and_feel_configuration.main_bg_color
   );
   $("#main_background_color_picker").css(
      "background-color",
      look_and_feel_configuration.main_bg_color
   );

   r.style.setProperty(
      "--secondary-background-color",
      look_and_feel_configuration.secondary_bg_color
   );
   $("#secondary_background_color_picker").val(
      look_and_feel_configuration.secondary_bg_color
   );
   $("#secondary_background_color_picker").css(
      "background-color",
      look_and_feel_configuration.secondary_bg_color
   );

   r.style.setProperty(
      "--secondary-background-color-variant-1",
      look_and_feel_configuration.secondary_bg_color_variant_1
   );
   $("#secondary_background_variant_color_picker").val(
      look_and_feel_configuration.secondary_bg_color_variant_1
   );
   $("#secondary_background_variant_color_picker").css(
      "background-color",
      look_and_feel_configuration.secondary_bg_color_variant_1
   );

   r.style.setProperty(
      "--secondary-background-color-variant-2",
      look_and_feel_configuration.secondary_bg_color_variant_2
   );
   r.style.setProperty(
      "--secondary-background-color-variant-3",
      look_and_feel_configuration.secondary_bg_color_variant_3
   );
   r.style.setProperty(
      "--secondary-background-color-variant-4",
      look_and_feel_configuration.secondary_bg_color_variant_4
   );

   r.style.setProperty(
      "--main-accent-color",
      look_and_feel_configuration.main_accent_color
   );
   $("#main_accent_color_picker").val(
      look_and_feel_configuration.main_accent_color
   );
   $("#main_accent_color_picker").css(
      "background-color",
      look_and_feel_configuration.main_accent_color
   );

   r.style.setProperty(
      "--main-accent-color-variant-1",
      look_and_feel_configuration.main_accent_color_variant_1
   );
   r.style.setProperty(
      "--main-accent-color-variant-2",
      look_and_feel_configuration.main_accent_color_variant_2
   );
   r.style.setProperty(
      "--main-accent-color-variant-3",
      look_and_feel_configuration.main_accent_color_variant_3
   );
   r.style.setProperty(
      "--main-accent-color-variant-4",
      look_and_feel_configuration.main_accent_color_variant_4
   );

   r.style.setProperty(
      "--main-input-color",
      look_and_feel_configuration.main_input_color
   );
   r.style.setProperty(
      "--main-input-color-variant-1",
      look_and_feel_configuration.main_input_color_variant_1
   );

   r.style.setProperty(
      "--main-border-color",
      look_and_feel_configuration.main_border_color
   );
   r.style.setProperty(
      "--border-color-variant-1",
      look_and_feel_configuration.border_color_variant_1
   );
   r.style.setProperty(
      "--border-color-variant-2",
      look_and_feel_configuration.border_color_variant_2
   );
   r.style.setProperty(
      "--border-color-variant-3",
      look_and_feel_configuration.border_color_variant_3
   );

   r.style.setProperty(
      "--main-text-color",
      look_and_feel_configuration.main_text_color
   );
   r.style.setProperty(
      "--main-text-color-disabled",
      look_and_feel_configuration.main_text_color_disabled
   );
   r.style.setProperty(
      "--main-text-color-variant-1",
      look_and_feel_configuration.main_text_color_variant_1
   );
   r.style.setProperty(
      "--main-text-color-variant-1-disabled",
      look_and_feel_configuration.main_text_color_variant_1_disabled
   );

   r.style.setProperty(
      "--header-text-color",
      look_and_feel_configuration.header_text_color
   );

   r.style.setProperty(
      "--tab-text-color",
      look_and_feel_configuration.tab_text_color
   );
}

async function saveTheme() {
   await requesting_config;
   look_and_feel_configuration.main_bg_color = $(
      "#main_background_color_picker"
   ).val();

   look_and_feel_configuration.secondary_bg_color = $(
      "#secondary_background_color_picker"
   ).val();

   look_and_feel_configuration.main_accent_color = $(
      "#main_accent_color_picker"
   ).val();

   look_and_feel_configuration.main_text_color = $("#font_color_picker").val();

   look_and_feel_configuration.secondary_bg_color_variant_1 =
      addHslColorDifference(
         look_and_feel_configuration.secondary_bg_color,
         calcHslColorDifference("#151719", "#2c3135")
      );

   look_and_feel_configuration.secondary_bg_color_variant_2 =
      addHslColorDifference(
         look_and_feel_configuration.secondary_bg_color,
         calcHslColorDifference("#151719", "#212428")
      );

   look_and_feel_configuration.secondary_bg_color_variant_3 =
      addHslColorDifference(
         look_and_feel_configuration.secondary_bg_color,
         calcHslColorDifference("#151719", "#14171a")
      );

   look_and_feel_configuration.secondary_bg_color_variant_4 =
      addHslColorDifference(
         look_and_feel_configuration.secondary_bg_color,
         calcHslColorDifference("#151719", "#15181b")
      );

   look_and_feel_configuration.main_accent_color_variant_1 =
      addHslColorDifference(
         look_and_feel_configuration.main_accent_color,
         calcHslColorDifference("#009879", "#017a62")
      );

   look_and_feel_configuration.main_accent_color_variant_2 =
      addHslColorDifference(
         look_and_feel_configuration.main_accent_color,
         calcHslColorDifference("#009879", "#0b5e50")
      );

   look_and_feel_configuration.main_accent_color_variant_3 =
      addHslColorDifference(
         look_and_feel_configuration.main_accent_color,
         calcHslColorDifference("#009879", "#213e3a")
      );

   look_and_feel_configuration.main_accent_color_variant_4 =
      addHslColorDifference(
         look_and_feel_configuration.main_accent_color,
         calcHslColorDifference("#009879", "#4ac193")
      );

   look_and_feel_configuration.main_input_color =
      look_and_feel_configuration.secondary_bg_color_variant_1;

   look_and_feel_configuration.main_input_color_variant_1 =
      addHslColorDifference(
         look_and_feel_configuration.secondary_bg_color,
         calcHslColorDifference("#151719", "#1f2a2d")
      );

   look_and_feel_configuration.main_border_color = addHslColorDifference(
      look_and_feel_configuration.main_text_color,
      calcHslColorDifference("#bbc9df", "#bbc9df")
   );

   look_and_feel_configuration.border_color_variant_1 = addHslColorDifference(
      look_and_feel_configuration.secondary_bg_color,
      calcHslColorDifference("#151719", "#646d78")
   );

   look_and_feel_configuration.border_color_variant_2 = addHslColorDifference(
      look_and_feel_configuration.secondary_bg_color,
      calcHslColorDifference("#151719", "#3a3f45")
   );

   look_and_feel_configuration.border_color_variant_3 = addHslColorDifference(
      look_and_feel_configuration.secondary_bg_color,
      calcHslColorDifference("#151719", "#111111")
   );

   let main_text_color_hsl = hexToHsl(
      look_and_feel_configuration.main_text_color
   );
   look_and_feel_configuration.main_text_color_disabled = `hsla(${main_text_color_hsl.h}, ${main_text_color_hsl.s}%, ${main_text_color_hsl.l}%, 0.6)`;

   let main_accent_color_variant_1_hsl = addHslColorDifferenceToObject(
      look_and_feel_configuration.main_text_color,
      {
         h: 0,
         s: 0,
         l: 30,
      }
   );
   look_and_feel_configuration.main_text_color_variant_1 = hslObjectToHslString(
      main_accent_color_variant_1_hsl
   );
   look_and_feel_configuration.main_text_color_variant_1_disabled = `hsla(${main_accent_color_variant_1_hsl.h}, ${main_accent_color_variant_1_hsl.s}%, ${main_accent_color_variant_1_hsl.l}%, 0.6)`;

   look_and_feel_configuration.header_text_color =
      look_and_feel_configuration.main_accent_color;

   look_and_feel_configuration.tab_text_color =
      look_and_feel_configuration.main_text_color;

   applyTheme(look_and_feel_configuration);

   browser.storage.sync.set({
      look_and_feel_configuration: look_and_feel_configuration,
   });
}

$("#tealThemeButton").on("click", async function () {
   $("#main_background_color_picker").val("#0B0E11");
   $("#main_background_color_picker").css("background-color", "#0B0E11");
   $("#secondary_background_color_picker").val("#151719");
   $("#secondary_background_color_picker").css("background-color", "#151719");
   $("#main_accent_color_picker").val("#009879");
   $("#main_accent_color_picker").css("background-color", "#009879");
   $("#font_color_picker").val("#BBC9DF");
   $("#font_color_picker").css("background-color", "#BBC9DF");
   saveTheme();
});

$("#blueThemeButton").on("click", async function () {
   await requesting_config;
   look_and_feel_configuration.main_bg_color = "#1A1127";
   $("#main_background_color_picker").val("#1A1127");
   $("#main_background_color_picker").css("background-color", "#1A1127");

   look_and_feel_configuration.secondary_bg_color = "#0E2337";
   $("#secondary_background_color_picker").val("#0E2337");
   $("#secondary_background_color_picker").css("background-color", "#0E2337");

   look_and_feel_configuration.main_accent_color = "#166082";
   $("#main_accent_color_picker").val("#166082");
   $("#main_accent_color_picker").css("background-color", "#166082");

   look_and_feel_configuration.main_text_color = "#BBC9DF";
   $("#font_color_picker").val("#BBC9DF");
   $("#font_color_picker").css("background-color", "#BBC9DF");

   look_and_feel_configuration.main_text_color_disabled = "#6E8093";

   look_and_feel_configuration.main_text_color_variant_1 = "#EEE";

   look_and_feel_configuration.main_text_color_variant_1_disabled = "#356C84";

   look_and_feel_configuration.header_text_color = "#166082";

   look_and_feel_configuration.tab_text_color = "#BBC9DF";

   look_and_feel_configuration.secondary_bg_color_variant_1 = "#284259";
   look_and_feel_configuration.secondary_bg_color_variant_2 = "#193046";
   look_and_feel_configuration.secondary_bg_color_variant_3 = "#0D2238";
   look_and_feel_configuration.secondary_bg_color_variant_4 = "#0E2439";

   look_and_feel_configuration.main_accent_color_variant_1 = "#134C66";
   look_and_feel_configuration.main_accent_color_variant_2 = "#153B51";
   look_and_feel_configuration.main_accent_color_variant_3 = "#00354C";
   look_and_feel_configuration.main_accent_color_variant_4 = "#728AC4";

   look_and_feel_configuration.main_input_color = "#253D53";
   look_and_feel_configuration.main_input_color_variant_1 = "#082029";

   look_and_feel_configuration.main_border_color = "#ABCDEF";
   look_and_feel_configuration.border_color_variant_1 = "#3680C5";
   look_and_feel_configuration.border_color_variant_2 = "#306297";
   look_and_feel_configuration.border_color_variant_3 = "#0E1D2B";

   applyTheme(look_and_feel_configuration);
   browser.storage.sync.set({
      look_and_feel_configuration: look_and_feel_configuration,
   });
});

$("#purpleThemeButton").on("click", async function () {
   $("#main_background_color_picker").val("#000000");
   $("#main_background_color_picker").css("background-color", "#000000");
   $("#secondary_background_color_picker").val("#120519");
   $("#secondary_background_color_picker").css("background-color", "#120519");
   $("#main_accent_color_picker").val("#530281");
   $("#main_accent_color_picker").css("background-color", "#530281");
   $("#font_color_picker").val("#A03DD9");
   $("#font_color_picker").css("background-color", "#A03DD9");
   saveTheme();
});

$("#amoledThemeButton").on("click", async function () {
   await requesting_config;
   look_and_feel_configuration.main_bg_color = "#000";
   $("#main_background_color_picker").val("#000");
   $("#main_background_color_picker").css("background-color", "#000");

   look_and_feel_configuration.secondary_bg_color = "#040404";
   $("#secondary_background_color_picker").val("#040404");
   $("#secondary_background_color_picker").css("background-color", "#040404");

   look_and_feel_configuration.main_accent_color = "#121213";
   $("#main_accent_color_picker").val("#121213");
   $("#main_accent_color_picker").css("background-color", "#121213");

   look_and_feel_configuration.main_text_color = "#C1C1C1";
   $("#font_color_picker").val("#C1C1C1");
   $("#font_color_picker").css("background-color", "#C1C1C1");

   look_and_feel_configuration.main_text_color_disabled = "#353535";

   look_and_feel_configuration.main_text_color_variant_1 = "#E1E1E1";

   look_and_feel_configuration.main_text_color_variant_1_disabled = "#202020";

   look_and_feel_configuration.header_text_color = "#CCCCCC";

   look_and_feel_configuration.tab_text_color = "#C1C1C1";

   look_and_feel_configuration.secondary_bg_color_variant_1 = "#000000";
   look_and_feel_configuration.secondary_bg_color_variant_2 = "#060606";
   look_and_feel_configuration.secondary_bg_color_variant_3 = "#020202";
   look_and_feel_configuration.secondary_bg_color_variant_4 = "#040404";

   look_and_feel_configuration.main_accent_color_variant_1 = "#0D0D0D";
   look_and_feel_configuration.main_accent_color_variant_2 = "#0B0B0B";
   look_and_feel_configuration.main_accent_color_variant_3 = "#000000";
   look_and_feel_configuration.main_accent_color_variant_4 = "#1A1A1A";

   look_and_feel_configuration.main_input_color = "#000000";
   look_and_feel_configuration.main_input_color_variant_1 = "#535353";

   look_and_feel_configuration.main_border_color = "#424242";
   look_and_feel_configuration.border_color_variant_1 = "#1E1E1E";
   look_and_feel_configuration.border_color_variant_2 = "#1E1E1E";
   look_and_feel_configuration.border_color_variant_3 = "#0B0B0B";

   applyTheme(look_and_feel_configuration);
   browser.storage.sync.set({
      look_and_feel_configuration: look_and_feel_configuration,
   });
});

$("#cyberpunkThemeButton").on("click", async function () {
   await requesting_config;
   look_and_feel_configuration.main_bg_color = "#F3E600";
   $("#main_background_color_picker").val("#F3E600");
   $("#main_background_color_picker").css("background-color", "#F3E600");

   look_and_feel_configuration.secondary_bg_color = "#0A262D";
   $("#secondary_background_color_picker").val("#0A262D");
   $("#secondary_background_color_picker").css("background-color", "#0A262D");

   look_and_feel_configuration.main_accent_color = "#0070FF";
   $("#main_accent_color_picker").val("#0070FF");
   $("#main_accent_color_picker").css("background-color", "#0070FF");

   look_and_feel_configuration.main_text_color = "#F5FF00";
   $("#font_color_picker").val("#F5FF00");
   $("#font_color_picker").css("background-color", "#F5FF00");

   look_and_feel_configuration.main_text_color_disabled = "#646801";

   look_and_feel_configuration.main_text_color_variant_1 = "#F5FF00";

   look_and_feel_configuration.main_text_color_variant_1_disabled = "#77933C";

   look_and_feel_configuration.header_text_color = "#0070FF";

   look_and_feel_configuration.tab_text_color = "#0071C5";

   look_and_feel_configuration.secondary_bg_color_variant_1 = "#030303";
   look_and_feel_configuration.secondary_bg_color_variant_2 = "#06060C";
   look_and_feel_configuration.secondary_bg_color_variant_3 = "#060D24";
   look_and_feel_configuration.secondary_bg_color_variant_4 = "#001126";

   look_and_feel_configuration.main_accent_color_variant_1 = "#0260C8";
   look_and_feel_configuration.main_accent_color_variant_2 = "#104999";
   look_and_feel_configuration.main_accent_color_variant_3 = "#003075";
   look_and_feel_configuration.main_accent_color_variant_4 = "#00C3FF";

   look_and_feel_configuration.main_input_color = "#260004";
   look_and_feel_configuration.main_input_color_variant_1 = "#00161C";

   look_and_feel_configuration.main_border_color = "#54D7FF";
   look_and_feel_configuration.border_color_variant_1 = "#0086C8";
   look_and_feel_configuration.border_color_variant_2 = "#0070E6";
   look_and_feel_configuration.border_color_variant_3 = "#003395";

   applyTheme(look_and_feel_configuration);
   browser.storage.sync.set({
      look_and_feel_configuration: look_and_feel_configuration,
   });
});

$("#retroWaveThemeButton").on("click", async function () {
   await requesting_config;
   look_and_feel_configuration.main_bg_color = "#370F59";
   $("#main_background_color_picker").val("#370F59");
   $("#main_background_color_picker").css("background-color", "#370F59");

   look_and_feel_configuration.secondary_bg_color = "#15002F";
   $("#secondary_background_color_picker").val("#15002F");
   $("#secondary_background_color_picker").css("background-color", "#15002F");

   look_and_feel_configuration.main_accent_color = "#026BDE";
   $("#main_accent_color_picker").val("#026BDE");
   $("#main_accent_color_picker").css("background-color", "#026BDE");

   look_and_feel_configuration.main_text_color = "#50FF9C";
   $("#font_color_picker").val("#50FF9C");
   $("#font_color_picker").css("background-color", "#50FF9C");

   look_and_feel_configuration.main_text_color_disabled = "#549983";

   look_and_feel_configuration.main_text_color_variant_1 = "#C7FFF2";

   look_and_feel_configuration.main_text_color_variant_1_disabled = "#2F955B";

   look_and_feel_configuration.header_text_color = "#026BDE";

   look_and_feel_configuration.tab_text_color = "#50FF9C";

   look_and_feel_configuration.secondary_bg_color_variant_1 = "#5B005C";
   look_and_feel_configuration.secondary_bg_color_variant_2 = "#682997";
   look_and_feel_configuration.secondary_bg_color_variant_3 = "#000B22";
   look_and_feel_configuration.secondary_bg_color_variant_4 = "#000E2B";

   look_and_feel_configuration.main_accent_color_variant_1 = "#0150C5";
   look_and_feel_configuration.main_accent_color_variant_2 = "#104099";
   look_and_feel_configuration.main_accent_color_variant_3 = "#003883";
   look_and_feel_configuration.main_accent_color_variant_4 = "#00A8FF";

   look_and_feel_configuration.main_input_color = "#012048";
   look_and_feel_configuration.main_input_color_variant_1 = "#06061C";

   look_and_feel_configuration.main_border_color = "#00FFDB";
   look_and_feel_configuration.border_color_variant_1 = "#009FFF";
   look_and_feel_configuration.border_color_variant_2 = "#DD0091";
   look_and_feel_configuration.border_color_variant_3 = "#114680";

   applyTheme(look_and_feel_configuration);
   browser.storage.sync.set({
      look_and_feel_configuration: look_and_feel_configuration,
   });
});

$("#pinkDollThemeButton").on("click", async function () {
   await requesting_config;
   look_and_feel_configuration.main_bg_color = "#FF3CB0";
   $("#main_background_color_picker").val("#FF3CB0");
   $("#main_background_color_picker").css("background-color", "#FF3CB0");

   look_and_feel_configuration.secondary_bg_color = "#FF64C1";
   $("#secondary_background_color_picker").val("#FF64C1");
   $("#secondary_background_color_picker").css("background-color", "#FF64C1");

   look_and_feel_configuration.main_accent_color = "#FFC4F3";
   $("#main_accent_color_picker").val("#FFC4F3");
   $("#main_accent_color_picker").css("background-color", "#FFC4F3");

   look_and_feel_configuration.main_text_color = "#FFEEF7";
   $("#font_color_picker").val("#FFEEF7");
   $("#font_color_picker").css("background-color", "#FFEEF7");

   look_and_feel_configuration.main_text_color_disabled = "#E47ABC";

   look_and_feel_configuration.main_text_color_variant_1 = "#FFEEF7";

   look_and_feel_configuration.main_text_color_variant_1_disabled = "#FFA0DC";

   look_and_feel_configuration.header_text_color = "#FFC4F3";

   look_and_feel_configuration.tab_text_color = "#FFEEF7";

   look_and_feel_configuration.secondary_bg_color_variant_1 = "#FF9EEB";
   look_and_feel_configuration.secondary_bg_color_variant_2 = "#F449A1";
   look_and_feel_configuration.secondary_bg_color_variant_3 = "#FF77C9";
   look_and_feel_configuration.secondary_bg_color_variant_4 = "#FF7FD8";

   look_and_feel_configuration.main_accent_color_variant_1 = "#F28ADE";
   look_and_feel_configuration.main_accent_color_variant_2 = "#D773BD";
   look_and_feel_configuration.main_accent_color_variant_3 = "#FFDEF2";
   look_and_feel_configuration.main_accent_color_variant_4 = "#FF008380";

   look_and_feel_configuration.main_input_color = "#F449A1";
   look_and_feel_configuration.main_input_color_variant_1 = "#CA5FB9";

   look_and_feel_configuration.main_border_color = "#FEEEF7";
   look_and_feel_configuration.border_color_variant_1 = "#FFCAF5";
   look_and_feel_configuration.border_color_variant_2 = "#FFB3F0";
   look_and_feel_configuration.border_color_variant_3 = "#B74F85";

   applyTheme(look_and_feel_configuration);
   browser.storage.sync.set({
      look_and_feel_configuration: look_and_feel_configuration,
   });
});

$("#pinkThemeButton").on("click", async function () {
   await requesting_config;
   look_and_feel_configuration.main_bg_color = "#5F2744";
   $("#main_background_color_picker").val("#5F2744");
   $("#main_background_color_picker").css("background-color", "#5F2744");

   look_and_feel_configuration.secondary_bg_color = "#421B2F";
   $("#secondary_background_color_picker").val("#421B2F");
   $("#secondary_background_color_picker").css("background-color", "#421B2F");

   look_and_feel_configuration.main_accent_color = "#DF55D0";
   $("#main_accent_color_picker").val("#DF55D0");
   $("#main_accent_color_picker").css("background-color", "#DF55D0");

   look_and_feel_configuration.main_text_color = "#FFD9FF";
   $("#font_color_picker").val("#FFD9FF");
   $("#font_color_picker").css("background-color", "#FFD9FF");

   look_and_feel_configuration.main_text_color_disabled = "#F094C9";

   look_and_feel_configuration.main_text_color_variant_1 = "#EEE";

   look_and_feel_configuration.main_text_color_variant_1_disabled = "#F059F0";

   look_and_feel_configuration.header_text_color = "#DF55D0";

   look_and_feel_configuration.tab_text_color = "#FFD9FF";

   look_and_feel_configuration.secondary_bg_color_variant_1 = "#DE577E";
   look_and_feel_configuration.secondary_bg_color_variant_2 = "#C43690";
   look_and_feel_configuration.secondary_bg_color_variant_3 = "#411A30";
   look_and_feel_configuration.secondary_bg_color_variant_4 = "#421C31";

   look_and_feel_configuration.main_accent_color_variant_1 = "#FB00A2";
   look_and_feel_configuration.main_accent_color_variant_2 = "#C70E80";
   look_and_feel_configuration.main_accent_color_variant_3 = "#862C7C";
   look_and_feel_configuration.main_accent_color_variant_4 = "#842D76";

   look_and_feel_configuration.main_input_color = "#31132D";
   look_and_feel_configuration.main_input_color_variant_1 = "#483043";

   look_and_feel_configuration.main_border_color = "#F97EDD";
   look_and_feel_configuration.border_color_variant_1 = "#FF90FF";
   look_and_feel_configuration.border_color_variant_2 = "#FF6390";
   look_and_feel_configuration.border_color_variant_3 = "#752957";

   applyTheme(look_and_feel_configuration);
   browser.storage.sync.set({
      look_and_feel_configuration: look_and_feel_configuration,
   });
});
