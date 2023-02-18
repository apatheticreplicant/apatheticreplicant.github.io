const dogimg = document.getElementById("dogimg");
const spinner = document.getElementById("spinner");
const breedSelect = document.getElementById("pupselect");

async function init() {

	const fetchDogList = await fetch("https://dog.ceo/api/breeds/list/all");
	const fetchDogListJson = await fetchDogList.json();

	let breedOptions = "<option></option>"
	let breedList = Object.keys(fetchDogListJson.message);
	
	for (let i = 0; i < breedList.length; i++) {
		breedOptions += `<option value=${breedList[i]}>${breedList[i]}`;
	}

	breedSelect.innerHTML = breedOptions;



  	const randomDog = await fetch("https://dog.ceo/api/breeds/image/random");
  	const randomDogJson = await randomDog.json();

  	dogimg.src = randomDogJson.message;

	

	breedSelect.addEventListener("change", handleBreedChange);

	dogimg.addEventListener("load", function() {
		dogimg.classList.add("display");
		spinner.classList.remove("display")
	}); 
}

async function handleBreedChange(event) {
	const breed = event.target.value;

	dogimg.classList.remove("display");
	spinner.classList.add("display");


	const dog = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
	const dogJson = await dog.json();
	
	dogimg.src = dogJson.message;
	
}


init();
