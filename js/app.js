//get  constants
const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
//create array cards
const technologies = [
	{ title: 'HTML', description: 'HTML Text', type: 'html', done: false },
	{ title: 'CSS', description: 'CSS Text', type: 'css', done: false },
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

//function start app
function init() {
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