//get  constants
const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');
const form = document.querySelector('#form');
//create array cards
const technologies = [
	{ title: 'HTML', description: 'HTML Text', type: 'html', done: true },
	{ title: 'CSS', description: 'CSS Text', type: 'css', done: true },
	{ title: 'JavaScript', description: 'JavaScript Text', type: 'js', done: false },
	{ title: 'Git', description: 'Git Text', type: 'git', done: false },
	{ title: 'React', description: 'React Text', type: 'react', done: false }
]

//add Eventlistener to modalWindow
content.addEventListener('click', openCard);
backdrop.addEventListener('click', closeModal);
modal.addEventListener('change', toggleTech);
form.addEventListener('submit', createTech);



const APP_TITLE = document.title;

//modal
function openCard() {
	const data = event.target.dataset
	//find(search) array iteration, comparison.doesnt't open modal outside the cards
	const tech = technologies.find(t => t.type === data.type)
	if (!tech) return

	openModal(toModal(tech), tech.title)
}

function toModal(tech) {
	const checked = tech.done ? 'checked' : ''
	return `
	<h2>${tech.title}</h2>
			<p>${tech.description}</p>
			<hr>
			<div>
				<input type="checkbox" id="done" ${checked} data-type="${tech.type}" >
				<label for="done">Выучил</label>
			</div>
	`
}
//check
function toggleTech(event) {
	const type = event.target.dataset.type
	const tech = technologies.find(t => t.type === type)
	tech.done = event.target.checked

	init()
}

function openModal(html, title = APP_TITLE) {
	document.title = `${title} | ${APP_TITLE}`
	modal.innerHTML = html
	modal.classList.add('open');
}

function closeModal() {
	document.title = APP_TITLE
	modal.classList.remove('open');
}

function init() {
	renderCards()
	renderProgress()
}

function renderProgress() {
	const percent = computeProgressPercent()

	//color progress
	let background
	if (percent <= 30) {
		background = '#E75A5A'
	} else if (percent > 30 && percent < 70) {
		background = '#F99415'
	} else {
		background = '#73BA3C'
	}

	//style & text progress
	progress.style.background = background
	progress.style.width = percent + '%'
	progress.textContent = percent ? percent + '%' : ''

}

//calc %
function computeProgressPercent() {
	if (technologies.length === 0) {
		return 0
	}

	let doneCount = 0
	for (let i = 0; i < technologies.length; i++) {
		if (technologies[i].done) doneCount++
	}

	return Math.round((100 * doneCount) / technologies.length)
}

//generate cards
function renderCards() {
	//Add text, if hasn't tech
	if (technologies.length === 0) {
		content.innerHTML = '<p class="empty">Технологий пока нет. Добавьте первую</p>'
	} else {
		//Add cards
		let html = '';

		for (let i = 0; i < technologies.length; i++) {
			let tech = technologies[i];
			html += toCard(tech)
		}
		content.innerHTML = html;
		//content.innerHTML=technologies.map(toCard).join('')
	}
}

function toCard(tech) {
	// let doneClass = ''

	// if (tech.done) {
	// 	doneClass = 'done'
	// }

	const doneClass = tech.done ? 'done' : ''

	// data-type-custom atr(for click cards and text in cards)
	return `
	<div class="card ${doneClass}" data-type="${tech.type}">
		<h3 data-type="${tech.type}">${tech.title}</h3>
	</div>
	`
}

function createTech(event) {
	//cancel reload
	event.preventDefault()

	//access labels
	//const title = event.target.title
	//const description = event.target.description

	//destructuring
	const { title, description } = event.target

	const newTech = {
		title: title.value,
		description: description.value,
		done: false,
		type: title.value.toLowerCase()
	}
	//add to the end of the array
	technologies.push(newTech);
	//clear inputs
	title.value = '';
	description.value = '';
	init();
}

init()