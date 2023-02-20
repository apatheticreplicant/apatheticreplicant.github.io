const dogimg = document.getElementById("dogimg");
const spinner = document.getElementById("spinner");
const breedSelect = document.getElementById("pupselect");
const browseButton = document.getElementById("randomdog");
const nxtBtn = document.getElementById("nextdog");

async function init() {
	// fill list
	const fetchDogList = await fetch("https://dog.ceo/api/breeds/list/all");
	const fetchDogListJson = await fetchDogList.json();

	let breedOptions = "<option disabled selected value>--- CHOOSE YOUR FIGHTER !! ---</option>";
	let breedList = Object.keys(fetchDogListJson.message);

	for (let i = 0; i < breedList.length; i++) {
		breedOptions += `<option value=${breedList[i]}>${breedList[i]}`;
	}

	breedSelect.innerHTML = breedOptions;

	// page start random
	async function pageStart() {
		const randomDogList = await fetch(
			"https://dog.ceo/api/breeds/list/random"
		);
		const randomDogListJson = await randomDogList.json();
		breedSelect.value = randomDogListJson.message;

		let breed = breedSelect.value;
		const dog = await fetch(
			`https://dog.ceo/api/breed/${breed}/images/random`
		);
		const dogJson = await dog.json();

		dogimg.classList.remove("display");
		spinner.classList.add("display");
		dogimg.src = dogJson.message;
	}
	pageStart();

	// load, listen for changes
	breedSelect.addEventListener("change", handleBreedChange);

	dogimg.addEventListener("load", function () {
		dogimg.classList.add("display");
		spinner.classList.remove("display");
	});


	async function handleBreedChange(event) {
		const breed = event.target.value;

		dogimg.classList.remove("display");
		spinner.classList.add("display");

		const dog = await fetch(
			`https://dog.ceo/api/breed/${breed}/images/random`
		);
		const dogJson = await dog.json();

		dogimg.src = dogJson.message;
	}

	// "random" dog button

	browseButton.addEventListener("click", pageStart);

	// "next" dog button, in breed

	nxtBtn.addEventListener("click", handleBreedBrowse);

	async function handleBreedBrowse() {
		const breed = breedSelect.value;

		dogimg.classList.remove("display");
		spinner.classList.add("display");

		const dog = await fetch(
			`https://dog.ceo/api/breed/${breed}/images/random`
		);
		const dogJson = await dog.json();

		dogimg.src = dogJson.message;
	}
}
init();
