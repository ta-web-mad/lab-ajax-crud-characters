const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');


function characterTemplate(id, name, occupation, cartoon, weapon) {
	return `<div class="character-info">
		<div class="id">${id}</div>
		<div class="name">${name}</div>
		<div class="occupation">${occupation}</div>
		<div class="cartoon">${cartoon}</div>
		<div class="weapon">${weapon}</div>
	</div>`
}


let charactersContainer = document.querySelector(".characters-container");

let idElement = document.querySelector("input[name='character-id']");
let idElemDelete = document.querySelector("input[name='character-id-delete']");

let deleteBtn = document.querySelector("#delete-one");
let createBtn = document.querySelector("#send-data");
let editBtn = document.querySelector("#update-data");


window.addEventListener('load', () => {


	/****************************************   Fetch all   *****************************************/
	document.getElementById('fetch-all').addEventListener('click', function (event) {

		charactersAPI.getFullList()
			.then(charactersList => {
				charactersContainer.innerHTML = "";
				charactersList.data.forEach(elem => {
					let character = characterTemplate(elem.id, elem.name, elem.occupation, elem.cartoon, elem.weapon);
					charactersContainer.innerHTML += character;
				})
			})
	});


	/****************************************   Fetch one   *****************************************/
	document.getElementById('fetch-one').addEventListener('click', function (event) {

		let id = idElement.value

		charactersAPI.getOneRegister(id)
			.then(elem => {
				let foundCharacter = characterTemplate(elem.data.id, elem.data.name, elem.data.occupation, elem.data.cartoon, elem.data.weapon);
				charactersContainer.innerHTML = foundCharacter;
				idElement.value = "";
			})
	});


	/******************************************   Delete   ******************************************/
	document.getElementById('delete-one').addEventListener('click', function (event) {

		let id = idElemDelete.value;

		charactersAPI.deleteOneRegister(id)
			.then(elem => {
				let deletedCharacter = characterTemplate(elem.data.id, elem.data.name, elem.data.occupation, elem.data.cartoon, elem.data.weapon);
				charactersContainer.innerHTML = "<h4>Deleted item:</h4>";
				charactersContainer.innerHTML += deletedCharacter;
				idElemDelete.value = "";
				deleteBtn.classList.add("success");
			})
			.catch(err => {
				deleteBtn.classList.add("error");
			})
	});


	/*******************************************   Edit   *******************************************/
	document.getElementById('edit-character-form').addEventListener('submit', function (event) {

		event.preventDefault()

		let id = document.querySelector("#edit-character-form input[name='chr-id']");
		let name = document.querySelector("#edit-character-form input[name='name']");
		let occupation = document.querySelector("#edit-character-form input[name='occupation']");
		let weapon = document.querySelector("#edit-character-form input[name='weapon']");
		let cartoon = document.querySelector("#edit-character-form input[name='cartoon']");

		let characterInfo = {
			name: name.value,
			occupation: occupation.value,
			weapon: weapon.value,
			cartoon: cartoon.checked
		};

		charactersAPI.updateOneRegister(id.value, characterInfo)
			.then(elem => {
				if (elem.data) {
					let updatedCharacter = characterTemplate(elem.data.id, elem.data.name, elem.data.occupation, elem.data.cartoon, elem.data.weapon);
					charactersContainer.innerHTML = "<h4>Edited item:</h4>";
					charactersContainer.innerHTML += updatedCharacter;

					editBtn.classList.add("success");

				} else {
					editBtn.classList.add("error");
				}

				id.value = "";
				name.value = "";
				occupation.value = "";
				weapon.value = "";
				cartoon.checked = false;
			})
			.catch(err => {
				editBtn.classList.add("error");
			})
	});


	/******************************************   Create   ******************************************/
	document.getElementById('new-character-form').addEventListener('submit', function (event) {

		event.preventDefault()

		let name = document.querySelector("#new-character-form input[name='name']");
		let occupation = document.querySelector("#new-character-form input[name='occupation']");
		let weapon = document.querySelector("#new-character-form input[name='weapon']");
		let cartoon = document.querySelector("#new-character-form input[name='cartoon']");

		let characterInfo = {
			name: name.value,
			occupation: occupation.value,
			weapon: weapon.value,
			cartoon: cartoon.checked
		};

		charactersAPI.createOneRegister(characterInfo)
			.then(elem => {
				if (elem.data) {
					let newCharacter = characterTemplate(elem.data.id, elem.data.name, elem.data.occupation, elem.data.cartoon, elem.data.weapon);
					charactersContainer.innerHTML = "<h4>Created item:</h4>";
					charactersContainer.innerHTML += newCharacter;

					createBtn.classList.add("success");

				} else {
					createBtn.classList.add("error");
				}

				id.value = "";
				name.value = "";
				occupation.value = "";
				weapon.value = "";
				cartoon.checked = false;
			})
			.catch(err => {
				createBtn.classList.add("error");
			})

	});
});