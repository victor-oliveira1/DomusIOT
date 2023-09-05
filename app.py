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


all_groups = [ x['group'] for x in devices ]
unique_groups = set(all_groups)
groups = sorted(unique_groups)
new_devices = {}
for i in groups:
    new_devices.update({i:[ x for x in devices if x['group'] == i ]})


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html', groups=new_devices)

    elif request.method == 'POST':
        postdata = request.get_json()
        dev_id = postdata['dev_id']
        service = [ device['service'] for device in devices if device['id'] == dev_id ][0]
        cmd = postdata['cmd']

        if service == 'tuya':
            dps = postdata['dps']
            device = tt.OutletDevice(
                dev_id,
                address=[ device['ip'] for device in devices if device['id'] == dev_id ][0],
                version=[ device['version'] for device in devices if device['id'] == dev_id ][0]
            )
            [ device for device in devices if device['id'] == dev_id ][0]['ip'] =  device.address
            [ device for device in devices if device['id'] == dev_id ][0]['version'] = device.version

            if cmd == '1':
                device.turn_on(dps)
            elif cmd == '0':
                device.turn_off(dps)

        elif service == 'lgtv':
            if cmd == '0':
                sp.run(['lgtv', dev_id, 'off'])
            elif cmd == '1':
                sp.run(['lgtv', dev_id, 'on'])

        return jsonify({'method': 'POST'})

@app.route('/status', methods=['POST'])
def status():
    postdata = request.get_json()
    dev_id = postdata['dev_id']
    service = [ device['service'] for device in devices if device['id'] == dev_id ][0]

    if service == 'tuya':
        device = tt.OutletDevice(
            dev_id,
            address=[ device['ip'] for device in devices if device['id'] == dev_id ][0],
            version=[ device['version'] for device in devices if device['id'] == dev_id ][0]
        )
        [ device for device in devices if device['id'] == dev_id ][0]['ip'] =  device.address
        [ device for device in devices if device['id'] == dev_id ][0]['version'] = device.version

        status = device.status()

    return jsonify(status)

@app.route('/update', methods=['GET'])
def update():
    new_devices = tt.deviceScan()
    new_devices = [ new_devices[x] for x in new_devices ]

    for device in devices:
        dev_id = device['id']
        [ devices[devices.index(device)].update({'ip': x['ip']}) for x in new_devices if x['id'] == dev_id ]

    return redirect('/tuya')


if __name__ == "__main__":
    app.run()
