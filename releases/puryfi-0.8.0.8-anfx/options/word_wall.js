$("button.word-wall-button").on("click", async function (e) {
   await requesting_config;

   if (lock_configuration.enabled) return;
   let value = $(this).hasClass("selected");
   if (value) {
      $(".word-wall-toggle").removeAttr("check");
      $(".typeww").removeClass("selected");
   } else {
      $(".word-wall-toggle").attr("check", true);
      $(".typeww").addClass("selected");
   }
   word_wall_configuration.enabled = !value;
   setMixedReverseRowSelected(word_wall_configuration.enabled);
   browser.storage.sync
      .set({
         word_wall_configuration: word_wall_configuration,
      })
});

$("io-toggle.word-wall-toggle").click(async function (e) {
   await requesting_config;

   if (lock_configuration.enabled) return;
   let value = $(this).attr("check") ? true : false;
   if (value) {
      $(".typeww").addClass("selected");
   } else {
      $(".typeww").removeClass("selected");
   }
   word_wall_configuration.enabled = value;
   setMixedReverseRowSelected(word_wall_configuration.enabled);
   browser.storage.sync
      .set({
         word_wall_configuration: word_wall_configuration,
      })
});

$("#word_wall_font, #caption_font").on("focus", function (e) {
   const dataList = $("#fonts-available");
   if (dataList.children().length > 0) return;

   const fontDetector = new FontDetector();
   let available = [];
   dataList.empty();
   for (let i = 0; i < fonts.length; i++) {
      if (fontDetector.detect(fonts[i])) {
         available.push(fonts[i]);
         dataList.append($("<option>", { value: fonts[i] }));
      }
   }
});

$("#word_wall_font, #caption_font").on("change", function () {
   const fontDetector = new FontDetector();
   if (!fontDetector.detect($(this).val())) {
      // TODO: display the font name in the error message
      createAlert(`
         <div class="modal__quote danger">
            -<b> ${getI18nStr("on-font-input-change__not-available-error")}</b>
         </div>
      `);
   }
});

$("#word_wall_font_style, #caption_style").on("change", function (e) {
   let val = $(this).val();

   val = val
      .trim()
      .replace(/\s+/g, " ")
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
   let entries = val.split(" ");

   let has_weight = false;
   let has_style = false;
   for (let entry of entries) {
      if (entry === "Lighter" || entry === "Bolder") {
         if (has_weight) {
            $(this).val($(this).data("fallback-value"));
            return;
         } else {
            has_weight = true;
         }
      } else if (entry === "Italic" || entry === "Oblique") {
         if (has_style) {
            $(this).val($(this).data("fallback-value"));
            return;
         } else {
            has_style = true;
         }
      } else {
         $(this).val($(this).data("fallback-value"));
         return;
      }
   }
   $(this).val(val);
});

const fonts = [
   "Agency FB",
   "Aharoni",
   "Aldhabi",
   "Andalus",
   "Angsana New",
   "AngsanaUPC",
   "Aparajita",
   "Arabic Typesetting",
   "Arial",
   "Bahnschrift",
   "Batang",
   "BatangChe",
   "BIZ UDGothic, BIZ UDPGothic",
   "BIZ UDMincho, BIZ UDPMincho",
   "Book Antiqua",
   "Browallia New",
   "BrowalliaUPC",
   "Calibri",
   "Calisto MT",
   "Cambria",
   "Cambria Math",
   "Candara",
   "Cascadia Code",
   "Century Gothic",
   "Comic Sans MS",
   "Consolas",
   "Constantia",
   "Copperplate Gothic",
   "Corbel",
   "Cordia New",
   "CordiaUPC",
   "Courier New",
   "DaunPenh",
   "David",
   "DengXian",
   "DilleniaUPC",
   "DFKai-SB",
   "DokChampa",
   "Dotum",
   "DotumChe",
   "Ebrima",
   "Estrangelo Edessa",
   "EucrosiaUPC",
   "Euphemia",
   "FangSong",
   "Franklin Gothic",
   "FrankRuehl",
   "FreesiaUPC",
   "Gabriola",
   "Gadugi",
   "Gautami",
   "Georgia",
   "Gill Sans MT",
   "Gisha",
   "Gulim",
   "GulimChe",
   "Gungsuh",
   "GungsuhChe",
   "HoloLens MDL2 Assets",
   "Impact",
   "Ink Free",
   "IrisUPC",
   "Iskoola Pota",
   "JasmineUPC",
   "Javanese Text",
   "KaiTi (SimKai)",
   "Kalinga",
   "Kartika",
   "Khmer UI",
   "KodchiangUPC",
   "Kokila",
   "Lao UI",
   "Latha",
   "Leelawadee",
   "Leelawadee UI",
   "Levenim MT",
   "LilyUPC",
   "Lucida Console",
   "Lucida Handwriting",
   "Lucida Sans Unicode",
   "Malgun Gothic",
   "Mangal",
   "Marlett",
   "Meiryo, Meiryo UI",
   "Microsoft Himalaya",
   "Microsoft JhengHei",
   "Microsoft JhengHei UI",
   "Microsoft New Tai Lue",
   "Microsoft PhagsPa",
   "Microsoft Sans Serif",
   "Microsoft Tai Le",
   "Microsoft Uighur",
   "Microsoft YaHei",
   "Microsoft YaHei UI",
   "Microsoft Yi Baiti",
   "MingLiU, PMingLiU",
   "MingLiU-ExtB, PMingLiU-ExtB",
   "MingLiU_HKSCS",
   "MingLiU_HKSCS-ExtB",
   "Miriam",
   "Miriam Fixed",
   "Mongolian Baiti",
   "MoolBoran",
   "MS Gothic",
   "MS PGothic",
   "MS Mincho",
   "MS PMincho",
   "MS UI Gothic",
   "MV Boli",
   "Myanmar Text",
   "Narkisim",
   "Nirmala UI",
   "NSimSun",
   "Nyala",
   "OCR-A Extended",
   "Palatino Linotype",
   "Plantagenet Cherokee",
   "Raavi",
   "Rod",
   "Sakkal Majalla",
   "Sanskrit Text",
   "Segoe MDL2 Assets",
   "Segoe Print",
   "Segoe Script",
   "Segoe SD",
   "Segoe UI",
   "Segoe UI Emoji",
   "Segoe UI Historic",
   "Segoe UI Symbol",
   "Segoe UI Variable",
   "Segoe Fluent Icons",
   "Shonar Bangla",
   "Shruti",
   "SimHei",
   "Simplified Arabic",
   "SimSun",
   "SimSun-ExtB",
   "Sitka Banner",
   "Sitka Display",
   "Sitka Heading",
   "Sitka Small",
   "Sitka Subheading",
   "Sitka Text",
   "Sylfaen",
   "Symbol",
   "Tahoma",
   "Times New Roman",
   "Traditional Arabic",
   "Trebuchet MS",
   "Tw Cen MT",
   "Tunga",
   "UD Digi Kyokasho N-R",
   "UD Digi Kyokasho N-B",
   "UD Digi Kyokasho NK-R",
   "UD Digi Kyokasho NK-B",
   "UD Digi Kyokasho NP-R",
   "UD Digi Kyokasho NP-B",
   "Urdu Typesetting",
   "Utsaah",
   "Vani",
   "Verdana",
   "Vijaya",
   "Vrinda",
   "Webdings",
   "Wingdings",
   "Yu Gothic",
   "Yu Gothic UI",
   "Yu Mincho",
];
