function triggerFullScreen() {
    elem = document.documentElement
    if (window.innerHeight === screen.height) {
        document.exitFullscreen()
    } else {
        elem.requestFullscreen()
    }
}

function getDeviceAttr(rowElem) {
    device = {}
    device['index'] = rowElem.getElementsByTagName('td')[0].textContent
    device['name'] = rowElem.getElementsByTagName('td')[1].textContent
    device['group'] = rowElem.getElementsByTagName('td')[2].textContent
    device['service'] = rowElem.getElementsByTagName('td')[3].textContent
    device['id'] = rowElem.getElementsByTagName('td')[4].textContent
    device['key'] = rowElem.getElementsByTagName('td')[5].textContent
    device['icon'] = rowElem.getElementsByTagName('td')[6].textContent
    device['dps'] = rowElem.getElementsByTagName('td')[7].textContent

    return device
}

function modalConfirmDelete(elem) {
    row = elem.parentElement.parentElement
    device = getDeviceAttr(row)

    document.querySelector('#modalConfirmDeleteLabel').setAttribute('deviceIndex', device['index'])
    document.querySelector('#modalConfirmDeleteLabel').innerHTML = `Remover: <strong>${device['name']}</strong>?`
}

function modalEdit(elem) {
    row = elem.parentElement.parentElement
    device = getDeviceAttr(row)
    console.log(device)

    document.querySelector('#modalEditLabel').innerHTML = `Editando: <strong>${device['name']}</strong>`
    document.querySelector('#modalEditIndex').value = device['index']
    document.querySelector('#modalEditName').value = device['name']
    document.querySelector('#modalEditGroup').value = device['group']
    document.querySelector('#modalEditId').value = device['id']
    document.querySelector('#modalEditKey').value = device['key']
    document.querySelector('#modalEditIcon').value = device['icon']
    document.querySelector('#modalEditDps').value = device['dps']

    modalEditService = document.querySelector('#modalEditService')
    serviceOptions = modalEditService.options
    for (i = 0; i < serviceOptions.length; i = i + 1) {
        if (serviceOptions[i].value == device['service']) {
            modalEditService.selectedIndex = i
        }
    }
}

function addDevice(elem) {
    elem.disabled = true

    const postdata = {
        name: document.querySelector('#modalAddName').value,
        group: document.querySelector('#modalAddGroup').value,
        service: document.querySelector('#modalAddService').options[document.querySelector('#modalAddService').selectedIndex].value,
        id: document.querySelector('#modalAddId').value,
        key: document.querySelector('#modalAddKey').value,
        icon: document.querySelector('#modalAddIcon').value,
        dps: document.querySelector('#modalAddDps').value
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(
        window.location.href + "/add", config
    )
    .finally(
        () => {location.reload()}
    )
}

function delDevice(elem) {
    elem.disabled = true

    const postdata = {
        index: document.querySelector('#modalConfirmDeleteLabel').getAttribute('deviceIndex')
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(
        window.location.href + "/del", config
    )
    .finally(
        () => {location.reload()}
    )
}

function showToast(text) {
    const toastElement = document.querySelector('#alertToast')
    toastElement.getElementsByClassName('toast-body')[0].innerHTML = text
    const toast = new bootstrap.Toast(toastElement)
    toast.show()
}

function editDevice(elem) {
    elem.disabled = true

    const postdata = {
        index: document.querySelector('#modalEditIndex').value,
        name: document.querySelector('#modalEditName').value,
        group: document.querySelector('#modalEditGroup').value,
        service: document.querySelector('#modalEditService').options[document.querySelector('#modalEditService').selectedIndex].value,
        id: document.querySelector('#modalEditId').value,
        key: document.querySelector('#modalEditKey').value,
        icon: document.querySelector('#modalEditIcon').value,
        dps: document.querySelector('#modalEditDps').value
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(
        window.location.href + "/edit", config
    )
    .finally(
        () => {location.reload()}
    )
}
