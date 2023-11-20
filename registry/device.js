import ApiObject from "./apiObject";
import Manufacturer from "./manufacturer";
import Location from "./location";
import async from "async";

class Device extends ApiObject{
    static apiPath = 'devices';
    constructor(id, deviceName, description, location, manufacturer, quantity, contents) {
        super(id, deviceName, description);
        this.location = location;
        this.manufacturer = manufacturer;
        this.quantity = quantity;
        this.contents = contents;
    }

    toString() {
        return JSON.stringify(this);
    }

    /**
     * loads the device from the api and deserializes it. Also loads dependencies. Not contents.
     * @param id the UUID of the device
     */
    static async fromApi(id) {
        return ApiObject.requestApi(Device.apiPath, id)
            .then((result) => { return this.fromJson(result); })
    }

    static async fromJson(json) {
        const { id, name, description, quantity, contents } = json;
        let device = new Device(id, name, description, null, null, quantity, contents);

        let locationId = json.location
        await Location.fromApi(locationId).then((location) => {
            device.location = location;
        })

        let manufacturerId = json.manufacturer
        await Manufacturer.fromApi(manufacturerId).then((manufacturer) => { device.manufacturer = manufacturer; })

        return device
    }

    static fromJsonString(json) {
        return this.fromJson(JSON.parse(json));
    }
}

export default Device;