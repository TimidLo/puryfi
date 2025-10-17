async function getStickerCollection(collection_name) {
   let res = await browser.runtime.sendMessage({
      type: "GET_STICKER_COLLECTION",
      name: collection_name,
      keep_files: false,
      version: 2,
   });
   return res.collection;
}

async function saveStickerCollection(collection) {
   let res = await browser.runtime.sendMessage({
      type: "SAVE_STICKER_COLLECTION",
      collection: collection,
      verify_save: true,
      version: 2,
   });
   return res.success;
}

async function deleteStickerCollection(collection_name) {
   let res = await browser.runtime.sendMessage({
      type: "DELETE_STICKER_COLLECTION",
      name: collection_name,
      version: 2,
   });
   return res.success;
}

async function clearStickerCollections() {
   let res = await browser.runtime.sendMessage({
      type: "CLEAR_STICKER_COLLECTIONS",
      version: 2,
   });
   return res.success;
}

async function trySaveStickerCollection(collection) {
   let success = await saveStickerCollection(collection);
   if (!success) {
      // The collection wasn't saved correctly, likely because it exceeded the 255mb limit. Just restore the previous state and alert the user.
      createAlert(`
         <div class="modal__quote danger">
            -<b> ${getI18nStr("on-create-sticker-collection__db-error")}</b>
         </div>
      `);

      let prev_collection = await getStickerCollection(collection._name);
      let i = sticker_collections.findIndex((c) => {
         return c._name === collection._name;
      });

      if (prev_collection == null) {
         if (i !== -1) {
            sticker_collections.splice(i, 1);
         }
      } else {
         sticker_collections[i] = prev_collection;
      }

      $("#sticker_collections").trigger("change");
   }
}

$("#sticker_collections")
   .change(async function () {
      await requesting_config;
      $("#sticker_collection_delete").prop("disabled", true);
      $("#sticker_collection_disable").prop("disabled", true);
      let collection_el = $("#sticker_collections option:selected").first();
      if (collection_el.length && sticker_collections) {
         let collection = sticker_collections.find((o) => {
            return o["_name"] === collection_el.attr("name");
         });
         if (collection) {
            $("#sticker_collection_disable").html(
               collection._enabled ? "Disable" : "Enable"
            );
            $("#sticker_collection_disable").prop("disabled", false);
            $("#sticker_collection_add_sticker").show();
            if (!collection._locked) {
               $("#sticker_collection_delete").prop("disabled", false);
            }
            let $display = $(".sticker-collection-display");
            let $item_template = $display.find(
               "#sticker_collection_item_template"
            );
            $display
               .find(".sticker-collection-item")
               .not($item_template)
               .remove();
            for (let i = 0; i < collection._stickers.length; i++) {
               let sticker = collection._stickers[i];
               let $new_item = $item_template.clone({
                  deepWithDataAndEvents: true,
               });
               $new_item.attr("id", "");
               $new_item.attr("data-index", i);
               $new_item
                  .find(".sticker-collection-image img")
                  .attr("src", sticker.url);
               $new_item.find(".sticker-collection-label").html(sticker.name);
               $new_item.insertBefore($item_template);
            }
         }
      } else {
         let $display = $(".sticker-collection-display");
         let $item_template = $display.find(
            "#sticker_collection_item_template"
         );
         $display.find(".sticker-collection-item").not($item_template).remove();
         $("#sticker_collection_add_sticker").hide();
      }
   })
   .trigger("change");

function populateAddStickerModal(collection, sticker_index) {
   let sticker = collection._stickers[sticker_index];
   if (sticker.locked) {
      $("#sticker_collection_add_delete").hide();
   } else {
      $("#sticker_collection_add_delete").show();
   }
   $(".sticker_collection_popup").attr("data-index", sticker_index);
   $("#sticker_collection_add_name")
      .val(sticker.name)
      .prop("disabled", sticker.locked);
   updateInputField($("#sticker_collection_add_scale"), sticker.scale * 100);
   updateInputField($("#sticker_collection_add_chance"), sticker.chance);
   $("#sticker_collection_add_group").val(sticker.groups.join(";"));
   $(".sticker_collection_add_label").prop("checked", false);
   sticker.klasses.forEach(function (klass) {
      $('.sticker_collection_add_label[label="' + klass.key + '"]').prop(
         "checked",
         true
      );
   });
   $("#sticker_collection_add_preview_image img").attr("src", sticker.url);
   let prev_sticker_index = sticker_index - 1;
   if (prev_sticker_index < 0)
      prev_sticker_index = collection._stickers.length - 1;
   $("#sticker_collection_add_preview_prev_image img").attr(
      "src",
      collection._stickers[prev_sticker_index].url
   );
   let next_sticker_index = sticker_index + 1;
   if (collection._stickers.length <= next_sticker_index)
      next_sticker_index = 0;
   $("#sticker_collection_add_preview_next_image img").attr(
      "src",
      collection._stickers[next_sticker_index].url
   );
   $("#sticker_collection_add_sticker_file_input").val(null);
   $("#sticker_collection_add_sticker_modal").show();
}

$("#sticker_collection_add_preview_prev_image").click(function () {
   stickerCollectionAddSave();
   let $selected_collection = $("#sticker_collections option:selected").first();
   let collection = sticker_collections.find((o) => {
      return o["_name"] === $selected_collection.attr("name");
   });
   if (collection) {
      let sticker_index =
         parseInt($(".sticker_collection_popup").attr("data-index")) - 1;
      if (sticker_index < 0) sticker_index = collection._stickers.length - 1;
      populateAddStickerModal(collection, sticker_index);
   }
});

$("#sticker_collection_add_preview_next_image").click(function () {
   stickerCollectionAddSave();
   let $selected_collection = $("#sticker_collections option:selected").first();
   let collection = sticker_collections.find((o) => {
      return o["_name"] === $selected_collection.attr("name");
   });
   if (collection) {
      let sticker_index =
         parseInt($(".sticker_collection_popup").attr("data-index")) + 1;
      if (collection._stickers.length <= sticker_index) sticker_index = 0;
      populateAddStickerModal(collection, sticker_index);
   }
});

$(".sticker-collection-display").on(
   "click",
   ".sticker-collection-item",
   function () {
      $("#sticker_collection_add_select_file").hide();
      $("#sticker_collection_add_name").prop("disabled", true);
      let $selected_collection = $(
         "#sticker_collections option:selected"
      ).first();
      let collection = sticker_collections.find((o) => {
         return o["_name"] === $selected_collection.attr("name");
      });

      if (collection) {
         $("#sticker_collection_add_preview_prev_image").css(
            "visibility",
            "visible"
         );
         $("#sticker_collection_add_preview_next_image").css(
            "visibility",
            "visible"
         );
         let index = parseInt(
            $(this).closest(".sticker-collection-item").attr("data-index")
         );
         populateAddStickerModal(collection, index);
      }
   }
);

$("#sticker_collection_export").click(function () {
   let f = $("#sticker_collections option:selected").first();
   if (f && sticker_collections) {
      let found = sticker_collections.find((o) => {
         return o["_name"] === f.attr("name");
      });
      if (found) {
         found._stickers.forEach(function (sticker, idx, array) {
            if (sticker.file) {
               sticker.file = null;
            }
         });
         objToJSON(found._name + ".pstp", found);
      }
   }
});

$("#sticker_collection_delete").click(function () {
   let f = $("#sticker_collections option:selected").first();
   if (f && sticker_collections) {
      let collection = sticker_collections.find((o) => {
         return o["_name"] === f.attr("name");
      });
      if (collection) {
         if (!collection._locked) {
            removeItemOnce(sticker_collections, collection);
            deleteStickerCollection(collection._name).then(function () {
               $("#sticker_collection").empty();
               $("#sticker_collections").trigger("change");
               restoreConfig();
            });
         }
      }
   }
});

$("#sticker_collection_create_add").click(function () {
   let name = $("#sticker_collection_create_name").val();
   // TODO: me no likey this
   name = name.toLowerCase();
   $("#sticker_collection_add_select_file").show();
   $("#sticker_collection_add_name").prop("disabled", false);
   if (name.length > 30) {
      name = name.substring(0, 30);
   }

   if (!name.length) {
      createAlert(`
         <div class="modal__quote danger">
            -<b> ${getI18nStr(
               "on-create-sticker-collection__no-name-error"
            )}</b>
         </div>
      `);
      return;
   }
   if (!name.match(/^[\w\-. ]+$/)) {
      createAlert(`
         <div class="modal__quote danger">
            -<b> ${getI18nStr(
               "on-create-sticker-collection__forbidden-name-chars-error",
               `<span class="modal__quote-inline">${replaceHtmlEntities(
                  name
               )}</span>`
            )}</b>
         </div>
      `);
      return;
   }

   if (sticker_collections) {
      let other_collection = sticker_collections.find((o) => {
         return o["_name"] === name;
      });
      if (!other_collection) {
         let collection = new StickerCollection(name, [], true, false);
         sticker_collections.push(collection);

         // An empty collection shouldn't be able to exceed 255mb, so we don't check for failure
         saveStickerCollection(collection).then(function () {
            $("#sticker_collections").trigger("change");
         });
         $("#sticker_collections").empty();
         sticker_collections.forEach(function (collection, key) {
            $("#sticker_collections").append(
               $("<option>", {
                  value: key,
                  text: capitalizeFirstLetter(collection._name),
                  name: collection._name,
                  class:
                     " " +
                     (collection._enabled
                        ? "sticker_collection_enabled"
                        : "sticker_collection_disabled") +
                     " " +
                     (collection._locked ? "sticker_collection_locked" : ""),
               })
            );
         });
         $("#sticker_collection_create_name").val("");
      } else {
         createAlert(`
            <div class="modal__quote danger">
               -<b> ${getI18nStr(
                  "on-create-sticker-collection__duplicate-name-error",
                  `<span class="modal__quote-inline">${replaceHtmlEntities(
                     name
                  )}</span>`
               )}</b>
            </div>
         `);
      }
   }
});

$("#invert_selection").click(function () {
   $(".sticker_collection_add_label").each(function () {
      $(this).prop("checked", !$(this).prop("checked"));
   });
});

$("#select_all").click(function () {
   $(".sticker_collection_add_label").prop("checked", true);
});

$("#select_none").click(function () {
   $(".sticker_collection_add_label").prop("checked", false);
});

async function addStickers(collection, files) {
   let allowed_klasses = [];
   for (let key in klasses) {
      allowed_klasses.push(klasses[key]);
   }

   const canvas = document.createElement("canvas");
   for (let file of files) {
      let sticker_name = file.name.replace(/\.[^/.]+$/, "");

      let src = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
         let img = new Image();
         img.onload = function () {
            let w = img.naturalWidth,
               h = img.naturalHeight;
            let scale = (750 * 750) / (w * h);
            if (scale < 1) {
               w *= scale;
               h *= scale;
            }
            canvas.width = w;
            canvas.height = h;
            let ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, w, h);
            let dataurl = canvas.toDataURL("image/png");

            let sticker = {
               name: sticker_name,
               url: dataurl,
               width: w,
               height: h,
               klasses: [...allowed_klasses],
               scale: 1,
               chance: 1,
               groups: [],
               locked: false,
            };

            collection._stickers.push(sticker);
            $("#sticker_collections").trigger("change");
            resolve();
         };
         img.onerror = function () {
            console.error("Failed to load image", src);
            resolve();
         };
         img.src = src;
      });
   }

   trySaveStickerCollection(collection);
}

$("#sticker_collection_add_sticker").on("click", function () {
   let collection_el = $("#sticker_collections option:selected").first();
   let collection;
   if (collection_el && sticker_collections) {
      collection = sticker_collections.find((o) => {
         return o["_name"] === collection_el.attr("name");
      });
      if (!collection) return;
   } else {
      return;
   }

   let img_input = $("<input>", {
      type: "file",
      accept: "image/*",
      multiple: "multiple",
   });
   img_input.on("change", function () {
      let files = img_input.prop("files");
      addStickers(collection, files);
   });
   img_input.click();
});

function stickerCollectionAddSave() {
   let collection_el = $("#sticker_collections option:selected").first();

   let index = parseInt($(".sticker_collection_popup").attr("data-index"));
   let collection = sticker_collections.find((o) => {
      return o["_name"] === collection_el.attr("name");
   });
   if (collection) {
      let sticker = collection._stickers[index];

      if (sticker) {
         let sticker_name = sticker.locked
            ? sticker.name
            : $("#sticker_collection_add_name").val();
         let scale = Math.max(
            0.1,
            parseFloat($("#sticker_collection_add_scale").val()) / 100
         );
         let chance = Math.max(
            0,
            parseFloat($("#sticker_collection_add_chance").val())
         );
         let groups = $("#sticker_collection_add_group").val().split(";");
         let allowed_klasses = [];
         Object.keys(klasses).forEach((e) => {
            let checked = $(
               ".sticker_collection_add_label[label='" + klasses[e].key + "']"
            ).is(":checked");
            if (checked) {
               allowed_klasses.push(klasses[e]);
            }
         });

         let was_changed =
            sticker.name !== sticker_name ||
            sticker.scale !== scale ||
            sticker.chance !== chance ||
            !areArraysEqual(sticker.groups, groups) ||
            !areArraysEqual(
               sticker.klasses,
               allowed_klasses,
               (a, b) => a.index === b.index
            );
         if (was_changed) {
            sticker.name = sticker_name;
            sticker.scale = scale;
            sticker.chance = chance;
            sticker.groups = groups;
            sticker.klasses = allowed_klasses;
            trySaveStickerCollection(collection);
         }
      }
   }
   return true;
}

$("#sticker_collection_add_sticker_modal_close").click(function () {
   if (stickerCollectionAddSave()) {
      $("#sticker_collection_add_sticker_modal").hide();
   }
});

$("#sticker_collection_add_delete").click(function () {
   $("#sticker_collection_add_sticker_modal").hide();
   let collection_el = $("#sticker_collections option:selected").first();
   if (collection_el && sticker_collections) {
      let collection = sticker_collections.find((o) => {
         return o["_name"] === collection_el.attr("name");
      });
      if (collection) {
         let index = parseInt(
            $(".sticker_collection_popup").attr("data-index")
         );
         collection._stickers.splice(index, 1);
         saveStickerCollection(collection).then(function () {
            $("#sticker_collection_add_sticker_modal").hide();
            $("#sticker_collections").trigger("change");
         });
      }
   }
});

$("#sticker_add_toggle_labels").click(function () {
   $(".sticker_collection_add_label").each(function () {
      $(this).prop("checked", !$(this).prop("checked"));
   });
});

$("#sticker_draw_mode").change(function () {
   if ($(this).val() == 2) {
      $("#sticker_groups").show();
   } else {
      $("#sticker_groups").hide();
   }
});

$("#sticker_collection_import").click(function () {
   $("#sticker_collection_import_file_input").trigger("click");
});

function importStickerCollection(file) {
   let reader = new FileReader();
   reader.onload = function (event) {
      let collection = JSON.parse(event.target.result);

      if (
         "_enabled" in collection &&
         "_locked" in collection &&
         collection._locked == false &&
         "_name" in collection &&
         collection._name.length > 0 &&
         "_stickers" in collection
      ) {
         let other_collection = sticker_collections.find((o) => {
            return o["_name"] === collection._name;
         });
         if (other_collection) {
            createAlert(`
               <div class="modal__quote danger">
                  -<b> ${getI18nStr(
                     "on-create-sticker-collection__duplicate-name-error",
                     `<span class="modal__quote-inline">${replaceHtmlEntities(
                        collection._name
                     )}</span>`
                  )}</b>
               </div>
            `);
            return;
         }
         let promises = [];
         collection._stickers.forEach(function (sticker, idx, array) {
            let p = new Promise((resolve, reject) => {
               // Legacy Support
               if (sticker.file != null) {
                  if (!sticker.url) {
                     sticker.url = sticker.file;
                  }
               }
               // Legacy Support End
               if (
                  "name" in sticker &&
                  sticker.name.length > 0 &&
                  "klasses" in sticker &&
                  "scale" in sticker &&
                  "chance" in sticker &&
                  "groups" in sticker
               ) {
                  let new_sticker = {
                     name: sticker.name,
                     url: sticker.url,
                     width: sticker.width,
                     height: sticker.height,
                     klasses: sticker.klasses,
                     scale: sticker.scale,
                     locked: false,
                     chance: sticker.chance,
                     groups: sticker.groups,
                  };

                  if (sticker.url != null) {
                     let imageData = new Image();
                     imageData.onload = function () {
                        const canvas = document.createElement("canvas");
                        canvas.width = imageData.width;
                        canvas.height = imageData.height;
                        if (canvas.width <= 0 || canvas.height <= 0) {
                           reject();
                        }
                        let ctx = canvas.getContext("2d");
                        ctx.drawImage(imageData, 0, 0);
                        collection._stickers[idx] = new_sticker;
                        resolve();
                     };
                     imageData.src = sticker.url;
                  }
               } else {
                  reject("Sticker " + sticker.name + " corrupted");
               }
            });
            promises.push(p);
         });
         Promise.all(promises)
            .then((values) => {
               sticker_collections.push(collection);
               saveStickerCollection(collection).then(function () {
                  $("#sticker_collections").trigger("change");
                  restoreConfig();
               });
            })
            .catch(function (err) {
               console.error("Error importing sticker collection", err);
            });
      } else {
         log(
            "Corrupted Collection",
            "_enabled" in collection,
            "_locked" in collection && collection._locked == false,
            "_name" in collection && collection._name.length > 0,
            "_stickers" in collection
         );

         createAlert(`
            <div class="modal__quote danger">
               -<b> ${getI18nStr(
                  "on-create-sticker-collection__corrupted-error"
               )}</b>
            </div>
         `);
      }
   };
   reader.readAsText(file);
}

$("#sticker_collection_import_file_input").on("change", function () {
   let files = $(this).prop("files");
   if (files && files[0]) {
      importStickerCollection(files[0]);
   }
});

$("#sticker_collection_reset_all").click(async function () {
   if (
      await createConfirm(
         `${getI18nStr("on-reset-all-sticker-collections__confirm")}
         <div class="modal__quote warning" style="margin-top:0.5rem">
            -<b> ${getI18nStr("on-non-reversible-action-warning")}</b>
         </div>
         `
      )
   ) {
      sticker_collections = [];
      clearStickerCollections().then((e) => {
         reloadStickers();
         restoreConfig();
      });
   }
});

function reloadStickers() {
   return browser.runtime.sendMessage({
      reset_stickers: true,
   });
}

$(".sticker-collection-display").on("dragover", function (e) {
   e.preventDefault();
});

$(".sticker-collection-display").on("drop", function (e) {
   e.preventDefault();
   e.stopPropagation();

   let collection_el = $("#sticker_collections option:selected").first();
   let collection;
   if (collection_el && sticker_collections) {
      collection = sticker_collections.find((o) => {
         return o["_name"] === collection_el.attr("name");
      });
      if (!collection) return;
   } else {
      return;
   }

   let files = e.originalEvent?.dataTransfer.files;
   addStickers(collection, files);
});

$("#sticker_collections").on("dragover", function (e) {
   e.preventDefault();
});

$("#sticker_collections").on("drop", function (e) {
   e.preventDefault();
   e.stopPropagation();

   let files = e.originalEvent?.dataTransfer.files;
   if (files && files[0]) {
      importStickerCollection(files[0]);
   }
});
