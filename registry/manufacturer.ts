import axios from "axios";
import ApiObject from "./apiObject";
import Location from "./location";

class Manufacturer extends ApiObject {
    static apiPath = 'manufacturer';

    constructor(id: string, name: string, description: string) {
        super(id, name, description);
    }
    static async fromApi(manufacturerId: string): Promise<Manufacturer> {
        let json = Manufacturer.requestApi(Manufacturer.apiPath, manufacturerId);
        const result = await json;
        if (result) {
            return this.fromJson(result);
        }
    }

    static fromJson(json: { id: string; name: string; description: string; }): Manufacturer {
        return new Manufacturer(json.id, json.name, json.description);
    }
}

export default Manufacturer;