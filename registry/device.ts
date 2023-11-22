import ApiObject from "./apiObject";
import Manufacturer from "./manufacturer";
import Location from "./location";
import Type from "./type"
import location from "./location";

class Device extends ApiObject{
    static apiPath: string = 'devices';

    private location: Location;
    private manufacturer: Manufacturer;
    private type: Type;
    private quantity: number;
    private contents: [string];
    
    constructor(id: string, deviceName: string, description: string, location: Location,
                manufacturer: Manufacturer, type: Type, quantity: number, contents: [string]) {
        super(id, deviceName, description);
        this.location = location;
        this.manufacturer = manufacturer;
        this.type = type;
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
    static async fromApi(id: string): Promise<Device> {
        return ApiObject.requestApi(Device.apiPath, id)
            .then((result) => { return this.fromJson(result); })
    }

    static async fromJson(json:
          { location: string; manufacturer: string; type: string; id: string; name: string;
            description: string; quantity: number; contents: [string]; }): Promise<Device> {
        const { id, name, description, quantity, contents } = json;
        let device = new Device(id, name, description, null, null, null, quantity, contents);

        let locationId = json.location
        await Location.fromApi(locationId).then((location: location) => {
            device.location = location;
        })

        let manufacturerId = json.manufacturer
        await Manufacturer.fromApi(manufacturerId).then((manufacturer: Manufacturer) => { device.manufacturer = manufacturer; })

        let typeId = json.type
        await Type.fromApi(typeId).then((type: Type) => { device.type = type; })

        return device
    }

    static fromJsonString(json: string) {
        return this.fromJson(JSON.parse(json));
    }
}

export default Device;