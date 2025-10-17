$(document).on(
   "click mousedown mouseup submit keydown keyup keypress",
   "#content-wblist-container.locked button:not(.no-lock)",
   function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
   }
);

$(document).on(
   "keydown keyup keypress input change submit",
   "#content-wblist-container.locked input:not(:radio, .no-lock)",
   function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
   }
);

$(document).on(
   "click mousedown mouseup change keydown keyup keypress",
   "#content-wblist-container.locked input:radio:not(.no-lock)",
   function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
   }
);

$("[data-exact-clicks]").on("click mousedown mouseup", function (e) {
   if (e.target !== this) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
   }
});

function updateInputRadio($inputs, val, do_highlight) {
   let $input_to_enable = $inputs.filter(`[value="${val}"]`);
   if (!$input_to_enable.prop("checked")) {
      if (do_highlight) animateHighlight($inputs);
      $inputs.prop("checked", false);
      $input_to_enable.prop("checked", true);
   }
}

function updateInputCheckbox($input, val, do_highlight) {
   if (do_highlight && $input.is(":checked") !== val) {
      animateHighlight($input);
   }

   $input.prop("checked", val);
}

// Sets the value of an input and validate it, doesn't trigger a change event
function updateInputField(input_el, val, do_highlight) {
   let precision = input_el.attr("data-input-precision");
   if (precision != null) {
      if (
         do_highlight &&
         parseFloat(input_el.val()) !==
            parseFloat(val.toFixed(parseInt(precision)))
      ) {
         if (input_el.is('.general-setting-field input[type="text"]')) {
            animateHighlight(input_el.closest(".general-setting-field"));
         } else {
            animateHighlight(input_el);
         }
      }
   } else {
      if (do_highlight && input_el.val() !== val.toString()) {
         if (input_el.is('.general-setting-field input[type="text"]')) {
            animateHighlight(input_el.closest(".general-setting-field"));
         } else {
            animateHighlight(input_el);
         }
      }
   }

   input_el.val(val);
   input_el.removeAttr("data-fallback-value");
   validateInputValueOnChange.call(input_el);

   if (input_el.attr("data-input-flexgrow") != null) {
      updateInputFlexgrowSize(input_el);
   }
}

// Sets the value of an input and validate it, doesn't trigger a change event
function updateInputSelect(select_el, val, do_highlight) {
   let prev_val = parseInt(select_el.attr("value"));
   let name = select_el.find(`li[value="${val}"] a`).html();

   select_el.attr("value", val);
   if (name == null) {
      select_el
         .children("a")
         .html(`--Preset ${val + 1}--`)
         .addClass("danger");
   } else {
      if (name === "") {
         name = "&nbsp;";
      }
      select_el.children("a").html(name).removeClass("danger");
   }

   if (do_highlight && prev_val !== val) {
      animateHighlight(select_el);
   }
}

function removeMixedCensorType(entry_els, do_highlight) {
   entry_els.each(function () {
      if ($(this).attr("data-censor-type") == null) return;

      let select_el = entry_els.children(".mixed-entry-select");
      if (do_highlight) {
         animateHighlight(select_el.add($(this).find(".mixed-entry-button")));
      }
      $(this).removeAttr("data-censor-type");

      select_el.attr("disabled", true);
      select_el.find("a").html("&nbsp");
      select_el.find("ul").empty();
   });
}

function setMixedCensorType($entry, censor_type, do_highlight) {
   let $button = $entry.find(".mixed-entry-button");
   let $select = $entry.children(".mixed-entry-select");
   if (
      parseInt($entry.attr("data-censor-type")) !== censor_type &&
      do_highlight
   )
      animateHighlight($button.add($select));

   $entry.attr("data-censor-type", censor_type);

   $select.removeAttr("disabled");

   const $select_items_container = $select.children("ul");
   $select_items_container.empty();

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

   if (censor_type !== 0) {
      for (
         let i = 0;
         i < censor_configs_by_type[censor_type].presets.length;
         i++
      ) {
         if (censor_configs_by_type[censor_type].presets[i] == null) continue;

         $select_items_container.append(
            `<li value="${i}"><a>${
               replaceHtmlEntities(
                  censor_configs_by_type[censor_type].presets[i].name
               ) || "&nbsp"
            }</a></li>`
         );
      }
   }
}

function setMixedPreset($select, val, do_highlight) {
   if (parseInt($select.attr("value")) !== val && do_highlight) {
      animateHighlight($select);
   }

   $select.attr("value", val);
   let name = $select.find(`ul li[value="${val}"] a`).html();
   if (name == null && val != null) {
      $select
         .children("a")
         .html(`--Preset ${val + 1}--`)
         .addClass("danger");
   } else {
      $select
         .children("a")
         .html(name || "&nbsp;")
         .removeClass("danger");
   }
}

function doInputStep(targetEl, deltaY, shiftKey, ctrlKey) {
   let val = parseFloat(targetEl.val() ?? 0);

   let step = parseFloat(targetEl.attr("data-input-step"));
   if (step && targetEl.is(":focus")) {
      // TODO: hanndle step being a decimal when input type is integral
      // NOTE: every precision fix is for the sake of avoiding rounding errors
      if (shiftKey) {
         step = parseFloat((step / 10).toFixed(7));
      } else if (ctrlKey) {
         step *= 10;
      }

      const precision = targetEl.attr("data-input-precision");
      if (precision == null) {
         const input_type = targetEl.attr("data-input-type");
         if (input_type === "int" || input_type === "absolute int") {
            step = Math.max(1, step);
         }
      } else {
         step =
            0 <= precision
               ? Math.max(fix(1 / (precision + 1)), step)
               : Math.max(1, step);
      }

      if (0 < deltaY) {
         val = fix((Math.ceil(fix(val / step)) - 1) * step);
      } else {
         val = fix((Math.floor(fix(val / step)) + 1) * step);
      }

      // Set precision of value to precision of step
      targetEl.val(val);
      validateInputValueOnChange.call(targetEl);

      val = targetEl.val();
      let step_decimals = countDecimals(step.toString());
      if (countDecimals(val.toString()) < step_decimals) {
         val = parseFloat(val).toFixed(countDecimals(step.toString()));
      }
      targetEl.val(val);
      targetEl.attr("data-trigger-change-on-blur-once", true);

      return true;
   }
   return false;
}

function approveInputKeypress(code) {
   let val = $(this).val();

   const input_type = $(this).attr("data-input-type");
   if (input_type != null) {
      if (input_type === "int" || input_type === "absolute int") {
         const selectionStart = $(this).prop("selectionStart");
         const selectionEnd = $(this).prop("selectionEnd");
         const notSelectedValue =
            val.substring(0, selectionStart) + val.substring(selectionEnd);

         // If it's numeric
         if (48 <= code && code <= 57) {
            let val_len = notSelectedValue.replace("-", "").length;

            // If there is padding, remove it from the length
            let padding_char = $(this).attr("data-padding-char");
            if (padding_char != null) {
               let padding_position = $(this).attr("data-padding-position");
               if (padding_position === "start") {
                  val_len -=
                     val.match(new RegExp(`^${padding_char}+`))?.[0].length ??
                     0;
               } else {
                  val_len -=
                     val.match(new RegExp(`${padding_char}+$`))?.[0].length ??
                     0;
               }
            }

            // Reject if the max number of integral digits has already been reached
            const max_int_digits = Math.max(
               ...($(this)
                  .attr("data-input-range")
                  ?.split(",")
                  .map((n) => Math.abs(parseInt(n)).toString().length) ?? [])
            );
            if (max_int_digits <= val_len) {
               return false;
            }
         }
         // If it's a minus sign and the type is not absolute
         else if (input_type === "int" && code === 45) {
            // Reject if not typing at the first character or if there is another minus sign already, excluding any in the selected area
            if (notSelectedValue.indexOf("-") !== -1 || selectionStart !== 0) {
               return false;
            }
         }
         // Reject if it's none of the previous
         else {
            return false;
         }
      } else if (input_type === "float" || input_type === "absolute float") {
         const selectionStart = $(this).prop("selectionStart");
         const selectionEnd = $(this).prop("selectionEnd");
         const notSelectedValue =
            val.substring(0, selectionStart) + val.substring(selectionEnd);

         // If it's numeric
         if (48 <= code && code <= 57) {
            const maxIntegralDigits = Math.max(
               ...($(this)
                  .attr("data-input-range")
                  ?.split(",")
                  .map((n) => Math.abs(parseInt(n)).toString().length) ?? [])
            );
            const maxDecimalDigits = parseInt(
               $(this).attr("data-input-precision")
            );

            // Reject if the relevant max number of digits has already been reached
            const indexOfDot = notSelectedValue.indexOf(".");
            if (indexOfDot !== -1) {
               if (selectionStart <= indexOfDot) {
                  if (maxIntegralDigits <= indexOfDot) {
                     return false;
                  }
               } else {
                  if (
                     maxDecimalDigits <=
                     notSelectedValue.length - 1 - indexOfDot
                  ) {
                     return false;
                  }
               }
            } else {
               if (
                  maxIntegralDigits <= notSelectedValue.replace("-", "").length
               ) {
                  return false;
               }
            }
         }
         // If it's a dot
         else if (code === 46) {
            // Reject if there is another dot already, excluding any in the selected area
            if (notSelectedValue.indexOf(".") !== -1) {
               return false;
            }
         }
         // If it's a minus sign and the type is not absolute
         else if (input_type === "float" && code === 45) {
            // Reject if not typing at the first character or if there is another minus sign already, excluding any in the selected area
            if (notSelectedValue.indexOf("-") !== -1 || selectionStart !== 0) {
               return false;
            }
         }
         // Reject if it's none of the previous
         else {
            return false;
         }
      } else if (input_type === "color") {
         const selectionStart = $(this).prop("selectionStart");
         const selectionEnd = $(this).prop("selectionEnd");
         const notSelectedValue =
            val.substring(0, selectionStart) + val.substring(selectionEnd);
         // If it's a hashtag
         if (code === 35) {
            // Reject if not typing at the first character or if there is another hashtag already, excluding any in the selected area
            if (notSelectedValue.indexOf("#") !== -1 || selectionStart !== 0) {
               return false;
            }
         } // Reject if it's also not numeric, A-F or a-f
         else if (
            (48 <= code && code <= 57) ||
            (65 <= code && code <= 70) ||
            (97 <= code && code <= 102)
         ) {
            // Reject if the max number of chars has already been reached
            if (8 <= notSelectedValue.replace("#", "").length) {
               return false;
            }
         } else {
            return false;
         }
      }
   }

   return true;
}

function validateInputValueOnInput() {
   let val = $(this).val();

   const max_int_digits = Math.max(
      ...($(this)
         .attr("data-input-range")
         ?.split(",")
         .map((n) => Math.abs(parseInt(n)).toString().length) ?? [])
   );

   let padding_char = $(this).attr("data-padding-char");
   if (padding_char != null && max_int_digits !== -Infinity) {
      let padding_position = $(this).attr("data-padding-position");
      if (padding_position === "start") {
         val = val
            .padStart(max_int_digits, padding_char)
            .slice(-max_int_digits);
      } else {
         val = val
            .padEnd(max_int_digits, padding_char)
            .slice(0, max_int_digits);
      }
   }

   $(this).val(val);
}

function validateInputValueOnChange() {
   let val = $(this).val();
   if ($(this).is("[data-input-allow-empty]") && val === "") return;

   let fallback = $(this).attr("data-fallback-value");
   if (fallback != null && val === fallback) return;

   fallback = fallback || 0;

   const input_type = $(this).attr("data-input-type");
   if (input_type != null) {
      switch (input_type) {
         case "int": {
            val = parseInt(val);
            if (isNaN(val)) {
               $(this).val(fallback);
               return;
            }
            break;
         }
         case "absolute int": {
            val = parseInt(val);
            if (isNaN(val)) {
               $(this).val(fallback);
               return;
            }

            if (val < 0) {
               $(this).val(fallback);
               return;
            }
            break;
         }
         case "float": {
            val = parseFloat(val);
            if (isNaN(val)) {
               $(this).val(fallback);
               return;
            }

            const precision = $(this).attr("data-input-precision");
            if (precision != null) {
               val = parseFloat(val).toFixed(parseFloat(precision));
            }
            break;
         }
         case "absolute float": {
            val = parseFloat(val);
            if (isNaN(val)) {
               $(this).val(fallback);
               return;
            }

            let precision = $(this).attr("data-input-precision");
            if (precision != null) {
               val = parseFloat(val).toFixed(parseFloat(precision));
            }

            if (val < 0) {
               $(this).val(fallback);
               return;
            }
            break;
         }
         case "color": {
            val = val.toUpperCase();

            // Collapse any multiple hashtags
            val = val.replace(/#+/, "#");

            // Prepend a hashtag if there isn't one
            if (val.charAt(0) !== "#") val = "#" + val;

            // If the alpha part of the value is incomplete, remove that char
            if (val.length === 8) {
               val = val.slice(0, -1);
            }

            // Validate the value after applying all potential fixes, if it doesn't pass, revert to the last valid value
            if (!val.match(/^#([0-9A-F]{8}|[0-9A-F]{6})$/)) {
               $(this).val(fallback);
               return;
            }

            break;
         }
      }
   }

   const range = $(this).attr("data-input-range")?.split(",");
   if (range != null) {
      const [min, max] = range;
      val = clamp(parseFloat(val), parseFloat(min), parseFloat(max));
   }

   const max_int_digits = Math.max(
      ...($(this)
         .attr("data-input-range")
         ?.split(",")
         .map((n) => Math.abs(parseInt(n)).toString().length) ?? [])
   );

   let padding_char = $(this).attr("data-padding-char");
   if (padding_char != null && max_int_digits !== -Infinity) {
      let padding_position = $(this).attr("data-padding-position");
      if (padding_position === "start") {
         val = val.toString().padStart(max_int_digits, padding_char);
      } else {
         val = val.toString().padEnd(max_int_digits, padding_char);
      }
   }

   $(this).val(val);
   $(this).attr("data-fallback-value", val);
   if ($(this).attr("data-input-flexgrow") != null) {
      updateInputFlexgrowSize($(this));
   }
}

// NOTE: because jquery doesn't support wheel event
document.addEventListener(
   "wheel",
   function (e) {
      let $target = $(e.target).is("label")
         ? $(`#${$(e.target).attr("for")}`)
         : $(e.target);
      if (doInputStep($target, e.deltaY, e.shiftKey, e.ctrlKey)) {
         e.preventDefault();
         $target.trigger("input");
      }
   },
   { passive: false }
);

$(document).on("keydown", "input", function (e) {
   let delta_y = e.which === 38 ? -1 : e.which === 40 ? 1 : null;
   if (delta_y != null) {
      if (doInputStep($(e.target), delta_y, e.shiftKey, e.ctrlKey)) {
         e.preventDefault();
         $(e.target).trigger("input");
      }
   }
});

$(document).on(
   "keypress",
   ".content input",
   function (e) {
      // Blur if key is enter
      if (e.key === "Enter") {
         $(e.target).blur();
      } else {
         if (!approveInputKeypress.call(e.target, e.which)) {
            e.preventDefault();
         }
      }
      // NOTE: called both on change and focusout for the sake of reformatting values after doing steps, such as to remove redundant zeroes after a dot
   }
);

$(document).on(
   "input",
   ".content input[type='text'], input[type='number']",
   function (e) {
      let $target = $(e.target);
      validateInputValueOnInput.call($target);
   }
);

$(document).on(
   "change focusout",
   ".content input[type='text'], input[type='number']",
   function (e) {
      let $target = $(e.target);
      validateInputValueOnChange.call($target);
      if ($target.attr("data-input-type") === "color") {
         $target.css("background-color", $target.val());
      }

      resetHorScroll.call(e.target);
   }
);

$(document).on("blur", ".content input[data-trigger-change-on-blur-once]", function (e) {
   $(this).removeAttr("data-trigger-change-on-blur-once");
   $(this).trigger("change");
});

$(document).on("change", async function (e) {
   await requesting_config;

   if ($(e.target).hasClass("save-config")) {
      saveConfig();
   } else if ($(e.target).hasClass("save-file-types-config")) {
      saveFileConfig();
   } else if ($(e.target).hasClass("save-caption-config")) {
      saveCaptionConfig();
   }
});

$(document).on("click", "button", async function (e) {
   await requesting_config;

   if ($(this).hasClass("save-config")) {
      saveConfig();
   } else if ($(this).hasClass("save-file-types-config")) {
      saveFileConfig();
   } else if ($(this).hasClass("save-caption-config")) {
      saveCaptionConfig();
   }
});

$(document).on("click", ".on-off-toggle", function (e) {
   $(this).toggleClass("checked", !$(this).hasClass("checked"));
});

$(document).on("click", ".iterator", function (e) {
   let iterator_el = $(e.target).closest(".iterator");
   let option_els = iterator_el.find("option");

   let max_value = 0;
   option_els.each(function () {
      max_value = Math.max(max_value, parseInt($(this).val()));
   });

   let val = parseInt(iterator_el.attr("value") || 0);
   val = (val + 1) % (max_value + 1);
   iterator_el.attr("value", val);

   option_els.hide();
   option_els.filter(`[value="${val}"]`).show();
});

$("input[hide], :radio[hide]").on("change", function () {
   let toggle_el = $($(this).closest("[hide]").attr("hide"));
   toggle_el.hide();
});

$("input[toggle], :radio[toggle]").on("change", function (e) {
   let toggle_el = $($(this).closest("[toggle]").attr("toggle"));
   toggle_el.toggle();
});

$("input[show], :radio[show]").on("change", function (e) {
   let toggle_el = $($(this).closest("[show]").attr("show"));
   toggle_el.show();
});

$("input[enable], :radio[enable]").on("change", function () {
   let input_el = $(this).closest("[enable]");
   let toggle_el = $(input_el.attr("enable"));
   toggle_el.toggleClass("disabled", !input_el.is(":checked"));
});

$("input[disable], :radio[disable]").on("change", function () {
   let input_el = $(this).closest("[disable]");
   let toggle_el = $(input_el.attr("disable"));
   toggle_el.toggleClass("disabled", input_el.is(":checked"));
});

$("button[hide]").on("click", function () {
   let toggle_el = $($(this).closest("[hide]").attr("hide"));
   toggle_el.hide();
});

$("button[toggle]").on("click", function (e) {
   let toggle_el = $($(this).closest("[toggle]").attr("toggle"));
   toggle_el.toggle();
});

$("button[show]").on("click", function (e) {
   let toggle_el = $($(this).closest("[show]").attr("show"));
   toggle_el.show();
});

$(".gse-select ul").on("click", "li", function () {
   let val = parseInt($(this).attr("value"));
   let select_el = $(this).closest(".gse-select");
   updateInputSelect(select_el, val, false);

   if (select_el.hasClass("save-config")) {
      saveConfig();
   }
});

$(document.body).on("click", function (e) {
   let select_el = $(e.target).closest(".gse-select");
   if (select_el.length) {
      let select_options_el = select_el.find("ul");
      $(".gse-select ul").not(select_options_el).hide();
      select_options_el.toggle();
   } else {
      $(".gse-select ul").hide();
   }
});

function updateInputFlexgrowSize(input_el) {
   let val = input_el.val();
   if (!val) {
      input_el.css("width", "0");
   } else {
      let div = document.createElement("div");
      div.style.position = "absolute";
      div.style.visibility = "hidden";
      div.style.width = "auto";
      div.style.height = "auto";
      div.style.whiteSpace = "nowrap";
      div.style.fontSize = input_el.css("font-size");
      div.style.fontFamily = input_el.css("font-family");
      div.style.boxSizing = input_el.css("box-sizing");
      div.style.fontWeight = input_el.css("font-weight");
      div.style.fontStyle = input_el.css("font-style");
      div.style.letterSpacing = input_el.css("letter-spacing");
      div.style.padding = input_el.css("padding");
      div.style.border = input_el.css("border");

      div.innerHTML = val.replace(/ /g, "&nbsp;");
      document.body.appendChild(div);
      let width = div.clientWidth;
      document.body.removeChild(div);

      input_el.css("width", width + "px");
   }
}

$(document).on("input change", "input[data-input-flexgrow]", function () {
   updateInputFlexgrowSize($(this));
});

$("input[data-input-flexgrow]").each(function () {
   updateInputFlexgrowSize($(this));
});

$(document).on("click", "button", function (e) {
   // Blur if the button was actually clicked, and not triggered by a keypress
   if (0 < e.originalEvent.detail) {
      $(this).blur();
   }
});

$(document).on("click", ".modal__quote-clipboard-copy", function (e) {
   navigator.clipboard.writeText($(this).text().trim());
   createClipboardCopyNotification(
      $(this).find(".modal__quote-clipboard-copy__icon")
   );
});

$(document).on("focus", "input[data-select-on-focus]", function (e) {
   $(this).select();
});

var is_shift_down = false;
var is_ctrl_down = false;

$(window).on("keydown", function (e) {
   // if (
   //    $("input[type=text], input[type=number], textarea, [contenteditable]").is(
   //       ":focus"
   //    )
   // )
   //    return;

   if (e.key === "Control") {
      is_ctrl_down = true;
      $(document.body).attr("data-ctrl-down", "true");
   } else if (e.key === "Shift") {
      is_shift_down = true;
      $(document.body).attr("data-shift-down", "true");
   }
});

$(window).on("keyup", function (e) {
   if (e.key === "Control") {
      is_ctrl_down = false;
      $(document.body).removeAttr("data-ctrl-down");
   } else if (e.key === "Shift") {
      is_shift_down = false;
      $(document.body).removeAttr("data-shift-down");
   }
});

$(document).on("focus", "input[type='text']", function (e) {
   $(`label[for="${$(this).attr("id")}"]`).addClass("focus");
});

$(document).on("blur", "input[type='text']", function (e) {
   $(`label[for="${$(this).attr("id")}"]`).removeClass("focus");
});

function resetHorScroll() {
   $(this).scrollLeft(0);
}

$(document).on("click", ".iterable__prev-button", function () {
   let iterableEl = $(this).closest(".iterable");
   let val = iterableEl.attr("value") ?? 0;

   let optionEls = iterableEl.find("option");

   val = (parseInt(val) - 1 + optionEls.length) % optionEls.length;

   iterableEl.attr("value", val);

   optionEls.hide();
   optionEls.filter(`[value="${val}"]`).show();
});

$(document).on("click", ".iterable__next-button", function () {
   let iterableEl = $(this).closest(".iterable");
   let val = iterableEl.attr("value") ?? 0;

   let optionEls = iterableEl.find("option");

   val = (parseInt(val) + 1) % optionEls.length;

   iterableEl.attr("value", val);

   optionEls.hide();
   optionEls.filter(`[value="${val}"]`).show();
});

function updateIterable(inputEl, val) {
   let optionEls = inputEl.find("option");

   val = clamp(val, 0, optionEls.length - 1);

   inputEl.attr("value", val);

   optionEls.hide();
   optionEls.filter(`[value="${val}"]`).show();
}
