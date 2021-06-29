const charactersAPI = new APIHandler('http://localhost:5500');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    
    charactersAPI
      .getFullList()
      .then(res => res.data.forEach((el, index) => {
        const mold = new DocumentFragment();
        
        index==0?
          mold.appendChild(document.querySelector('.character-info')) :
          mold.appendChild(document.querySelector('.character-info').cloneNode(true));

        mold.querySelector('.name').textContent = 'Name: ' + el.name;
        mold.querySelector('.occupation').textContent = 'Occupation: ' + el.occupation;
        mold.querySelector('.cartoon').textContent = 'Is cartoon?: ' + el.cartoon;
        mold.querySelector('.weapon').textContent = 'Weapon: ' + el.weapon;

        document.querySelector('.characters-container').appendChild(mold);
      }))
      .catch(err => console.error(err));
    
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id = document.querySelector('#character-id').value;
    if(!id) return;

    const first = document.querySelector('.character-info');
    document.querySelector('.characters-container').innerHTML = '';
    document.querySelector('.characters-container').appendChild(first);

    charactersAPI
      .getOneRegister(id)
      .then(res => {
        if(!res.data) return;

        const mold = new DocumentFragment();
        console.log(res.data);
        
        mold.appendChild(document.querySelector('.character-info'));

        mold.querySelector('.name').textContent = 'Name: ' + res.data.name;
        mold.querySelector('.occupation').textContent = 'Occupation: ' + res.data.occupation;
        mold.querySelector('.cartoon').textContent = 'Is cartoon?: ' + res.data.cartoon;
        mold.querySelector('.weapon').textContent = 'Weapon: ' + res.data.weapon;

        document.querySelector('.characters-container').appendChild(mold);
      })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const id = document.querySelector('#character-id-delete').value;
    const button = document.getElementById('delete-one');
    button.classList.remove('active', 'error');
    if(!id) {
      button.classList.add('error');
      return;
    }

    charactersAPI
      .deleteOneRegister(id)
      .then(res => {
        if(!res.data) {
          button.classList.add('error');
          return;
        }

        button.classList.add('active');
      })
      .catch(err => {
        button.classList.add('error');
        console.error(err);
      });
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const button = document.getElementById('send-data-edit');
    button.classList.remove('active', 'error');

    const inputs = [...this.querySelectorAll('#edit-character-form input')];

    const id = inputs[0].value;
    const body = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    };

    charactersAPI
      .updateOneRegister(id, body)
      .then(res => {
        if(!res.data) {
          button.classList.add('error');
          return;
        }

        button.classList.add('active');
      })
      .catch(err => {
        button.classList.add('error');
        console.error(err);
      });

    document.querySelector('#edit-character-form').reset()
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const button = document.getElementById('send-data-create');
    button.classList.remove('active', 'error');

    const inputs = [...this.querySelectorAll('#new-character-form input')];

    const body = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    };

    charactersAPI
      .createOneRegister(body)
      .then(res => {
        if(!res.data) {
          button.classList.add('error');
          return;
        }

        button.classList.add('active');
      })
      .catch(err => {
        button.classList.add('error');
        console.error(err);
      });

    document.querySelector('#new-character-form').reset()
  });
});
