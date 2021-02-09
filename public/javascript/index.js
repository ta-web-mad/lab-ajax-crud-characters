const charactersAPI = new APIHandler();

window.addEventListener(
  "load",
  (refreshCharacters = () => {
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

    document
      .getElementById("delete-one")
      .addEventListener("click", function (event) {});

    document
      .getElementById("edit-character-form")
      .addEventListener("submit", function (event) {});

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
            charactersAPI
              .createOneRegister(newCharacter)
              .then(refreshCharacters());
          })
          .catch((err) => console.log(err));

        //console.log(newCharacter);
        // charactersAPI
        //   .createOneRegister(newCharacter)
        //   .then(refreshCharacters())
        //   .catch((err) => console.log(err));
      });
  })
);
