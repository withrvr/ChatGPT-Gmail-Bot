window.onload = function () {
	console.log("gmail-script.js ... Loaded Successfully");

	window.onhashchange = function () {
		if (window.location.hash.startsWith("#inbox/")) {
			console.log("Opened Email:- " + window.location.hash);

			const reply_btn = document.querySelector(".ams.bkH");
			reply_btn.addEventListener("click", function () {
				console.log("Clicked Reply Button !!!");

				const email = document.querySelector(".adn.ads");
				const content = {
					email_content: email.textContent,
					email_id: window.location.hash,
				};

				// send to service worker ... background.js
				(async function () {
					// chrome.runtime.sendMessage(content);
					chrome.runtime.sendMessage(content);
				})();
			});
		}
	};
};
