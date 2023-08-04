/* Utils */
const getNotes = () => {
	return JSON.parse(localStorage.getItem("notes"));
};
const setNotes = (notes) => {
	localStorage.setItem("notes", JSON.stringify(notes));
};

/* Funciones graficas */
const getCardTemplate = (title, description, idx) => {
	return `<h3 class="card__title">${title}</h3>
				<p>${description}</p>
				<div class="butons-container card__butons-container">
					<button id="btn-update" data-id="${idx}" class="butons-container__button butons-container__button_active"><i
							class="fa-solid fa-pencil"></i></button>
					<button id="btn-delete" data-id="${idx}" class="butons-container__button butons-container__button_danger">
						<i class="fa-solid fa-trash"></i></button>
				</div>`;
};

const printNotes = () => {
	let notes = getNotes();
	if (notes) {
		let cardDashboard = document.getElementById("card-dashboard");
		cardDashboard.innerHTML = "";
		notes.map((note, idx) => {
			let div = document.createElement("div");
			div.className = "card";
			div.innerHTML = getCardTemplate(note.title, note.description, idx);
			div.querySelector("#btn-delete").addEventListener("click", deleteNote);
			div.querySelector("#btn-update").addEventListener("click", handlerUpdate);
			cardDashboard.appendChild(div);
		});
	}
	localStorage.setItem("actualNote", -1);
};

const cleanFields = () => {
	document.getElementById("input-title").value = "";
	document.getElementById("input-description").value = "";
	document.getElementById("preview-card-title").innerHTML = "Titulo";
	document.getElementById("preview-card-description").innerHTML = "Descripcion";
};

/* Main */
document.addEventListener("DOMContentLoaded", () => {
	/* Dibujamos las notas */
	printNotes();
	/* Agregar el manejo del formulario */
	handlerForm();
	/* Agregamos el comportamiento del formulario al enviarlo */
	handlerSubmit();
});

/* Handlers */
const handlerForm = () => {
	let previewCardTitle = document.getElementById("preview-card-title");
	let previewCardDescription = document.getElementById(
		"preview-card-description"
	);
	let inputTitle = document.getElementById("input-title");
	inputTitle.addEventListener("keyup", (e) => {
		previewCardTitle.innerHTML =
			e.target.value.length > 0 ? e.target.value : "Titulo";
	});
	let inputDescription = document.getElementById("input-description");
	inputDescription.addEventListener("keyup", (e) => {
		previewCardDescription.innerHTML =
			e.target.value.length > 0 ? e.target.value : "Descipcion";
	});
};

const handlerSubmit = () => {
	addEventListener("submit", (e) => {
		e.preventDefault();
		Number(localStorage.getItem("actualNote")) < 0
			? addNewNote()
			: updateNote();
		printNotes();
		cleanFields();
	});
};

const handlerUpdate = (e) => {
	const card = e.target;
	const id = Number(card.dataset.id);
	const notes = getNotes();
	const noteSelected = notes.find((note, idx) => idx === id);
	document.getElementById("preview-card-title").innerHTML = noteSelected.title;
	document.getElementById("preview-card-description").innerHTML =
		noteSelected.description;
	document.getElementById("input-title").value = noteSelected.title;
	document.getElementById("input-description").value = noteSelected.description;
	localStorage.setItem("actualNote", id);
};

/* Funciones del CRUD */
const updateNote = () => {
	const actualNote = Number(localStorage.getItem("actualNote"));
	const notes = getNotes();
	const newNotes = notes.map((note, idx) => {
		if (idx === actualNote) {
			note.title = document.getElementById("preview-card-title").innerHTML;
			note.description = document.getElementById(
				"preview-card-description"
			).innerHTML;
		}
		return note;
	});
	setNotes(newNotes);
};

const deleteNote = (e) => {
	const card = e.target;
	const id = Number(card.dataset.id);
	const notes = getNotes();
	const newNotes = notes.filter((note, idx) => idx !== id);
	setNotes(newNotes);
	printNotes(newNotes);
};

const addNewNote = () => {
	let notes = getNotes();
	const title = document.getElementById("preview-card-title").innerHTML;
	const description = document.getElementById(
		"preview-card-description"
	).innerHTML;
	notes.push({
		title,
		description,
	});
	setNotes(notes);
};
