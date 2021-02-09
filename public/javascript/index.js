const charactersAPI = new APIHandler();

window.addEventListener("load", () => {
  // Fetch all registers
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI.getFullList().then((response) => {
        let characters = response.data,
          list = "";
        characters.forEach(
          (character) =>
            (list += `<li><p><strong>Name </strong>${character.name}</p>  
            <p><strong>Occupation: </strong>${character.occupation}</p>
            <p><strong>Cartoon? </strong>${character.cartoon}</p>
            <p><strong>Weapon: </strong>${character.weapon}</p>
            </li> <hr>`)
        );
        document.querySelector("#charactersList").innerHTML = list;
      });
    });

  // Fetch one register
  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const wantedId = document.querySelector(".find-one input").value;
      charactersAPI.getOneRegister(wantedId).then((response) => {
        document.querySelector(
          "#singleCharacter"
        ).innerHTML = `<p><strong>Name </strong>${response.data.name}</p>  
          <p><strong>Occupation: </strong>${response.data.occupation}</p>
            <p><strong>Cartoon? </strong>${response.data.cartoon}</p>
            <p><strong>Weapon: </strong>${response.data.weapon}</p>`;
      });
    });

  // Delete one register
  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const wantedId = document.querySelector(".delete input").value;
      charactersAPI
        .deleteOneRegister(wantedId)
        .then(console.log("deleted"))
        .catch((err) => console.log(err));
    });

  // Edit one register
  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const update = document.querySelectorAll("#edit-character-form input");
      const wantedId = update[0].value;

      const oldCharacter = charactersAPI
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
          charactersAPI.updateOneRegister(wantedId, updatedCharacter)
        )
        .catch((err) => console.log(err));

      charactersAPI.updateOneRegister(2);
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
          inputCharacter.forEach((input) => console.log(input.value));
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
          console.log(newCharacter);
          charactersAPI.createOneRegister(newCharacter).then(() => {
            inputCharacter.forEach((input) => (input.value = null));
          });
        })
        .catch((err) => console.log(err));
    });
});
