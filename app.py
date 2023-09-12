from flask import Flask, render_template, request, redirect, url_for, jsonify, redirect
import tinytuya as tt
import json
import subprocess as sp
from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)


with open('devices.json') as fp:
    devices = json.load(fp)

devices = sorted(devices, key=lambda x: x['name'])

devices_grouped = {}
for group in sorted(set([x['group'] for x in devices])):
    devices_grouped.update({group: [ x for x in devices if x['group'] == group ]})

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', devices=devices_grouped)

@app.route('/device/set', methods=['POST'])
def device_set():
    data = request.get_json()
    device = [ x for x in devices if x['id'] == data['id'] ][0]

    if device['service'] == 'tuya':
        device_tuya = tt.OutletDevice(
            device['id'],
            local_key=device['key'],
            address=device['ip'],
            version=device['version']
        )

        if device_tuya.address:
            [ x for x in devices if x['id'] == device['id'] ][0]['ip'] = device_tuya.address
        if device_tuya.version:
            [ x for x in devices if x['id'] == device['id'] ][0]['version'] = device_tuya.version

        device_tuya.set_value(data['dps'], data['value'])
    elif device['service'] == 'lgtv':
        if data['value']:
            command = 'on'
        else:
            command = 'off'

        sp.run(
            [
                'lgtv',
                device['id'],
                command
            ]
        )

    return jsonify({})

@app.route('/device/status', methods=['POST'])
def device_status():
    data = request.get_json()
    device = [ x for x in devices if x['id'] == data['id'] ][0]

    if device['service'] == 'tuya':
        device_tuya = tt.OutletDevice(
            device['id'],
            local_key=device['key'],
            address=device['ip'],
            version=device['version']
        )

        if device_tuya.address:
            [ x for x in devices if x['id'] == device['id'] ][0]['ip'] = device_tuya.address
        if device_tuya.version:
            [ x for x in devices if x['id'] == device['id'] ][0]['version'] = device_tuya.version

        status = device_tuya.status()

    elif device['service'] == 'lgtv':
        status = {}

    return jsonify(status)


if __name__ == "__main__":
    app.run()
