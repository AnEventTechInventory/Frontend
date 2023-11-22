import ApiObject from "./apiObject";

class Location extends ApiObject {
    constructor(id, name, description) {
        super(id, name, description);
    }
    static apiPath = "location";

    static fromApi(locationId) {
        let json = ApiObject.requestApi(Location.apiPath, locationId);
        return json.then(
            (result) => {
                if (result) {
                    return this.fromJson(result);
                }
            }
        )
    }

    static fromJson(json) {
        return new Location(json.id, json.name, json.description);
    }
}

export default Location;