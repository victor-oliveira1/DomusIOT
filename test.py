import json
import tinytuya

with open('devices.json') as fp:
    devices = json.load(fp)

for d in devices:
    print(d)
    try:
        print(tinytuya.OutletDevice(d['id'], d['ip'], d['key'], version=3.3).status())
    except:
        continue
