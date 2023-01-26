console.log("I am service Worker, background.js");

chrome.runtime.onMessage.addListener(function (content, sender, sendResponse) {
	console.log("Email Received in background :-\n", content);

	// sending to ChatGPT tab
	(async function () {
		const url = "https://chat.openai.com/*";
		const tabs = await chrome.tabs.query({
			url, // url: url,
		});

		if (tabs.length == 0) {
			console.warn(
				"URL: ",
				url,
				" --> Not found is opened tabs --> so data was not forwarded to ChatGPT"
			);
		} else {
			const tab = tabs[0];

			// sending / getting data from gpt
			const gptResponse = await chrome.tabs.sendMessage(tab.id, content);
			sendResponse(gptResponse);

			console.log("Response was :-\n", gptResponse, "\n\n");
		}
	})();

	return true;
});
