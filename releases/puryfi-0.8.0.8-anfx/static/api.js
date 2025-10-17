var tab_api_subscribers = ["https://pury.fi/"];

async function messageApiSubscribers(msg) {
   let tabs = await browser.tabs.query({});

   for (let tab of tabs) {
      let subscriber = tab_api_subscribers.find((url) =>
         tab.url.startsWith(url)
      );
      if (subscriber !== undefined) {
         browser.tabs.sendMessage(tab.id, {
            type: "POST_WINDOW_MESSAGE",
            message: msg,
            target_origin: subscriber,
            version: 2,
         });
      }
   }
}

async function messageOptionsPage(msg) {
   let options_page_url = await browser.runtime.getURL("options/options.html");
   let tabs = await browser.tabs.query({ url: options_page_url });

   for (let tab of tabs) {
      browser.tabs.sendMessage(tab.id, msg);
   }
}
