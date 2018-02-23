const shutdow = require('./commands/shutdown');
const wakeup = require('./commands/wakeup');
const status = require('./commands/status');

function setup(homebridge) {
    const Service = homebridge.hap.Service;
    const Characteristic = homebridge.hap.Characteristic;

    function mySwitch(log, config) {
        this.log = log;
        //this.getUrl = url.parse(config['getUrl']);
        //this.postUrl = url.parse(config['postUrl']);
    }

    mySwitch.prototype = {
        getServices: function () {
            let informationService = new Service.AccessoryInformation();
            informationService
                .setCharacteristic(Characteristic.Manufacturer, "Netgear")
                .setCharacteristic(Characteristic.Model, "ReadyNAS")
                .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

            let switchService = new Service.Switch("ReadyNAS");
            switchService
                .getCharacteristic(Characteristic.On)
                .on('get', this.getSwitchOnCharacteristic.bind(this))
                .on('set', this.setSwitchOnCharacteristic.bind(this));

            this.informationService = informationService;
            this.switchService = switchService;
            return [informationService, switchService];
        },
        getSwitchOnCharacteristic: function (next) {
            const nasStatus = status();
            next(null, nasStatus);
        },
        setSwitchOnCharacteristic: function (on, next) {
            if (on) {
                wakeup();
                return next();
            }

            shutdow();
            next();
        }
    };

    homebridge.registerAccessory("switch-plugin", "ReadyNasSwitch", mySwitch);
}

module.exports = setup;
