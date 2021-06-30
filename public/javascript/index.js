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

    let timeout //timer identifier
    let timer = 400 //time in ms, .4 secs

    inputArr = document.querySelectorAll('.one')

    inputArr.forEach(input =>
        input.addEventListener('keyup', e => {
            clearTimeout(timeout)

            // bieeeen he usado un bind JAJAJAJ
            let checkId2 = checkId.bind(e.currentTarget)

            timeout = setTimeout(checkId2, timer)
        })
    )

    inputArr.forEach(input =>
        input.addEventListener('keydown', () => {
            clearTimeout(timer)
            input.classList.remove('green')
            input.classList.remove('red')
        })
    )

    let checkId = function () {
        // console.log(this.id)

        api.getOneRegister(this.value || -1)
            .then(res => {
                if (res.data) {
                    this.classList.add('green')
                    if (this.id === 'chrId') doneTyping(this)
                } else {
                    this.classList.add('red')
                    if (this.id === 'chrId') doneTyping(this)
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

    const doneTyping = () => {
        console.log('donetyping')
        const numberSeach = document.querySelector('#chrId')

        const inputsEdit = document.querySelectorAll('#edit-character-form input')

        api.getOneRegister(numberSeach.value)
            .then(res => {
                res = res.data

                // console.log(Object.values(res))

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
