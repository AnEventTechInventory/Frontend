import axios from "axios";
import ApiObject from "./apiObject";
import Location from "./location";

class Manufacturer extends ApiObject {
    static apiPath = 'manufacturer';

    constructor(id, name, description) {
        super(id, name, description);
    }
    static fromApi(manufacturerId) {
        let json = Manufacturer.requestApi(Manufacturer.apiPath, manufacturerId);
        return json.then(
            (result) => {
                if (result) {
                    return this.fromJson(result);
                }
            }
        )
    }

    static fromJson(json) {
        return new Manufacturer(json.id, json.name, json.description);
    }
}

export default Manufacturer;