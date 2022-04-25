let name = '';
let game = {
	game: [] // ^^
} 
//Затем в этом же файле распишем функцию навигации, которая срабатывает по клику мышки на кнопках. Расписываем мы её сразу с рестартом игры, чтобы потом не возвращаться к ней.
let panel = 'start';
let nav = () => {
	document.onclick = (e) => {
		e.preventDefault();
		switch (e.path[0].id) {
			case "startGame":
			go('game', 'd-block');
			break;
			case "restart":
			go('game', 'd-block');
			$('.elements').remove();
			$("#game").append(`<div class="elements"></div>`);
			break;
		}
	}
}
//Нужно написать вызываемую функцию go, которая будет отслеживать на какой странице мы находимся в данный момент.
let go = (page, attribute) => {
	let pages = ['start', 'game', 'end'];
	panel = page;
	$(`#${page}`).attr('class', attribute);
	pages.forEach(e => {
		if(page != e) {
			$(`#${e}`).attr('class', 'd-none');
		}
	})
}
//Запишем функцию отслеживания страниц в интервале.
let startLoop = () => {
	let inter = setInterval(() =>{
		if(panel !== "start"){
			clearInterval(inter);
		}
		checkName();
	},100);
}
//Теперь в файле game.js добавим запуск наших функций при загрузке окна браузера.
window.onload = () => {
	checkStorage();
	nav();
	startLoop();
	setInterval(() => {
		if (panel === "game") {
			game.game = new Game();
			game.game.start();
			panel = "game process";
		}
	}, 500)
};
let checkStorage = () => {
	if(localStorage.getItem('userName') != null) {
		$(`#nameInput`).val(localStorage.getItem('userName'));
	}
}
let checkName = () =>{
	name = $(`#nameInput`).val().trim();
	if(name != ""){
		localStorage.setItem('userName', name);
		$(`#startGame`).attr('disabled',false);
	}
	else{
		$(`#startGame`).attr('disabled',true);
	}
}

