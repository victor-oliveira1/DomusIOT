function deviceSet(elem, name, id, dps, value) {
    elem.disabled = true

    if (value == true) {
        valueText = 'Ligado'
    } else if (value == false) {
        valueText = 'Desligado'
    }

    const postdata = {
        id: id,
        dps: dps,
        value: value
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(
        window.location.href + "/device/set", config
    )
    .then(
        response => {toastShow(`${name}: ${valueText}`)}
    )
    .catch(
        error => {toastShow(`${name}: ${error}`)}
    )
    .finally(
        () => {elem.disabled = false}
    )
}

function toastShow(text) {
    toastElement = document.querySelector('#toastAlert')
    document.querySelector('#toastAlertBody').innerHTML = text
    new bootstrap.Toast(toastElement).show()
}

function deviceStatus(name, id) {
    document.querySelector('#modalDeviceStatusLabel').textContent = name
    document.querySelector("#modalDeviceStatusBody").textContent = 'Carregando...'

    const postdata = {
        id: id,
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(
        window.location.href + "/device/status", config
    )
    .then(
        response => {return response.json()}
    )
    .then(
        data => {
            data = data['dps']

            let htmlContent = '<ul>'
            for (const key in data) {
                value = data[key]

                if (key == 19) {
                    value = `${value / 10} W`
                } else if (key == 20) {
                    value = `${value / 10} V`
                } else if (key == 18) {
                    value = `${value} mA`
                } else if (key == 9) {
                    value = `${value} s`
                }
                htmlContent += `<li>${key}: ${value}</li>`
            }
            htmlContent += '</ul>'
            document.getElementsByClassName("modal-body")[0].innerHTML = htmlContent
        }
    )
    .catch(
        error => {
            document.getElementsByClassName("modal-body")[0].innerHTML = 'Ocorreu um erro:<br><strong>' + error + '</strong>'
        }
    )
}

function fullScreenTrigger() {
    elem = document.documentElement
    if (window.innerHeight === screen.height) {
        document.exitFullscreen()
    } else {
        elem.requestFullscreen()
    }
}
