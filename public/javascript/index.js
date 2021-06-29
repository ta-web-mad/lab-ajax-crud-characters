const api = new ApiHandler('https://minions-api.herokuapp.com')

window.addEventListener('load', () => {
    //

    //

    // todas
    document.getElementById('fetch-all').addEventListener('click', function (event) {
        api.getFullList()
            .then(res => updateInfo(res.data))
            .catch(err => console.log(err))
    })

    //

    //

    // una
    document.getElementById('fetch-one').addEventListener('click', function (event) {
        const charId = document.getElementById('character-id').value

        if (charId) {
            api.getOneRegister(charId)
                .then(res => updateInfo(res.data))
                .catch(err => console.log(err))
        } else {
            document.querySelector('#character-id').setAttribute('placeholder', 'NEED ID')
        }
    })

    //

    //

    // identify if exist ID

    let typingTimer2 //timer identifier
    let doneTypingInterval2 = 400 //time in ms, .4 secs

    inputArr = document.querySelectorAll('.one')

    inputArr.forEach(input =>
        input.addEventListener('keyup', e => {
            clearTimeout(typingTimer2)

            // bieeeen he usado un bind JAJAJAJ
            let checkId2 = checkId.bind(e.currentTarget)

            typingTimer2 = setTimeout(checkId2, doneTypingInterval2)
        })
    )

    inputArr.forEach(input =>
        input.addEventListener('keydown', () => {
            clearTimeout(typingTimer2)
            input.classList.remove('green')
            input.classList.remove('red')
        })
    )

    let checkId = function () {
        // console.log(this)

        api.getOneRegister(this.value || -1)
            .then(res => {
                if (res.data) {
                    this.classList.add('green')
                } else {
                    this.classList.add('red')
                }
            })
            .catch(err => console.log(err))
    }
    //

    //

    // CREATE NEW CHAR

    //
    document.getElementById('new-character-form').addEventListener('submit', e => {
        e.preventDefault()

        const inputsTag = document.querySelectorAll('#new-character-form input')

        const fullInfo = formatData(inputsTag, 0)

        api.createOneRegister(fullInfo)
            .then(() => document.querySelector('#new-character-form').reset())
            .catch(err => console.log(err))
    })

    //

    //

    //EDIT CHARACTeR

    let typingTimer //timer identifier
    let doneTypingInterval = 400 //time in ms, .4 secs
    let input = document.querySelector('#chrId')

    //on keyup, empieza el timeout
    input.addEventListener('keyup', () => {
        clearTimeout(typingTimer)
        // si pasa los .4sec llama a la function
        typingTimer = setTimeout(doneTyping, doneTypingInterval)
    })

    //on keydown, clear the countdown
    input.addEventListener('keydown', () => {
        clearTimeout(typingTimer)
    })

    const doneTyping = () => {
        const numberSeach = document.querySelector('#chrId')

        const inputsEdit = document.querySelectorAll('#edit-character-form input')

        api.getOneRegister(numberSeach.value)
            .then(res => {
                res = res.data

                if (res) {
                    inputsEdit[1].value = res.name
                    inputsEdit[2].value = res.occupation
                    inputsEdit[3].value = res.weapon
                    inputsEdit[4].checked = res.cartoon
                    numberSeach.setAttribute('placeholder', 'Insert id')
                } else {
                    document.querySelector('#edit-character-form').reset()
                    numberSeach.setAttribute('placeholder', 'invalid ID')
                }
            })
            .catch(err => console.log(err))
    }

    //

    //

    // EDIT LOGIC

    document.getElementById('edit-character-form').addEventListener('submit', e => {
        e.preventDefault()
        const inputsEdit = document.querySelectorAll('#edit-character-form input')
        const id = inputsEdit[0].value

        const fullInfo = formatData(inputsEdit, 1)

        api.updateOneRegister(id, fullInfo)
            .then(res => {
                document.querySelector('#edit-character-form').reset()
            })
            .catch(err => console.log(err))
    })

    //

    //

    //DELETE ONE
    document.getElementById('delete-one').addEventListener('click', function (event) {
        const charId = +document.getElementById('character-id-delete').value

        api.deleteOneRegister(charId)
            .then(res => {
                if (!res.data) {
                }
            })
            .catch(err => console.log(err))
    })

    //

    //

    // format data and return object for update and create
    const formatData = (inputs, starter) => {
        const eachValue = []

        for (let i = starter; i < inputs.length; i++) {
            inputs[i].type === 'text' ? eachValue.push(inputs[i].value) : eachValue.push(inputs[i].checked)
        }

        const [name, occupation, weapon, cartoon] = eachValue

        return { name, occupation, weapon, cartoon }
    }

    //

    //

    // show details

    //
    const updateInfo = data => {
        const infoDiv = document.querySelector('.info')

        if (infoDiv.firstChild !== null) infoDiv.textContent = ''

        if (data.length) {
            data.forEach(char => {
                const info = `<div class="col-md-5 character-info">
                <p>id :<span>${char.id}</span></p>
                <p>name :<span>${char.name}</span></p>
                <p>occupation: <span>${char.occupation}</span></p>
                <p>is a Cartoon?:<span>${char.cartoon}</span></p>
                <p>weapon:<span>${char.weapon}</span></p>
            </div>`

                infoDiv.insertAdjacentHTML('beforeend', info)
            })
        } else {
            const info = `<div class="col-md-5 character-info">
                <p>id :<span>${data.id}</span></p>
                <p>name :<span>${data.name}</span></p>
                <p>occupation: <span>${data.occupation}</span></p>
                <p>is a Cartoon?:<span>${data.cartoon}</span></p>
                <p>weapon:<span>${data.weapon}</span></p>
            </div>`

            infoDiv.insertAdjacentHTML('beforeend', info)
        }
    }
})
