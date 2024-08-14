(() => {
	const scrollBtn = document.querySelector(".scrollTop");

	window.onscroll = () => {
		scrollBtn.classList.remove("hidden");
	};

	scrollBtn.onclick = () => {
		setTimeout(() => {
			scrollBtn.classList.add("hidden");
		}, 1000);
	};
})();
