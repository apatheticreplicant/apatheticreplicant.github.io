const wormBox = document.querySelector('.worm-box')
let score = 0;


// time intervals
function sadInterval() {
	return Date.now() + 1000;
}

function goneInterval() {
	return Date.now() + Math.floor(Math.random() * 18000) + 2000; 
}

function hungryInterval() {
	return Date.now() + Math.floor(Math.random() * 2500);
}

function crownStatus() {
	return Math.random() > 0.95;
}

// mole metadata


const moles = [

	{
		status: "sad",
		next: sadInterval(),
		king: false,
		node: document.getElementById('hole-0')
	},
	{
		status: "sad",
		next: sadInterval(),
		king: false,
		node: document.getElementById('hole-1')
	},
	{
		status: "sad",
		next: sadInterval(),
		king: false,
		node: document.getElementById('hole-2')
	},
	{
		status: "sad",
		next: sadInterval(),
		king: false,
		node: document.getElementById('hole-3')
	},
	{
		status: "sad",
		next: sadInterval(),
		king: false,
		node: document.getElementById('hole-4')
	},
	{
		status: "sad",
		next: sadInterval(),
		king: false,
		node: document.getElementById('hole-5')
	},
];

function getNextStatus (mole) {
	switch (mole.status) {
		case "sad":
		case "fed":
			mole.next = sadInterval();
			mole.status = "leaving";
			if (mole.king) {
				mole.node.children[0].src = "images/king-mole-leaving.png";
			} else {
				mole.node.children[0].src = 'images/mole-leaving.png';
			}
			break;
		case "leaving":
			mole.next = goneInterval();
			mole.status = "gone";
			mole.node.children[0].classList.add('gone');
			break;
		case "gone": 
			mole.status = "hungry";
			mole.king = crownStatus();
			mole.next = hungryInterval();
			mole.node.children[0].classList.add('hungry');
			mole.node.children[0].classList.remove('gone');
			if (mole.king) {
				mole.node.children[0].src ='images/king-mole-hungry.png';		
			} else { 
				mole.node.children[0].src ='images/mole-hungry.png'; 
			}
			break;
		case "hungry": 
			mole.status = "sad"
			mole.next = sadInterval();
			mole.node.children[0].classList.remove('hungry');
			if (mole.king) {
				mole.node.children[0].src="images/king-mole-sad.png"
			} else {
				mole.node.children[0].src ='images/mole-sad.png';
			}
			break;
	}
}

function feed(event) {
	if (event.target.tagName !== 'IMG' || !event.target.classList.contains("hungry")) {
		return;
	}
	
	const mole = moles[parseInt(event.target.dataset.index)]

	mole.status = "fed";
	mole.next = sadInterval();
	if (mole.king) {
		score += 19;
		mole.node.children[0].src = 'images/king-mole-fed.png';
		new Audio('https://files.catbox.moe/0tdeh0.mp3').play();
	} else {
		mole.node.children[0].src = 'images/mole-fed.png';
		score += 9;
		new Audio('https://files.catbox.moe/svtwyf.mp3').play();
	}
	mole.node.children[0].classList.remove('hungry');
	
	score++;
	if (score >= 100) {
		win();
	}
	wormBox.style.width = `${score}%`;
	document.getElementById('scorecounter').innerHTML = `score: ${score}`;
}


//win function
function win() {
	document.querySelector('.screen').classList.add("gone");
	document.querySelector('.win').classList.remove("gone");
	setTimeout(winDL, 5000);
}
function winDL() {
	document.querySelector('.replay').classList.remove("gone")
}
// frames
let runAgain = Date.now() + 100;
function nextFrame() {
	const now = Date.now()
	
	if (runAgain <= now) {
	for(let i = 0; i < moles.length; i++) {
		if (moles[i].next <= now) {
			getNextStatus(moles[i]);
		}	
	}
	}
	requestAnimationFrame(nextFrame);
}

// kill moles

document.querySelector(".screen").addEventListener('click', feed);




// start game

const pscreen = document.querySelector(".paused")
pscreen.addEventListener('click', startTimeout);
function startTimeout() {
	setTimeout(start, 2400);
	document.getElementById("loading").innerHTML = "loading..."
}
function start() {
	pscreen.classList.add('gone');
	document.querySelector('.screen').style.filter = "grayscale(0%)";
	document.querySelector('.screen').classList.remove("gone");
	document.querySelector('.win').classList.add("gone");
	nextFrame();
	
}

function playSound(url) {
	new Audio(url).play();
}

