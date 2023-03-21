document.querySelector('.control-buttons span').onclick = () => {
    
	// ask the user to enter his name
	let yourName = prompt('What is Your name!');
    // if the user do not enter his name or cancel     
	if(yourName === '' || yourName === null) {
		// if has no name
		document.querySelector('.name span').innerHTML = 'Unknown';
		// the color is red if the user do not enter his name
		document.querySelector('.name span').style.color = 'red';
	} else { // the user enter his name 
		document.querySelector('.name span').innerHTML = yourName; 
		document.querySelector('.name span').style.color = '#22ff00';
	}
    // remove splash screen from dom
	document.querySelector('.control-buttons').remove();
};

// time of blocks 
let duration = 1000;

// call container of blocks
let blockCountainer = document.querySelector('.memory-game-blocks');

// call all blocks from array
let blocks = Array.from(blockCountainer.children);

// give indexs from our blocks elemetns
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// add no clicking function
function noClicking() {
	blockCountainer.classList.add('no-clicking');

	setTimeout(() => {
		// remove noclicking class after duration
		blockCountainer.classList.remove('no-clicking');
	},duration);
}

function isFlipped(selectBlock) {
	selectBlock.classList.add('is-flipped');

	let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

	if(allFlippedBlocks.length === 2) {
  
		// trigger function noClicking in the line 38
		noClicking();

		// check matched blocks
		checkMathedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);

	}
}

function checkMathedBlocks(firstBlock,secondBlock) {

	let triesElement = document.querySelector('.tries span');
       // if blocks are the same 
	if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
        
		let score = document.querySelector('.menu').children[1];

		score.innerHTML = parseInt(score.innerHTML) + 1;
		firstBlock.classList.remove('is-flipped');
		secondBlock.classList.remove('is-flipped');
        // hasMatch is the same styleing as isflipped
		firstBlock.classList.add('has-match');
		secondBlock.classList.add('has-match');
		document.getElementById('success').play();
	} else {
        document.getElementById('fail').play();
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        // if the user fail fifteen time finish the game
		triesElement.innerHTML == 13 ? triesElement.style.color = "#f00": triesElement.style.color = '#000';
		if(triesElement.innerHTML == 15) {
			document.querySelector('.menu').style.display= 'block';
		}

		setTimeout(() => {
			firstBlock.classList.remove('is-flipped');
			secondBlock.classList.remove('is-flipped');
		},duration)
		
	}
}

// add order css property 
blocks.forEach((block,index) => {
	// give the each block range of indexs 
	block.style.order = orderRange[index];

	// add is flipped class to flip the blocks
	block.addEventListener('click', function() {
		// trigger isFlipped function
		isFlipped(block);


	})
})




// shuffle function to shuffle the blocks elements
function shuffle(array) {
    // settings vars
	let current = array.length;
	let temp;
	let random;

	while(current > 0) {
	// random number
	random = Math.floor(Math.random() * current);
	
	// decrease length by one
	current--;

	temp = array[current];

	array[current] = array[random];

	array[random] = temp;
	
	}
	return array;
}
