import ApiObject from "./apiObject";

class Location extends ApiObject {
    constructor(id: string, name: string, description: string) {
        super(id, name, description);
    }
    static apiPath = "location";

    static async fromApi(locationId: string): Promise<Location> {
        return ApiObject.requestApi(Location.apiPath, locationId)
            .then((result) => { return this.fromJson(result); })
    }

    static fromJson(json: { id: string; name: string; description: string; }) {
        return new Location(json.id, json.name, json.description);
    }
}

export default Location;