$("a[content='content-cloud']").click(function () {
   updateRemoteTokenDisplay();
});

$("#remote-stored-tokens").on("click", "#remote-new-token", function () {
   $(this).prop("disabled", true);
   createRemoteToken();
});

$("#remote-stored-tokens").on(
   "click",
   ".remote-token-delete",
   async function () {
      let identifier = $(this).attr("remote_identifier");
      if (
         await createConfirm(`
            ${getI18nStr(
               "on-delete-remote__confirm",
               `<span class="modal__quote-inline">${replaceHtmlEntities(
                  identifier
               )}</span>`
            )}
            <div class="modal__quote warning" style="margin-top:0.5rem">
               -<b> ${getI18nStr("on-non-reversible-action-warning")}</b>
            </div>
         `)
      ) {
         identifier = identifier.replace("puryfi-remote:", "");
         deleteRemoteToken(identifier);
      }
   }
);

function resetRemoteConfiguration(res) {
   return new Promise((resolve, reject) => {
      res.remote_configuration.lock = false;
      res.remote_configuration.error = null;
      res.remote_configuration.send_statistics_data = false;
      res.remote_configuration.remote_token_identifier = null;
      res.remote_configuration.last_updated = null;
      res.remote_configuration.last_checked = null;
      res.remote_configuration.subscriber_username = null;
      res.remote_configuration.subscription_id = null;
      browser.storage.sync
         .set({
            remote_configuration: res.remote_configuration,
         })
         .then(() => {
            updateRemoteSubscription()
               .then(() => {
                  resolve();
                  if (
                     res.lock_configuration.enabled &&
                     res.lock_configuration.remote_lock
                  ) {
                     unlockExtension();
                  }
               })
               .catch((e) => {
                  console.log(e);
               });
         })
         .catch((e) => {
            console.log(e);
         });
   });
}

function createRemoteToken() {
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      if (res.user == null) {
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/remote_control/new_token";
      let params =
         "username=" +
         encodeURIComponent(res.user.username) +
         "&password=" +
         encodeURIComponent(res.user.password);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               if (data) {
                  // TODO: localize
                  if (data.hasOwnProperty("error")) {
                     createAlert(`<div class="modal__quote danger">
                     -<b> ${replaceHtmlEntities(data.error)}.</b>
                     </div>`);
                  } else {
                     updateRemoteTokenDisplay();
                  }
               }
               reEnableRemoteCreate();
            } catch (e) {
               log(e);
               reEnableRemoteCreate();
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         log(e);
         reEnableRemoteCreate();
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

function reEnableRemoteCreate() {
   setTimeout(() => {
      $("#remote-new-token").prop("disabled", false);
   }, 1000);
}

function updateRemoteTokenDisplay() {
   let elem = $("#remote-new-token-tr");
   let tbody = $("#remote-stored-tokens").find("tbody");
   tbody.empty();
   tbody.append(elem);
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      if (res.user == null) {
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/remote_control/info";
      let params =
         "username=" +
         encodeURIComponent(res.user.username) +
         "&password=" +
         encodeURIComponent(res.user.password);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               if (data) {
                  // TODO: localize
                  if (data.hasOwnProperty("error")) {
                     createAlert(`<div class="modal__quote danger">
                     -<b> ${replaceHtmlEntities(data.error)}.</b>
                     </div>`);
                  } else {
                     $("#remote-token-current").html(data.info.storage_current);
                     $("#remote-token-max").html(data.info.storage_max);
                     data["token"].forEach(function (settings_entry, index) {
                        $("#remote-stored-tokens")
                           .find("tbody")
                           .prepend(
                              $("<tr>")
                                 .append(
                                    $(
                                       '<td class="remote-token-copy" style="position:relative;"></td>'
                                    )
                                       .text(
                                          "puryfi-remote:" +
                                             settings_entry.identifier
                                       )
                                       .append(
                                          $(
                                             '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" style="cursor:pointer;margin-left:2px;"><path d="M4 7H2V21C2 22.1 2.9 23 4 23H18V21H4M20 3H16.8C16.4 1.8 15.3 1 14 1C12.7 1 11.6 1.8 11.2 3H8C6.9 3 6 3.9 6 5V17C6 18.1 6.9 19 8 19H20C21.1 19 22 18.1 22 17V5C22 3.9 21.1 3 20 3M14 3C14.6 3 15 3.5 15 4C15 4.5 14.5 5 14 5C13.5 5 13 4.5 13 4C13 3.5 13.4 3 14 3Z" fill="currentColor"/></svg>'
                                          )
                                       )
                                 )
                                 .append(
                                    $('<td style="display: flex;">').append(
                                       $(
                                          '<input remote_identifier="' +
                                             settings_entry.identifier +
                                             '" type="text" value="' +
                                             (settings_entry.cloud_settings !=
                                             null
                                                ? "puryfi-settings:" +
                                                  settings_entry.cloud_settings
                                                : "") +
                                             '" class="cloud-setting-remote-input" data-select-on-focus placeholder="Cloud Settings ID">'
                                       )
                                    )
                                 )
                                 .append(
                                    $("<td>")
                                       .text(settings_entry.users)
                                       .append(
                                          $(
                                             '<i remote_identifier="' +
                                                settings_entry.identifier +
                                                '" class="remote-user-info fas fa-users" style="margin-left: 5px;"></i>'
                                          )
                                       )
                                 )
                                 .append(
                                    $("<td>").append(
                                       $(
                                          '<button remote_identifier="' +
                                             settings_entry.identifier +
                                             '" class="icon-btn remote-token-delete">'
                                       ).append(
                                          $('<i class="fa fa-trash"></i>')
                                       )
                                    )
                                 )
                           );
                     });
                  }
               }
               reEnableCloudUpload();
            } catch (e) {
               log(e);
               reEnableCloudUpload();
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         log(e);
         reEnableCloudUpload();
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

function deleteRemoteToken(identifier) {
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      if (res.user == null) {
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/remote_control/delete_token";
      let params =
         "username=" +
         encodeURIComponent(res.user.username) +
         "&password=" +
         encodeURIComponent(res.user.password);
      params += "&identifier=" + encodeURIComponent(identifier);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               updateRemoteTokenDisplay();
            } catch (e) {
               updateRemoteTokenDisplay();
               log(e);
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         updateRemoteTokenDisplay();
         log(e);
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

function bindCloudSettingsToToken(token_identifier, cloud_identifier) {
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      if (res.user == null) {
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/remote_control/bind";
      let params =
         "username=" +
         encodeURIComponent(res.user.username) +
         "&password=" +
         encodeURIComponent(res.user.password);
      params += "&identifier=" + encodeURIComponent(token_identifier);
      params += "&cloud_settings=" + encodeURIComponent(cloud_identifier);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               if (data) {
                  // TODO: localize
                  if (data.hasOwnProperty("error")) {
                     createAlert(`<div class="modal__quote danger">
                     -<b> ${replaceHtmlEntities(data.error)}.</b>
                     </div>`);
                  }
                  createNotification(
                     getI18nStr(
                        "on-bind-settings-to-remote__success",
                        `<span class="notification__quote-inline">${replaceHtmlEntities(
                           cloud_identifier
                        )}</span>`
                     ),
                     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" fill="currentColor"/></svg>`,
                     "success"
                  );
                  updateRemoteTokenDisplay();
               }
            } catch (e) {
               log(e);
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         log(e);
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

function updateRemoteSubscription() {
   return new Promise((resolve, reject) => {
      let sync = browser.storage.sync.get([
         "remote_configuration",
         "lock_configuration",
         "user",
      ]);
      sync.then((res) => {
         if (res.remote_configuration.remote_token_identifier == null) {
            $("#remote-settings-identifier").val("");
            $("#remote-settings-subscribe").show();
            $("#locked-remote-subscription-msg").hide();
            $("#remote-settings-unsubscribe").hide().removeClass("locked");
            $("label[for='remote-lock']").removeClass("disabled");
            $(".unsubscribe-remote-patreon").hide();
            $("#remote-timestamps").hide();
            if (!res.lock_configuration.enabled) {
               $("#remote-settings-identifier").prop("disabled", false);
            }
            if (res.lock_configuration.enabled) {
               $("#remote-settings").hide();
            }
            if (res.remote_configuration.lock) {
               $("#remote-settings-subscribe").prop("disabled", true);
            }
            $("#remote-lock")
               .prop("checked", res.remote_configuration.lock)
               .prop("disabled", false);
            $("#remote-allow-old-settings")
               .prop("checked", res.remote_configuration.allow_older_settings)
               .prop("disabled", false);
            $("#remote-statistic").prop("disabled", false);
         } else {
            $("#remote-lock")
               .prop("checked", res.remote_configuration.lock)
               .prop("disabled", true);
            $("#remote-allow-old-settings")
               .prop("checked", res.remote_configuration.allow_older_settings)
               .prop("disabled", true);
            $("#remote-settings-identifier").val(
               "puryfi-remote:" +
                  res.remote_configuration.remote_token_identifier
            );
            $("#remote-settings-identifier").prop("disabled", true);
            $("#remote-last-updated").html(
               new Date(res.remote_configuration.last_updated).toLocaleString()
            );
            $("#remote-last-checked").html(
               new Date(res.remote_configuration.last_checked).toLocaleString()
            );
            $("#remote-timestamps").show();
            $("label[for='remote-lock']").addClass("disabled");
            if (res.remote_configuration.lock) {
               $("#remote-statistic").prop("disabled", true);
               $(".remote-check-period").prop("disabled", true);
               $("#remote-check-periodic-minutes").prop("disabled", true);
               $("#remote-settings-subscribe").hide();
               $("#locked-remote-subscription-msg").show();
               $("#remote-settings-unsubscribe").hide().addClass("locked");
               $(".unsubscribe-remote-patreon").show();
            } else {
               $("#remote-statistic").prop("disabled", false);
               $(".remote-check-period").prop("disabled", false);
               $("#remote-check-periodic-minutes").prop("disabled", false);
               $("#remote-settings-subscribe").hide();
               $("#locked-remote-subscription-msg").hide();
               $("#remote-settings-unsubscribe").show().removeClass("locked");
               $(".unsubscribe-remote-patreon").hide();
            }
            if (res.remote_configuration.send_statistics_data) {
               $("#remote-statistic").prop("checked", true);
            }
         }

         if (res.remote_configuration.error) {
            remoteCheckOnError(
               res.remote_configuration,
               res.remote_configuration.error
            );
         } else {
            $("#remote-error-name").html();
            $("#remote-error").hide();
         }
         resolve();
      });
   });
}

function subscribeToRemoteControl(
   res,
   remote_identifier,
   lock,
   send_statistic,
   allow_older_settings,
   check_period
) {
   browser.storage.sync.get(["user"]).then(({ user }) => {
      registerRemoteSubscription(
         user,
         remote_identifier,
         lock,
         send_statistic,
         allow_older_settings
      )
         .then((data) => {
            res.remote_configuration.lock = lock;
            res.remote_configuration.error = null;
            res.remote_configuration.send_statistics_data = send_statistic;
            res.remote_configuration.remote_token_identifier =
               remote_identifier;
            res.remote_configuration.allow_older_settings =
               allow_older_settings;
            res.remote_configuration.check_period = check_period;
            res.remote_configuration.subscriber_username = user.username;
            res.remote_configuration.subscription_id = data.subscription_id;
            browser.storage.sync
               .set({
                  remote_configuration: res.remote_configuration,
               })
               .then(() => {
                  updateRemoteSubscription()
                     .then(() => {
                        loadRemoteSettings(
                           res.remote_configuration.allow_older_settings,
                           false,
                           true
                        );
                     })
                     .catch((e) => {
                        console.log(e);
                     });
               });
         })
         .catch((e) => {
            // TODO: localize
            createAlert(`<div class="modal__quote danger">
            -<b> ${replaceHtmlEntities(e)}.</b>
            </div>`);
         });
   });
}

function unsubscribeToRemoteControl(res, ignore_error = false) {
   cancelRemoteSubscription(res.remote_configuration.remote_token_identifier)
      .then((data) => {
         resetRemoteConfiguration(res)
            .then(() => {})
            .catch((e) => {
               console.log(e);
            });
      })
      .catch(async (e) => {
         if (e === "UNKNOWN_TOKEN" || e === "INVALIDATED") {
            resetRemoteConfiguration(res)
               .then(() => {})
               .catch((e) => {
                  console.log(e);
               });
         } else if (
            ignore_error ||
            (await createConfirm(`
               <div class="modal__quote danger" style="margin-bottom:0.5rem">
                  -<b> ${replaceHtmlEntities(e)}.</b>
               </div>
               ${getI18nStr("on-unsubscribe-from-remote__error")}
            `))
         ) {
            resetRemoteConfiguration(res)
               .then(() => {})
               .catch((e) => {
                  console.log(e);
               });
         }
      })
      .finally(() => {});
}

function registerRemoteSubscription(
   user,
   identifier,
   lock,
   send_statistic,
   allow_older_settings
) {
   return new Promise((resolve, reject) => {
      if (user == null) {
         reject("No user data");
         return;
      }

      let url = "https://pury.fi/site/wp-json/remote_control/subscribe";
      let params = new URLSearchParams({
         username: user.username,
         password: user.password,
         identifier: identifier,
         lock: lock ? 1 : 0,
         allow_older_settings: allow_older_settings ? 1 : 0,
      });

      fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
         body: params.toString(),
      })
         .then((response) => {
            if (response.ok) {
               return response.json();
            } else {
               throw new Error("Network response was not ok.");
            }
         })
         .then((data) => {
            if (data.hasOwnProperty("error")) {
               reject(data.error);
            } else {
               resolve(data);
            }
         })
         .catch((error) => {
            reject(error);
         });
   });
}

function cancelRemoteSubscription(identifier) {
   return new Promise((resolve, reject) => {
      let sync = browser.storage.sync.get(["user"]);
      sync.then((res) => {
         if (res.user == null) {
            reject("No user data");
            return;
         }
         let xmlhttp = new XMLHttpRequest();
         let url = "https://pury.fi/site/wp-json/remote_control/unsubscribe";
         let params =
            "username=" +
            encodeURIComponent(res.user.username) +
            "&password=" +
            encodeURIComponent(res.user.password);
         params += "&identifier=" + encodeURIComponent(identifier);
         xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               try {
                  let data = JSON.parse(this.responseText);
                  if (data) {
                     if (data.hasOwnProperty("error")) {
                        reject(data.error);
                     } else {
                        resolve(data);
                     }
                  }
               } catch (e) {
                  reject(e);
               }
            }
         };
         xmlhttp.ontimeout = function (e) {
            reject(e);
         };
         xmlhttp.open("POST", url, true);
         xmlhttp.timeout = 1000;
         xmlhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
         );
         xmlhttp.send(params);
      });
   });
}

function cancelRemoteUserSubscription(identifier, user_id) {
   return new Promise((resolve, reject) => {
      let sync = browser.storage.sync.get(["user"]);
      sync.then((res) => {
         if (res.user == null) {
            reject("No user data");
            return;
         }
         let xmlhttp = new XMLHttpRequest();
         let url =
            "https://pury.fi/site/wp-json/remote_control/unsubscribe_user";
         let params =
            "username=" +
            encodeURIComponent(res.user.username) +
            "&password=" +
            encodeURIComponent(res.user.password);
         params += "&identifier=" + encodeURIComponent(identifier);
         params += "&user_id=" + encodeURIComponent(user_id);
         xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               try {
                  let data = JSON.parse(this.responseText);
                  if (data) {
                     if (data.hasOwnProperty("error")) {
                        reject(data.error);
                     } else {
                        resolve(data);
                     }
                  }
               } catch (e) {
                  reject(e);
               }
            }
         };
         xmlhttp.ontimeout = function (e) {
            reject(e);
         };
         xmlhttp.open("POST", url, true);
         xmlhttp.timeout = 1000;
         xmlhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
         );
         xmlhttp.send(params);
      });
   });
}

$("#reload-remote-settings").click(
   throttle(
      function () {
         if (!remote_configuration.remote_token_identifier) return;
         loadRemoteSettings(true, true);
         $(this).toggleClass("disabled", true);
         let wait_remaining = 5;
         $("#reload-remote-settings__wait").text(`${wait_remaining}s`).show();
         setInterval(() => {
            wait_remaining--;
            if (wait_remaining > 0) {
               $("#reload-remote-settings__wait").text(`${wait_remaining}s`);
            }
         }, 1000);
      },
      5000,
      function () {
         $(this).toggleClass("disabled", false);
         $("#reload-remote-settings__wait").text("").hide();
      }
   )
);

function loadRemoteSettings(
   allow_older_settings = false,
   manual = false,
   is_first_load = false
) {
   let sync = browser.storage.sync.get([
      "remote_configuration",
      "lock_configuration",
      "user",
   ]);
   sync.then((res) => {
      if (res.remote_configuration.remote_token_identifier != null) {
         let remote_identifier =
            res.remote_configuration.remote_token_identifier;
         checkRemoteSettings(res.user, remote_identifier)
            .then(async (data) => {
               let last_updated = new Date(
                  data.last_updated + " GMT+00:00"
               ).getTime();
               let last_checked = res.remote_configuration.last_checked ?? 0;
               if (data.identifier == null) {
                  res.remote_configuration.error = "NO_SETTINGS";
                  remoteCheckOnError(res.remote_configuration, "NO_SETTINGS");
               } else {
                  res.remote_configuration.error = null;

                  if (last_checked > last_updated || !manual) {
                     createNotification(
                        getI18nStr("on-update-remote-subscription__success"),
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.5 18.5C11.5 17.4 11.8 16.4 12.2 15.5H12C10.1 15.5 8.5 13.9 8.5 12S10.1 8.5 12 8.5 15.5 10.1 15.5 12C15.5 12.2 15.5 12.4 15.4 12.5C16.2 12.2 17 12 18 12C18.5 12 19 12.1 19.5 12.2V12C19.5 11.7 19.5 11.3 19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11C4.6 11.3 4.5 11.7 4.5 12S4.5 12.7 4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C11.9 21 11.5 19.8 11.5 18.5M18 14.5V13L15.8 15.2L18 17.4V16C19.4 16 20.5 17.1 20.5 18.5C20.5 18.9 20.4 19.3 20.2 19.6L21.3 20.7C22.5 18.9 22 16.4 20.2 15.2C19.6 14.7 18.8 14.5 18 14.5M18 21C16.6 21 15.5 19.9 15.5 18.5C15.5 18.1 15.6 17.7 15.8 17.4L14.7 16.3C13.5 18.1 14 20.6 15.8 21.8C16.5 22.2 17.2 22.5 18 22.5V24L20.2 21.8L18 19.5V21Z" fill="currentColor"/></svg>',
                        "success"
                     );
                  } else {
                     createNotification(
                        getI18nStr("on-update-remote-subscription__success") +
                           getI18nStr(
                              "on-update-remote-subscription__new-remote-settings-alert"
                           ),
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.5 18.5C11.5 17.4 11.8 16.4 12.2 15.5H12C10.1 15.5 8.5 13.9 8.5 12S10.1 8.5 12 8.5 15.5 10.1 15.5 12C15.5 12.2 15.5 12.4 15.4 12.5C16.2 12.2 17 12 18 12C18.5 12 19 12.1 19.5 12.2V12C19.5 11.7 19.5 11.3 19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11C4.6 11.3 4.5 11.7 4.5 12S4.5 12.7 4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C11.9 21 11.5 19.8 11.5 18.5M18 14.5V13L15.8 15.2L18 17.4V16C19.4 16 20.5 17.1 20.5 18.5C20.5 18.9 20.4 19.3 20.2 19.6L21.3 20.7C22.5 18.9 22 16.4 20.2 15.2C19.6 14.7 18.8 14.5 18 14.5M18 21C16.6 21 15.5 19.9 15.5 18.5C15.5 18.1 15.6 17.7 15.8 17.4L14.7 16.3C13.5 18.1 14 20.6 15.8 21.8C16.5 22.2 17.2 22.5 18 22.5V24L20.2 21.8L18 19.5V21Z" fill="currentColor"/></svg>',
                        "success"
                     );
                  }

                  res.remote_configuration.last_updated = last_checked;
                  if (!res.remote_configuration.last_updated) {
                     res.remote_configuration.last_updated = Date.now();
                  }
                  // settings might have been changed
                  importCloudSettings(
                     data.identifier,
                     true,
                     true,
                     allow_older_settings,
                     is_first_load
                  );
               }

               last_checked = Date.now();
               res.remote_configuration.last_checked = last_checked;
               browser.storage.sync.set({
                  remote_configuration: res.remote_configuration,
               });
            })
            .catch((e) => {
               remoteCheckOnError(res.remote_configuration, e);
            });
      }
   });
}

function checkRemoteSettings(user, remote_identifier) {
   return new Promise((resolve, reject) => {
      if (user == null) {
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/remote_control/settings_info";
      let params =
         "username=" +
         encodeURIComponent(user.username) +
         "&password=" +
         encodeURIComponent(user.password);
      params += "&identifier=" + encodeURIComponent(remote_identifier);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               if (data) {
                  if (data.hasOwnProperty("error")) {
                     reject(data.error);
                     return;
                  } else {
                     resolve(data);
                  }
               }
            } catch (e) {
               reject(e);
               return;
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         reject(e);
         return;
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

function checkRemoteSubscription(remote_configuration, user) {
   //Checks if token and membership exist
   return new Promise((resolve, reject) => {
      if (user == null) {
         reject("No user data");
         return;
      }

      let url = "https://pury.fi/site/wp-json/remote_control/subscription_info";
      let params = new URLSearchParams({
         username: user.username,
         password: user.password,
         identifier: remote_configuration.remote_token_identifier,
      });

      fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
         body: params.toString(),
         timeout: 1000,
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("HTTP error " + response.status);
            }
            return response.json();
         })
         .then((data) => {
            if (data.hasOwnProperty("error")) {
               throw new Error(data.error);
            }
            // todo: check version and generate error if mismatch
            return data;
         })
         .then((data) => resolve(data))
         .catch((error) => reject(error.message));
   });
}

function remoteCheckOnData(res, data) {
   if (data.identifier === null) {
      res.remote_configuration.error = "NO_SETTINGS";
      remoteCheckOnError(res.remote_configuration, "NO_SETTINGS");
   } else if (
      res.remote_configuration.remote_token_identifier !== data.remote_token
   ) {
      let send_statistic = $("#remote-statistic").is(":checked");
      let check_period =
         Math.min(
            10080,
            Math.max(1, $("#remote-check-periodic-minutes").val())
         ) * 60000;
      res.remote_configuration.lock = data.lock == 1;
      res.remote_configuration.send_statistics_data = send_statistic;
      res.remote_configuration.remote_token_identifier = data.remote_token;
      res.remote_configuration.allow_older_settings =
         data.allow_older_settings == 1;
      res.remote_configuration.check_period = check_period;
      res.remote_configuration.subscription_id = data.subscription_id;
      browser.storage.sync
         .set({
            remote_configuration: res.remote_configuration,
         })
         .then(() => {
            updateRemoteSubscription()
               .then(() => {
                  loadRemoteSettings(true, false, true);
               })
               .catch((e) => {
                  console.log(e);
               });
         });
   }
}

function remoteConfirmText(lock, send_statistic) {
   let t = "Attention:\n" + "• Your current settings will be overwritten!\n";
   if (lock) {
      t += "• Your remote subscription will be LOCKED!\n";
   }
   if (send_statistic) {
      t += "• You will send your statistic data!\n";
   }
   return t;
}

function remoteCheckOnError(remote_configuration, error) {
   if (remote_configuration.remote_token_identifier != null) {
      if (error === "INVALIDATED" || error === "UNKNOWN_TOKEN") {
         $("#remote-error-name").html(
            "Your remote subscription was terminated remotely!"
         );
         $("#remote-timestamps").hide();
         $("#remote-error").show();
         let remote_error_fix = $("#remote-error-fix");
         let remote_error_clear = $("#remote-error-clear");
         remote_error_fix.unbind("click");
         remote_error_clear.unbind("click");
         remote_error_fix.html("Unsubscribe Locally");
         remote_error_fix.show();
         remote_error_clear.hide();
         remote_error_fix.click(function () {
            let sync = browser.storage.sync.get([
               "remote_configuration",
               "lock_configuration",
               "user",
            ]);
            sync.then((res) => {
               unsubscribeToRemoteControl(res, true);
            });
         });
      } else if (error === "NO_SETTINGS") {
         $("#remote-error-name").html(
            "No settings are bound to your subscribed remote!"
         );
         $("#remote-timestamps").hide();
         $("#remote-error").show();
         let remote_error_fix = $("#remote-error-fix");
         let remote_error_clear = $("#remote-error-clear");
         remote_error_fix.unbind("click");
         remote_error_clear.unbind("click");
         remote_error_fix.hide();
         remote_error_clear.hide();
      } else {
         console.log(error);
      }
   }
   log(error);
}

function getRemoteSubscriberData(remote_identifier, user) {
   return new Promise((resolve, reject) => {
      if (user == null) {
         reject("No user data");
         return;
      }
      let xmlhttp = new XMLHttpRequest();
      let url = "https://pury.fi/site/wp-json/remote_control/subscriber_info";
      let params =
         "username=" +
         encodeURIComponent(user.username) +
         "&password=" +
         encodeURIComponent(user.password);
      params += "&identifier=" + encodeURIComponent(remote_identifier);
      xmlhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            try {
               let data = JSON.parse(this.responseText);
               if (data) {
                  if (data.hasOwnProperty("error")) {
                     reject(data.error);
                     return;
                  } else {
                     resolve(data);
                  }
               }
            } catch (e) {
               reject(e);
               return;
            }
         }
      };
      xmlhttp.ontimeout = function (e) {
         reject(e);
         return;
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.timeout = 1000;
      xmlhttp.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
      );
      xmlhttp.send(params);
   });
}

let checkRemoteSubscriptionTimestamp = performance.now();

// TODO: have the bg script instead check for this periodically, maybe every 30s or so
$("#menu-entry-settings").click(function (e) {
   if (e.originalEvent !== undefined) {
      if (performance.now() - checkRemoteSubscriptionTimestamp < 2000) {
         return;
      }
   }
   let sync = browser.storage.sync.get([
      "remote_configuration",
      "lock_configuration",
      "user",
   ]);
   sync.then((res) => {
      if (res.user != null) {
         checkRemoteSubscription(res.remote_configuration, res.user)
            .then((data) => {
               remoteCheckOnData(res, data);
            })
            .catch((e) => {
               remoteCheckOnError(res.remote_configuration, e);
            })
            .finally(() => {
               checkRemoteSubscriptionTimestamp = performance.now();
            });
      }
   });
});

$("#remote-lock").on("change", async function () {
   if ($(this).is(":checked")) {
      if (
         // TODO: make "discord server" a link
         !(await createConfirm(
            `<div class="modal__quote warning" style="margin-bottom:0.5rem">
               -<b> ${getI18nStr(
                  "on-enable-lock-remote-subscription__not-easily-reversable-warning"
               )}</b>
            </div>
            ${getI18nStr("on-enable-lock-remote-subscription__confirm")}
            `
         ))
      ) {
         $(this).prop("checked", false);
      }
   }
});

$("#remote-settings-subscribe").click(function () {
   let remote_identifier = $("#remote-settings-identifier").val();
   if (!remote_identifier) {
      return;
   }
   let sync = browser.storage.sync.get([
      "remote_configuration",
      "lock_configuration",
   ]);
   sync.then(async (res) => {
      if (
         (res.remote_configuration.remote_token_identifier === null ||
            !res.remote_configuration.lock) &&
         !res.lock_configuration.enabled
      ) {
         remote_identifier = remote_identifier.replace("puryfi-remote:", "");
         let lock = $("#remote-lock").is(":checked");
         let send_statistic = $("#remote-statistic").is(":checked");
         let allow_older_settings = $("#remote-allow-old-settings").is(
            ":checked"
         );
         let check_period =
            Math.min(
               10080,
               Math.max(1, $("#remote-check-periodic-minutes").val())
            ) * 60000;
         let t = remoteConfirmText(lock, send_statistic);
         if (
            await createConfirm(
               `${getI18nStr(
                  "on-subscribe-to-remote__confirm",
                  `<span class="modal__quote-inline">${replaceHtmlEntities(
                     remote_identifier
                  )}</span>`
               )}
               ${
                  lock
                     ? `<div class="modal__quote warning" style="margin-top:0.5rem">
                        -<b> ${getI18nStr(
                           "on-subscribe-to-remote__lock-subscription-warning"
                        )}</b>
                     </div>`
                     : ""
               }`
            )
         ) {
            subscribeToRemoteControl(
               res,
               remote_identifier,
               lock,
               send_statistic,
               allow_older_settings,
               check_period
            );
         }
      }
   });
});

$("#remote-settings-unsubscribe, #remote-settings-unsubscribe-patreon").click(
   function () {
      let sync = browser.storage.sync.get([
         "remote_configuration",
         "lock_configuration",
         "user",
      ]);
      sync.then((res) => {
         if (
            !res.remote_configuration.lock ||
            (res.user != null &&
               res.user.permissions.permission_unsubscribe_remote <=
                  res.user.patreon_tier)
         ) {
            unsubscribeToRemoteControl(res);
         }
      });
   }
);

$("#remote-stored-tokens").on("click", ".remote-token-copy", function (e) {
   navigator.clipboard.writeText($(this).text());
   createClipboardCopyNotification($(this), "+0");
});

$("#refresh-remote-settings").click(function () {
   updateRemoteTokenDisplay();
});

function bindSettingsToRemote() {}

$("#remote-stored-tokens").on(
   "change",
   ".cloud-setting-remote-input",
   function () {
      let token_identifier = $(this).attr("remote_identifier");
      token_identifier = token_identifier.replace("puryfi-remote:", "");
      let cloud_identifier = $(
         'input[remote_identifier="' + token_identifier + '"]'
      ).val();
      cloud_identifier = cloud_identifier.replace("puryfi-settings:", "");
      bindCloudSettingsToToken(token_identifier, cloud_identifier);
   }
);

$("#remote-stored-tokens").on("click", ".remote-user-info", function () {
   let token_identifier = $(this).attr("remote_identifier");
   let sync = browser.storage.sync.get(["user"]);
   sync.then((res) => {
      showRemoteUsersModal(token_identifier, res.user);
   });
});

function showRemoteUsersModal(token_identifier, user) {
   getRemoteSubscriberData(token_identifier, user)
      .then((data) => {
         let tbody = $("#remote-users-modal-table").find("tbody");
         tbody.empty();
         data.forEach(function (user_entry, index) {
            tbody.prepend(
               $("<tr>")
                  .append($("<td>").append(user_entry.name))
                  .append(
                     $("<td>").append(
                        new Date(user_entry.timestamp).toLocaleString()
                     )
                  )
                  .append(
                     $("<td>").append(
                        $(
                           '<button remote_identifier="' +
                              token_identifier +
                              '" user_identifier="' +
                              user_entry.uid +
                              '" class="icon-btn remote-subscriber-info" style="color: gray;width: 22px;" disabled>'
                        ).append($('<i class="fa fa-info"></i>'))
                     )
                  )
                  .append(
                     $("<td>").append(
                        $(
                           '<button remote_identifier="' +
                              token_identifier +
                              '" username="' +
                              user_entry.name +
                              '" user_identifier="' +
                              user_entry.uid +
                              '" class="icon-btn remote-subscriber-kick" style="width: 22px;">'
                        ).append($('<i class="fa fa-user-slash"></i>'))
                     )
                  )
            );
         });
         showModalWindow("#remote-users-modal");
      })
      .catch((e) => {
         console.log(e);
      });
}

$("#remote-users-modal-close").click(function () {
   hideModalWindow("#remote-users-modal");
});

$("#remote-users-modal-table").on(
   "click",
   ".remote-subscriber-kick",
   async function () {
      let user_identifier = $(this).attr("user_identifier");
      let remote_identifier = $(this).attr("remote_identifier");
      let username = $(this).attr("username");
      if (
         await createConfirm(
            `${getI18nStr(
               "on-unsubscribe-other-from-remote__confirm",
               `<span class="modal__quote-inline">${replaceHtmlEntities(
                  username
               )}</span>`
            )}.`
         )
      ) {
         cancelRemoteUserSubscription(remote_identifier, user_identifier)
            .then((data) => {
               let sync = browser.storage.sync.get(["user"]);
               sync.then((res) => {
                  updateRemoteTokenDisplay();
                  showRemoteUsersModal(remote_identifier, res.user);
               });
            })
            .catch((e) => {
               console.log(e);
            });
      }
   }
);

$(".remote-check-period").change(function () {
   let n = $(this).val();
   let sync = browser.storage.sync.get(["remote_configuration"]);
   sync.then((res) => {
      if (!res.remote_configuration.lock) {
         res.remote_configuration.check_mode = parseInt(n);
         browser.storage.sync.set({
            remote_configuration: res.remote_configuration,
         });
      }
   });
});

document.addEventListener("dragstart", function (event) {
   let draggedElement = event.target;
   if ($(draggedElement).hasClass("cloud-settings-draggable")) {
      let elem = $("input[remote_identifier]");
      if (!elem.hasClass("class-name")) {
         elem.addClass("cloud-settings-drop-point");
         $(draggedElement).addClass("cloud-settings-dragged");
      }
   }
});

document.addEventListener("dragend", function (event) {
   let draggedElement = event.target;
   if ($(draggedElement).hasClass("cloud-settings-draggable")) {
      let elem = $("input[remote_identifier]");
      elem.removeClass("cloud-settings-drop-point");
      $(draggedElement).removeClass("cloud-settings-dragged");
      let x = event.clientX;
      let y = event.clientY;
      let droppedElement = document.elementFromPoint(x, y);
      if ($(droppedElement).attr("remote_identifier")) {
         let cloud_identifier = $(draggedElement).html();
         cloud_identifier = cloud_identifier.replace("puryfi-settings:", "");
         let token_identifier = $(droppedElement).attr("remote_identifier");
         token_identifier = token_identifier.replace("puryfi-remote:", "");
         bindCloudSettingsToToken(token_identifier, cloud_identifier);
      }
   }
});
