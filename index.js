const shutdow = require('./commands/shutdown');
const wakeup = require('./commands/wakeup');
const status = require('./commands/status');

function setup(homebridge) {
    const Service = homebridge.hap.Service;
    const Characteristic = homebridge.hap.Characteristic;

    function mySwitch(log, config) {
        this.log = log;
        this.host = config.host;
        this.user = config.user;
        this.password = config.password;
        this.mac = config.mac;
        this.name = config.name || "ReadyNAS";
        this.version = config.version;
    }

    mySwitch.prototype = {
        getServices: function () {
            let informationService = new Service.AccessoryInformation();
            informationService
                .setCharacteristic(Characteristic.Manufacturer, "Netgear")
                .setCharacteristic(Characteristic.Model, "ReadyNAS")
                .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

            let switchService = new Service.Switch(this.name);
            switchService
                .getCharacteristic(Characteristic.On)
                .on('get', this.getSwitchOnCharacteristic.bind(this))
                .on('set', this.setSwitchOnCharacteristic.bind(this));

            this.informationService = informationService;
            this.switchService = switchService;
            return [informationService, switchService];
        },
        getSwitchOnCharacteristic: function (next) {
            const nasStatus = status(this.host);
            next(null, nasStatus);
        },
        setSwitchOnCharacteristic: function (on, next) {
            if (on) {
                wakeup(this.mac);
                return next();
            }

            shutdow(this.user, this.password, this.host, this.version);
            next();
        }
    };

    homebridge.registerAccessory("switch-plugin", "ReadyNasSwitch", mySwitch);
}

module.exports = setup;
