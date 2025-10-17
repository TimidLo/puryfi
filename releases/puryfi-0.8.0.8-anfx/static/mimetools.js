function requestContentType(url, callback, onerror) {
   let xhttp = new XMLHttpRequest();
   xhttp.open("HEAD", url);
   xhttp.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
         let content_type_header = this.getResponseHeader("Content-Type");
         callback(content_type_header);
      } else if (xhttp.status == 403) {
         onerror(xhttp.status);
      }
   };
   xhttp.send();
}

function toDataURL(url, callback, errorCallback) {
   let xhr1 = new XMLHttpRequest();
   let ct = "";
   function hand() {
      ct = this.getResponseHeader("content-type");
   }
   xhr1.onreadystatechange = hand;
   xhr1.onload = function () {
      let reader = new FileReader();
      reader.onloadend = function () {
         callback(reader.result, ct);
      };
      reader.readAsArrayBuffer(xhr1.response);
   };
   xhr1.onerror = function (err) {
      errorCallback?.(err);
   };
   xhr1.open("GET", url);
   xhr1.responseType = "blob";
   xhr1.send();
}

function processableContentType(content_type, file_types, gif_configuration) {
   if (content_type === "image/png" && file_types.includes("png")) {
      return true;
   }
   if (content_type === "image/jpg" && file_types.includes("jpg")) {
      return true;
   }
   if (content_type === "image/jpeg" && file_types.includes("jpg")) {
      return true;
   }
   if (content_type === "image/webp" && file_types.includes("webp")) {
      return true;
   }
   if (content_type === "image/bmp" && file_types.includes("bmp")) {
      return true;
   }
   if (content_type === "image/avif" && file_types.includes("avif")) {
      return true;
   }
   if (
      content_type === "image/gif" &&
      (file_types.includes("gif") ||
         (gif_configuration != null && gif_configuration._thumbnails))
   ) {
      return true;
   }
   if (content_type === "video/webm" && file_types.includes("webm")) {
      return false;
   }
   return false;
}

function prepareFetch(url) {
   url = new URL(url);
   switch (url.hostname) {
      case "i.pximg.net":
         return {
            referrer: "https://www.pixiv.net/",
         };
      case "cdn.sex.com":
         return {
            referrer: "https://www.sex.com/",
         };
      default:
         return {};
   }
}

async function toBlobWithMimeHeaderNoReq(url) {
   let res = await fetch(url);
   let blob = await res.blob();
   let mime = await checkMime(blob);
   return { blob, ...mime };
}

async function toBlobWithMimeHeader(url, req) {
   let res = await fetch(url, req);
   let blob = await res.blob();
   let mime = await checkMime(blob);
   return { blob, ...mime };
}

function checkBufferMime(arrayBuffer) {
   let signatureArr = new Array(4);
   for (let i = 0; i < 4; i++) {
      signatureArr[i] = new Uint8Array(arrayBuffer)[i].toString(16);
   }
   let header = signatureArr.join("");

   return checkMimeHeader(header, arrayBuffer);
}

function checkMime(blob) {
   return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onloadend = function (e) {
         let arr = new Uint8Array(e.target.result);
         let header = "";
         for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
         }

         resolve(checkMimeHeader(header, e.target.result));
      };
      fileReader.readAsArrayBuffer(blob.slice(0, 4));
   });
}

function checkMimeHeader(header, byteArr = null) {
   let type = "unknown";
   let ext = "";

   switch (header) {
      // M3U8
      case "23455854":
         type = "application/m3u8";
         ext = "m3u8";
         return { type, ext, header };
      // MP4
      // case "7011125643":
      //    type = "video/mp4";
      //    ext = "mp4";
      //    return {type, ext, header}
      // M4S
      case "00018":
      case "0001c":
      case "00020":
      case "00034":
         type = "video/m4s";
         ext = "m4s";
         return { type, ext, header };
      case "89504e47":
         type = "image/png";
         ext = "png";
         return { type, ext, header };
      case "47494638":
         type = "image/gif";
         ext = "gif";
         return { type, ext, header };
      case "52494646":
         //let arrAvif = (new Uint8Array(byteArr)).subarray(8, 12); // WebP
         let mime_info = {};
         try {
            // Does not work on local files
            if (byteArr != null) {
               let arrWebp = new Uint8Array(byteArr).subarray(30, 34);
               let animWebp = "";
               for (let i = 0; i < arrWebp.length; i++) {
                  animWebp += arrWebp[i].toString(16);
               }
               if (animWebp === "414e494d") {
                  mime_info["ANIM"] = true;
               } else {
                  mime_info["ANIM"] = false;
               }
            } else {
               mime_info["ANIM"] = false;
            }
         } catch (err) {
            console.log(err);
         }
         type = "image/webp";
         ext = "webp";
         return { type, ext, header, mime_info };
      case "ffd8ffe0":
         type = "image/jpeg";
         ext = "jpg";
         return { type, ext, header };
      case "ffd8ffe1":
         type = "image/jpeg";
         ext = "jpg";
         return { type, ext, header };
      case "ffd8ffe2":
         type = "image/jpeg";
         ext = "jpg";
         return { type, ext, header };
      case "ffd8ffe3":
         type = "image/jpeg";
         ext = "jpg";
         return { type, ext, header };
      case "ffd8ffdb":
         type = "image/jpeg";
         ext = "jpg";
         return { type, ext, header };
      case "ffd8ffee":
         type = "image/jpeg";
         ext = "jpg";
         return { type, ext, header };
      case "0001c":
      case "00020":
      case "00018":
         if (byteArr != null) {
            let arrAvif = new Uint8Array(byteArr).subarray(8, 12);
            let headerAvif = "";
            for (let i = 0; i < arrAvif.length; i++) {
               headerAvif += arrAvif[i].toString(16);
            }
            if (headerAvif === "61766966") {
               type = "image/avif";
               ext = "avif";
            }
         }
         return { type, ext, header };
      case "1a45dfa3":
         type = "video/webm";
         ext = "webm";
         return { type, ext, header };
      case "25504446":
         type = "application/pdf";
         ext = "pdf";
         return { type, ext, header };
   }
   if (header.startsWith("47")) {
      type = "video/ts";
      ext = "ts";
      return { type, ext, header };
   }
   if (header.startsWith("424d")) {
      type = "image/bmp";
      ext = "bmp";
      return { type, ext, header };
   }
   return { type, ext, header, mime_info: false };
}
