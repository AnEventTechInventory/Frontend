import axios from "axios";

class ApiObject {
    static apiRoot = 'http://localhost:5678/';

    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    /**
     * requests an object from the api
     * @param path the path to the object
     * @param id   the id of the object
     * @returns {Promise<*>} the object, or none if it doesn't exist or an error occurred
     */
    static async requestApi(path, id) {
        try {
            return await axios.get(this.apiRoot + path + "/" + id)
                .then(response => {
                    if (!response) {
                        throw new Error(`Error: No response returned`);
                    }
                    if (response.status !== 200) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    if (!response.data) {
                        throw new Error(`Error: No data returned`);
                    }
                    if (typeof response.data !== 'object') {
                        throw new Error(`Error: Data is not valid json`);
                    }
                    return response.data;
                })
                .catch(err => {
                    console.error(err);
                    return null
                });
        } catch (err) {
            console.log(err)
        }
        return null;
    }

    // abstract methods to be implemented by subclasses
    static fromApi(id) {
        throw new Error('Not implemented');
    }

    static fromJson(json) {
        throw new Error('Not implemented');
    }
}

export default ApiObject;