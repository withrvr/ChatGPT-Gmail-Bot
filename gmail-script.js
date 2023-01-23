window.onload = function () {
	console.log("ChatGPT Gmail Bot .. Loaded Successfully");

	window.onhashchange = function () {
		if (window.location.hash.startsWith("#inbox/")) {
			console.log("Opened Email:- " + window.location.hash);

			const reply_btn = document.querySelector(".ams.bkH");
			reply_btn.addEventListener("click", function () {
				console.log("Clicked Reply Button !!!");

				const email = document.querySelector(".adn.ads");
				console.log(email.textContent);
			});
		}
	};
};
