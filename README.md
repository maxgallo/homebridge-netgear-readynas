# Homebridge Netgear ReadyNAS Plugin

This is an accessory plugin for [Homebridge](https://github.com/nfarina/homebridge) allowing to control
Netgear ReadyNAS devices.

## What does this plugin do?

This plugin can do the following things

- Turn _on_ the NAS
- Turn _off_ the NAS
- Check if the NAS is turned _on/off_

## Requirements

This plugin uses [`wakeonlan`](https://github.com/jpoliv/wakeonlan) so it has to be installed in the same  

## Install

Install `wakeonlan` (using `brew` is probably easier)

```
brew install wakeonlan
```

If you have already installed `homebridge` globally, just install

```
npm install -g homebridge-netgear-readynas
```

## Configuration

The plugin registers itself as `ReadyNasSwitch`. You have the following options:

| Option   | Description   |
| -------- | --------- |
| host     | IP of the machine |
| user     | web app username |
| password   | web app password |
| mac | NAS MAC address|

### Example config.json


```json
{
  "bridge": {
    "name": "Homebridge",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },
  "description": "This is an example configuration file with netgear readynas plugin.",
  "accessories": [
    {
      "accessory": "ReadyNasSwitch",
      "host" : "192.168.2.10",
      "user" : "readynasWebUsername",
      "password" : "readynasWebPasswprd",
      "mac" : "a0:31:b7:b0:a0:a1"
    }
  ],
}
```
