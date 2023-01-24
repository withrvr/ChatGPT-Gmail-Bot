window.onload = function () {
	console.log("gpt-script.js ... loaded successfully");

	chrome.runtime.onMessage.addListener(function (
		content,
		sender,
		sendResponse
	) {
		console.log("Received Content :- ");
		console.log(content);
	});
};
