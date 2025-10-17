const notification_template = `<div class="notification"><div class="notification__icon-container"></div><div class="notification__content"></div><div class="notification__progress-bar"></div></div>`;

function createNotification(msg, icon, type = "info") {
   let notificationEl = $(notification_template);
   if (type === "danger") {
      notificationEl.addClass("danger");
   } else if (type === "warning") {
      notificationEl.addClass("warning");
   } else if (type === "success") {
      notificationEl.addClass("success");
   }

   notificationEl.find(".notification__icon-container").append($(icon));
   let contentEl = notificationEl.find(".notification__content");
   contentEl.html(msg);

   let progressBar = notificationEl.find(".notification__progress-bar");

   let duration = Math.max(
      2500,
      countSyllables(contentEl.text()) * (1000 / 2.9) + 200
   );

   function animateProgressBar(duration) {
      progressBar.animate({ width: "100%" }, duration, "linear", () => {
         if (notificationEl.is(":hover")) {
            notificationEl.one("mouseleave", () => {
               remoteNotification(notificationEl);
            });
         } else {
            remoteNotification(notificationEl);
         }
      });
   }

   function adjustProgressBarAnimationDuration(duration) {
      let currentWidth =
         (parseFloat(progressBar.css("width")) / progressBar.parent().width()) *
         100;
      let remainingWidth = 100 - currentWidth;
      return duration * (remainingWidth / 100);
   }

   animateProgressBar(duration);
   notificationEl.hover(
      function () {
         progressBar.clearQueue();
         progressBar.stop();
         animateProgressBar(adjustProgressBarAnimationDuration(duration * 4));
      },
      function () {
         progressBar.clearQueue();
         progressBar.stop();
         animateProgressBar(adjustProgressBarAnimationDuration(duration));
      }
   );

   notificationEl.css({
      animation: "create-notification 0.15s ease-out forwards",
   });

   $("#notifications-area").prepend(notificationEl);
}

function remoteNotification(notificationEl) {
   notificationEl.css({
      animation: "remove-notification 0.15s ease-out forwards",
   });
   notificationEl.one("animationend", () => {
      notificationEl.remove();
   });
}

$(document).on("click", ".notification", function () {
   remoteNotification($(this));
});

function createClipboardCopyNotification(parent_el, y_offset) {
   let notification_el = $(
      `<div class="clipboard-notification"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"><path d="M4 7V21H18V23H4C2.9 23 2 22.1 2 21V7H4M20 3C21.1 3 22 3.9 22 5V17C22 18.1 21.1 19 20 19H8C6.9 19 6 18.1 6 17V5C6 3.9 6.9 3 8 3H11.18C11.6 1.84 12.7 1 14 1C15.3 1 16.4 1.84 16.82 3H20M14 3C13.45 3 13 3.45 13 4C13 4.55 13.45 5 14 5C14.55 5 15 4.55 15 4C15 3.45 14.55 3 14 3M10 7V5H8V17H20V5H18V7H10Z" fill="currentColor" /></svg></div>`
   );
   parent_el.append(notification_el);

   notification_el.position({
      my: `center bottom${y_offset ?? "-12"}`,
      at: "center top",
      of: parent_el,
      collision: "fit fit",
   });

   animateHighlight(parent_el);

   setTimeout(function () {
      notification_el.animate(
         {
            top: `-=6px`,
            opacity: 0,
         },
         {
            duration: 500,
            queue: false,
            complete: function () {
               notification_el.remove();
            },
         }
      );
   }, 750);
}

const countSyllables = (x) => {
   /*
    * basic algortithm: each vowel-group indicates a syllable, except for: final
    * (silent) e 'ia' ind two syl @AddSyl and @SubSyl list regexps to massage the
    * basic count. Each match from @AddSyl adds 1 to the basic count, each
    * @SubSyl match -1 Keep in mind that when the regexps are checked, any final
    * 'e' will have been removed, and all '\'' will have been removed.
    */
   const subSyl = [
      /cial/,
      /tia/,
      /cius/,
      /cious/,
      /giu/, // belgium!
      /ion/,
      /iou/,
      /sia$/,
      /.ely$/, // absolutely! (but not ely!)
      /sed$/, // doused, housed, used
   ];

   const addSyl = [
      /ia/,
      /riet/,
      /dien/,
      /iu/,
      /io/,
      /ii/,
      /[aeiouym]bl$/, // -Vble, plus -mble
      /[aeiou]{3}/, // agreeable
      /^mc/,
      /ism$/, // -isms
      /([^aeiouy])\1l$/, // middle twiddle battle bottle, etc.
      /[^l]lien/, // // alien, salient [1]
      /^coa[dglx]./, // [2]
      /[^gq]ua[^auieo]/, // i think this fixes more than it breaks
      /dnt$/, // couldn't
   ];

   // (comments refer to titan's /usr/dict/words)
   // [1] alien, salient, but not lien or ebbullient...
   // (those are the only 2 exceptions i found, there may be others)
   // [2] exception for 7 words:
   // coadjutor coagulable coagulate coalesce coalescent coalition coaxial

   const xx = x.toLowerCase().replace(/'/g, "").replace(/e\b/g, "");
   const scrugg = xx.split(/[^aeiouy]+/).filter(Boolean); // '-' should be perhaps added?

   return undefined === x || null === x || "" === x
      ? 0
      : 1 === xx.length
      ? 1
      : subSyl.map((r) => (xx.match(r) || []).length).reduce((a, b) => a - b) +
        addSyl.map((r) => (xx.match(r) || []).length).reduce((a, b) => a + b) +
        scrugg.length -
        (scrugg.length > 0 && "" === scrugg[0] ? 1 : 0) +
        // got no vowels? ("the", "crwth")
        xx
           .split(/\b/)
           .map((x) => x.trim())
           .filter(Boolean)
           .filter((x) => !x.match(/[.,'!?]/g))
           .map((x) => (x.match(/[aeiouy]/) ? 0 : 1))
           .reduce((a, b) => a + b);
};
