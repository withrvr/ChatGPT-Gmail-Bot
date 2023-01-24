console.log("I am service Worker, background.js");

chrome.runtime.onMessage.addListener(function (content, sender, sendResponse) {
	console.log("Received in background :- ");
	console.log(content);

	// sending to chatgpt tab
	(async function () {
		const tabs = await chrome.tabs.query({
			url: "https://chat.openai.com/*",
		});

		const tab = tabs[0];
		chrome.tabs.sendMessage(tab.id, content);
	})();
});
