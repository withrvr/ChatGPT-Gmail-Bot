window.onload = function () {
	console.log("gmail-script.js ... Loaded Successfully");

	// when email is opened
	window.onhashchange = function () {
		if (window.location.hash.startsWith("#inbox/")) {
			console.log("Opened Email:- " + window.location.hash);

			// click on reply button
			for (const span of document.querySelectorAll("span[role=link]")) {
				// const reply_btn = document.querySelector(".ams.bkH");
				if (span.innerText === "Reply") {
					span.addEventListener("click", function () {
						console.log("Clicked Reply Button !!!");

						const content = {
							email_id: window.location.hash,
							email_title:
								document.querySelector("h2.hP").innerText,
							email_content:
								document.querySelector(".adn.ads").textContent,
						};
						// service worker ... send / receive
						(async function () {
							const gptResponse =
								await chrome.runtime.sendMessage(content);

							const gmailTextBox =
								document.querySelector("[role=textbox]");

							gmailTextBox.innerText = gptResponse.reply_msg;
						})();
					});
				}
			}
		}
	};
};
