let rubles = document.querySelector('.rubles')
let speed = {
	x: { min: -10, max: 10, change: 1 },
	y: { min: 5, max: 15, change: 1 },
	w: { min: -30, max: 30, change: 5 }
};
const RUBLES_COUNT = 24;

// Запускаем печатный станок.
(function(){
	for(let i = 0; i<RUBLES_COUNT; i++){
		rubles.innerHTML += '<div class="ruble"></div>'
	}
})()

let rubElements = rubles.querySelectorAll('.ruble')

function initRuble(items, isNew){
	items.forEach((item) => {
		item.style.setProperty('--x', Math.random() * 1550)
		item.style.setProperty('--y', 50 + (isNew ? Math.random() * 600 : 0))
		item.style.setProperty('--w', Math.random() * 360)
		item.style.setProperty('--vx', speed.x.min + (speed.x.max - speed.x.min) * Math.random())
		item.style.setProperty('--vy', speed.y.min + (speed.y.max - speed.y.min) * Math.random())
		item.style.setProperty('--vw', speed.w.min + (speed.w.max - speed.w.min) * Math.random())
	})
}

function CBR_XML_Daily_Ru(rates) {
	var USDrate = rates.Valute.USD.Value.toFixed(2).replace('.', ',');
	var USD = document.querySelector('.prices__value--usd')
	USD.innerHTML = USDrate

	var EURrate = rates.Valute.EUR.Value.toFixed(2).replace('.', ',');
	var EUR = document.querySelector('.prices__value--eur');
	EUR.innerHTML = EURrate
}

function updateRate(){
	// TODO.
}

function moveRuble(){
	rubElements.forEach((item) => {

		item.style.setProperty('--x', +item.style.getPropertyValue('--x') + +item.style.getPropertyValue('--vx') / 10)
		item.style.setProperty('--y', +item.style.getPropertyValue('--y') + +item.style.getPropertyValue('--vy') / 10)
		item.style.setProperty('--w', +item.style.getPropertyValue('--w') + +item.style.getPropertyValue('--vw') / 10)

		item.style.setProperty('--vx', +item.style.getPropertyValue('--vx') + Math.random() * speed.x.change - speed.x.change/2)
		item.style.setProperty('--vy', +item.style.getPropertyValue('--vy') + Math.random() * speed.y.change - speed.y.change/2)
		item.style.setProperty('--vw', +item.style.getPropertyValue('--vw') + Math.random() * speed.w.change - speed.w.change/2)

		if(+item.style.getPropertyValue('--y') > window.innerHeight || +item.style.getPropertyValue('--y') > window.innerWidth){
			initRuble([item], false);
		}
	});
	setTimeout(moveRuble, 20);
}

// 
setInterval(updateRate, 10000);
initRuble(rubElements, true);
moveRuble();


let player = document.querySelector('#audio')
let playBtn = document.querySelector('#playBtn')
if(player && playBtn){
	playBtn.addEventListener('click', () => {
		playBtn.classList.toggle('playBtn--playing')
		if(player.paused){
			player.play()
		} else {
			player.pause()
		}
	})
}

// 
function appHeight() {
	const doc = document.documentElement;
	doc.style.setProperty("--app-height", `${window.innerHeight}px`);
}
window.addEventListener("resize", appHeight);
appHeight();