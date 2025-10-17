$(function () {
   $(document).tooltip({
      track: true,
      items: "*[tooltip]",
      content: function () {
         let tta = $(this).attr("tooltip");
         let ttt = "";
         if (tta === "cloud-config-data") {
            ttt =
               "<div id='settings-affected-configurations' class='ui-tooltip-content'>";
         }
         let str = ttt;
         if (/<\/?[a-z][\s\S]*>/i.test(ttt)) {
            let htmtlp = $.parseHTML(ttt);
            htmtlp.forEach(function (entry) {
               if (entry.nodeType === 1) {
                  let atr = $(entry).attr("data-i18n");
                  if (atr) {
                     $(entry).html(getI18nStr(atr)); //todo: check for unallowed html
                  }
               }
            });
            str = htmtlp;
         } else {
            str = getI18nStr("tooltip__" + tta);
            if (str === null) {
               str = getToolTipText($(this).attr("tooltip")); // ?? $(this).attr("tooltip")
            }
         }
         return str;
      },
      open: function (event, ui) {
         if ($(event.originalEvent.target).closest("[tooltip-danger]").length) {
            ui.tooltip.addClass("danger");
         }
         if (
            $(event.originalEvent.target).closest("[tooltip-special-highlight]")
               .length
         ) {
            ui.tooltip.addClass("special-highlight");
         }
      },
      position: {
         my: "left+6 top+6",
         at: "right bottom",
      },
      show: {
         effect: "fadeIn",
         duration: 150,
      },
      hide: {
         duration: 0,
      },
   });
   $(".copy-tooltip").tooltip({
      //track: true,
      items: "*[tooltip]",
      content: function () {
         let tta = $(this).attr("tooltip");
         let ttt = "";
         if (tta === "cloud-config-data") {
            ttt =
               "<div id='settings-affected-configurations' class='ui-tooltip-content'>";
         }
         return ttt;
      },
      position: {
         my: "center bottom-20",
         at: "center top",
      },
      show: {
         effect: "fadeIn",
         duration: 100,
      },
      hide: {
         duration: 0,
      },
   });
});

let parent_danger_tooltip_pairs = [];

function createDangerArrowTooltip(
   parent_el,
   text,
   {
      position_my = "center bottom-8",
      position_at = "center top",
      arrow_position = "top",
   } = {}
) {
   $(".data-tooltip:not(.tooltip-persistent)").remove();
   let tooltip_el = $(
      `<div class="data-tooltip danger tooltip-persistent">${text}</div>`
   );
   $(document.body).append(tooltip_el);

   tooltip_el.css({
      animation: "horizontal-shaking 0.25s ease-out",
      opacity: 1,
   });

   let parent_tooltip_pair = [parent_el[0], tooltip_el[0]];
   parent_danger_tooltip_pairs.push(parent_tooltip_pair);

   setTimeout(() => {
      if (parent_el.is(":hover")) {
         parent_el.on("mouseleave", function () {
            tooltip_el.animate({ opacity: 0 }, 50, function () {
               parent_danger_tooltip_pairs = parent_danger_tooltip_pairs.filter(
                  (pair) => pair !== parent_tooltip_pair
               );
               $(this).remove();
            });
         });
      } else {
         tooltip_el.animate({ opacity: 0 }, 50, function () {
            parent_danger_tooltip_pairs = parent_danger_tooltip_pairs.filter(
               (pair) => pair !== parent_tooltip_pair
            );
            $(this).remove();
         });
      }
   }, 1000);

   tooltip_el.addClass(`data-tooltip-${arrow_position}`);

   tooltip_el.position({
      my: position_my,
      at: position_at,
      of: parent_el,
      collision: "fit fit",
   });

   return tooltip_el;
}

$(document).on("click", ".data-tooltip.danger", function () {
   $(this).animate({ opacity: 0 }, 50, function () {
      $(this).remove();
   });
});

function createPersistentArrowTooltip(
   parent_el,
   text,
   {
      id = "",
      position_my = "center bottom-8",
      position_at = "center top",
      arrow_position = "top",
   } = {}
) {
   let tooltip_el =
      $(`<div id="${id}" class="data-tooltip tooltip-persistent info">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"><path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" fill="currentColor"></path></svg>&nbsp;${text}</div>`);
   $(document.body).append(tooltip_el);

   tooltip_el.animate({ opacity: 1 }, 50);
   tooltip_el.css({
      display: "flex",
   });

   tooltip_el.addClass(`data-tooltip-${arrow_position}`);

   tooltip_el.position({
      my: position_my,
      at: position_at,
      of: parent_el,
      collision: "fit fit",
   });

   return tooltip_el;
}

function removePersistentArrowTooltip(id) {
   $(`#${id}`).animate({ opacity: 0 }, 50, function () {
      $(this).remove();
   });
}

let tooltipTimeoutId = null;
$(document).on("mouseenter", "[data-tooltip]", function () {
   if (parent_danger_tooltip_pairs.some((pair) => pair[0] === this)) {
      return;
   }

   clearTimeout(tooltipTimeoutId);
   tooltipTimeoutId = setTimeout(async () => {
      if (!$(this).is(":hover")) return;

      $(".data-tooltip:not(.danger, .tooltip-persistent)").remove();

      let key = $(this).attr("data-tooltip");
      let text = await getSpecialTooltipText(key);
      if (!text) {
         text = getI18nStr(`tooltip__${key}`);
      }
      let tooltip_el = $('<div class="data-tooltip"></div>').html(text);
      $(document.body).append(tooltip_el);

      tooltip_el.animate({ opacity: 1 }, 100);

      let position_my;
      let position_at;
      let preset = $(this).attr("data-tooltip-position") || "top";
      if (preset) {
         switch (preset) {
            case "top":
               position_my = "center bottom-8";
               position_at = "center top";
               tooltip_el.addClass("data-tooltip-top");
               break;
            case "top right":
               position_my = "left-4 bottom-8";
               position_at = "left top";
               tooltip_el.addClass("data-tooltip-top-right");
               break;
            case "bottom left":
               position_my = "right+4 top+8";
               position_at = "right bottom";
               tooltip_el.addClass("data-tooltip-bottom-left");
               break;
         }
      }

      tooltip_el.css({
         "max-width": $(this).attr("data-tooltip-max-width") || "450px",
      });

      if ($(this).attr("data-tooltip-class") != null) {
         tooltip_el.addClass($(this).attr("data-tooltip-class"));
      }

      tooltip_el.position({
         my: position_my,
         at: position_at,
         of: this,
         collision: "none none",
      });
   }, 100);
});

$(document).on("mouseleave", "[data-tooltip]", function () {
   $(".data-tooltip:not(.tooltip-persistent)").animate(
      { opacity: 0 },
      50,
      function () {
         $(this).remove();
      }
   );
});

async function getSpecialTooltipText(key) {
   switch (key) {
      case "invalid-lock-reason": {
         // TODO: translate
         let reason = isLockConfigNotValid(lock_configuration);
         return "Lock is invalid: " + reason;
      }
      case "patreon-cache":
         let { user } = await browser.storage.sync.get(["user"]);
         const date1 = Date.parse(user.patreon_cache);
         const date2 = new Date();
         const diffTime = Math.abs(date2 - date1);
         const diffDays = 14 - Math.ceil(diffTime / (1000 * 60 * 60 * 24));
         let t = isNaN(diffDays) ? 0 : diffDays;
         return getI18nStr(`tooltip__${key}`, t);
   }
}
