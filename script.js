const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable / Enable Button
function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing Joke to the VoiceRSS API
function tellMe(joke) {
	console.log("joke:", joke);
	VoiceRSS.speech({
		key: "0a4823c1c2e7498685419c3fe89897aa",
		src: joke,
		hl: "en-us",
		v: "Linda",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
}

// Get Jokes from Joke API
async function getJokes() {
	let joke = "";
	const apiUrl =
		"https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}

		// Test-to-speech
		tellMe(joke);

		// Disable Button
		toggleButton();
	} catch (error) {
		console.log("Whoops", error);
	}
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
