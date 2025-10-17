class StickerCollection {
   constructor(name, stickers, enabled = true, locked = false) {
      this._name = name;
      this._stickers = stickers;
      this._locked = locked;
      this._enabled = enabled;
   }

   get stickers() {
      return this._stickers;
   }

   set stickers(value) {
      this._stickers = value;
   }

   get name() {
      return this._name;
   }

   set name(value) {
      this._name = value;
   }

   get locked() {
      return this._locked;
   }

   set locked(value) {
      this._locked = value;
   }

   get enabled() {
      return this._enabled;
   }

   set enabled(value) {
      this._enabled = value;
   }
}

function cacheStickerCollection(collection) {
   let prs = [];
   for (const i in collection._stickers) {
      let sticker = collection._stickers[i];

      if (sticker.file) {
         continue;
      }
      prs.push(
         new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = function () {
               const canvas = document.createElement("canvas");
               canvas.width = sticker.width;
               canvas.height = sticker.height;
               let ctx = canvas.getContext("2d");
               ctx.drawImage(img, 0, 0);
               sticker.file = ctx.getImageData(
                  0,
                  0,
                  canvas.width,
                  canvas.height
               ).data;
               resolve();
            };
            img.onerror = function () {
               console.error("Error loading sticker image", sticker.url);
               reject();
            };
            img.src = sticker.url;
         })
      );
   }
   return prs;
}

/**
 * Loads the Imagedata directly into the collection.
 * We do that as we do not want imageData in the local storage as it is 3 times bigger than a Base64 encoded image.
 */
function cacheStickerCollections(sticker_collections, sticker_configuration) {
   let prs = [];
   sticker_collections.forEach((c) => {
      prs = prs.concat(cacheStickerCollection(c));
   });
   if (sticker_configuration) {
      sticker_configuration.cached = true;
   }
   return Promise.all(prs);
}
