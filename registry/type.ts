import axios from "axios";
import ApiObject from "./apiObject";

class Type extends ApiObject {
    static apiPath = 'type';

    constructor(id: string, name: string, description: string) {
        super(id, name, description);
    }
    static async fromApi(typeId: string) {
        let json = Type.requestApi(Type.apiPath, typeId);
        const result = await json;
        if (result) {
            return this.fromJson(result);
        }
    }

    static fromJson(json: { id: string; name: string; description: string; }) {
        return new Type(json.id, json.name, json.description);
    }
}

export default Type;