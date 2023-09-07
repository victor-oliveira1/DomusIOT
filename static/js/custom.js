function doCommand(elem) {
    elem.disabled = true

    var cardBodyElement = elem.parentNode.parentNode
    var cardTitleElement = cardBodyElement.children[0]

    var cardTitle = cardTitleElement.textContent
    var cmd = elem.value
    var dps = elem.getAttribute('dps')
    var devId = cardTitleElement.getAttribute('dev_id')

    if (cmd == 0) {
        cmdText = 'Desligado'
    }
    else if (cmd == 1) {
        cmdText = 'Ligado'
    }

    const postdata = {
        cmd: cmd,
        dps: dps,
        dev_id: devId
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(
        window.location.href, config
    )
    .then(
        response => {showToast(`${cardTitle}: ${cmdText}`)}
    )
    .catch(
        error => {showToast(`${cardTitle}: ${error}`)}
    )
    .finally(
        () => {elem.disabled = false}
    )
}

function showToast(text) {
    const toastElement = document.getElementById('alertToast')
    toastElement.getElementsByClassName('toast-body')[0].innerHTML = text
    const toast = new bootstrap.Toast(toastElement)
    // toast._config.delay = 5000
    toast.show()
}

function showStatusModal(element) {
    deviceElement = element.parentElement.getElementsByClassName('card-title')[0]

    deviceName = deviceElement.textContent
    deviceId = deviceElement.getAttribute('dev_id')

    document.getElementsByClassName("modal-title")[0].textContent = deviceName
    document.getElementsByClassName("modal-body")[0].innerHTML = "Carregando..."

    const postdata = {
        dev_id: deviceId
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(
        window.location.href + "/status", config
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

function telaCheia() {
    elem = document.documentElement
    if (window.innerHeight === screen.height) {
        document.exitFullscreen()
    } else {
        elem.requestFullscreen()
    }
}
