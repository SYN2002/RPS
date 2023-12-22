const start = document.getElementById('st');
const ione = document.getElementById('ione');
const itwo = document.getElementById('itwo');
const win = document.getElementById('win');
const box1 = document.getElementById('boxone');

const imagePaths = [
	'image1.png', //R->0
	'image2.png', //P->1
	'image3.png', //S->2
	'image11.png',//R->3
	'image22.png',//P->4
	'image33.png',//S->5
];

function fetchImages(eo, n, Animation) {
	let randomIndex;
	if (n === 3)
		randomIndex = Math.floor(Math.random() * 3);
	else
		randomIndex = Math.floor(Math.random() * 3) + 3;
	const randomImagePath = imagePaths[randomIndex];
	console.log(randomIndex);
	fetch(randomImagePath)
		.then(response => response.blob())
		.then(blob => {
			const imageUrl = URL.createObjectURL(blob);
			startStopAnimation(eo, Animation);
			setTimeout(() => {
				eo.src = `${imageUrl}`;
			}, 5000);
		})
		.catch(error => {
			console.error('Error fetching the image:', error);
		});
	return randomIndex;
}

function startStopAnimation(eo, Animation) {
	eo.style.animation = `${Animation} .3s linear infinite`;

	setTimeout(() => {
		eo.style.animation = 'none';
	}, 5000);
}

start.addEventListener('click', () => {
	// ione.src='none';
	win.style.padding = '0 0';
	win.innerHTML = '';
	const p1 = fetchImages(ione, 3, 'animateLoader1');
	const p2 = fetchImages(itwo, 6, 'animateLoader2');
	console.log(p1, p2);
	setTimeout(() => {
		win.style.padding = '30px 60px'
		if (p2 - p1 == 3)
			win.innerHTML = 'DRAW';
		else if ((p1 == 0 && p2 == 5) || (p1 == 1 && p2 == 3) || (p1 == 2 && p2 == 4))
			win.innerHTML = 'YOU WIN';
		else
			win.innerHTML = 'COMPUTER WIN';
	}, 5000);
})