const charactersAPI = new APIHandler();

window.addEventListener("load", () => {
  // Fetch all registers
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI
        .getFullList()
        .then((response) => {
          let characters = response.data,
            list = "";

          characters.forEach(
            (character) =>
              (list += `<div class="character-info">
            <div class="name">Character Name <span>${character.name}</span></div>
            <div class="occupation">Character Occupation<span>${character.occupation}</span></div>
            <div class="cartoon">Is a Cartoon?<span>${character.cartoon}</span></div>
            <div class="weapon">Character Weapon<span>${character.weapon}</span></div>
          </div>`)
          );
          document.querySelector("#charactersList").innerHTML = list;
        })
        .catch(() => toastr.error("Something went wrong"));
    });

  // Fetch one register
  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const wantedId = document.querySelector(".find-one input").value;
      charactersAPI
        .getOneRegister(wantedId)
        .then((response) => {
          document.querySelector(
            "#singleCharacter"
          ).innerHTML = `<div class="character-info">
        <div class="name">Character Name <span>${response.data.name}</span></div>
        <div class="occupation">Character Occupation<span>${response.data.occupation}</span></div>
        <div class="cartoon">Is a Cartoon?<span>${response.data.cartoon}</span></div>
        <div class="weapon">Character Weapon<span>${response.data.weapon}</span></div>
      </div>`;
        })
        .catch(() => toastr.error("Something went wrong"));
    });

  // Delete one register
  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const wantedId = document.querySelector(".delete input").value;
      charactersAPI
        .deleteOneRegister(wantedId)
        .then(() => {
          document.querySelector(".delete input").value = null;
          toastr.info(`User with ID ${wantedId} successfully deleted`);
        })
        .catch(() => toastr.error("Something went wrong"));
    });

  // Edit one register
  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const update = document.querySelectorAll("#edit-character-form input");
      const wantedId = update[0].value;

      charactersAPI
        .getOneRegister(wantedId)
        .then((response) => response.data)
        .then((oldData) => {
          const updatedCharacter = {
            name: update[1].value ? update[1].value : oldData.name,
            occupation: update[2].value ? update[2].value : oldData.occupation,
            weapon: update[3].value ? update[3].value : oldData.weapon,
            cartoon: update[4].checked,
            id: oldData.id
          };
          return updatedCharacter;
        })
        .then((updatedCharacter) =>
          charactersAPI
            .updateOneRegister(wantedId, updatedCharacter)
            .then(() => {
              toastr.info("Character sucessfully edited");
              event.target.reset();
            })
        )
        .catch(() => toastr.error("Something went wrong"));
    });

  // Add new register
  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const inputCharacter = document.querySelectorAll(
        "#new-character-form input"
      );
      let newCharacterId = 0;
      charactersAPI
        .getFullList()
        .then((response) => {
          newCharacterId = response.data.length;
          return newCharacterId;
        })
        .then((newCharacterId) => {
          const newCharacter = {
            name: inputCharacter[0].value,
            occupation: inputCharacter[1].value,
            weapon: inputCharacter[2].value,
            cartoon: inputCharacter[3].checked,
            id: newCharacterId
          };
          return newCharacter;
        })
        .then((newCharacter) => {
          charactersAPI.createOneRegister(newCharacter).then(() => {
            toastr.info("Character successfully created");
            event.target.reset();
          });
        })
        .catch(() => toastr.error("Something went wrong"));
    });
});
