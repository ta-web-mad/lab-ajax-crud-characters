const charactersAPI = new APIHandler();

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI.getFullList().then((response) => {
        let characters = response.data,
          list = "";
        console.log(characters);
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
    .addEventListener("click", function (event) {});

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {});

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {});

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {});
});
