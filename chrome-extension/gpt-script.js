window.onload = function () {
	console.log("gpt-script.js ... loaded successfully");

	chrome.runtime.onMessage.addListener(function (
		content,
		sender,
		sendResponse
	) {
		console.log("Received Content :- ", content);

		// asking for answer
		const textarea = document.querySelector("textarea");
		textarea.value = `Response to the most recent email in comprehensive and professional tone\n\nTitle: - ${content.email_title} \n\n ${content.email_content}`;

		const button = textarea.nextElementSibling;
		button.click();

		// when it is finished writing
		const callback = function (mutationList, observer) {
			for (const mutation of mutationList) {
				if (mutation.attributeName === "disabled") {
					if (button.disabled === false) {
						// get last response
						const responses = document.querySelector(
							"#__next > div.overflow-hidden.w-full.h-full.relative > div.flex.h-full.flex-1.flex-col.md\\:pl-\\[260px\\] > main > div.flex-1.overflow-hidden > div > div > div"
						).childNodes;
						const lastResponse = responses[responses.length - 2];
						const response = { reply_msg: lastResponse.innerText };

						// sending back to service worker
						console.log("Send email ans:- \n", response);
						sendResponse(response);
					}
				}
			}
		};

		const observer = new MutationObserver(callback);
		observer.observe(button, { attributes: true });

		return true;
	});
};
