const constrcutCharCard = character => {
    let isCartoon = ''
    character.cartoon ? isCartoon = 'Cartoon' : isCartoon = 'Non-Cartoon'
    return `<div class="character-info">
  <div class="id">ID: <span>${character.id}</span></div>
  <div class="name">Name: <span>${character.name}</span></div>
  <div class="occupation">Occupation: <span>${character.occupation}</span></div>
  <div class="cartoon">Type: <span>${isCartoon}</span></div>
  <div class="weapon">Weapon: <span>${character.weapon}</span></div>
</div>`
}