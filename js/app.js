//get  constants
const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');
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

//create function
function openCard() {
	modal.classList.add('open');
}

function closeModal() {
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

	return `
	<div class="card ${doneClass}">
		<h3>${tech.title}</h3>
	</div>
	`
}
init()