// TODO: Parser simple
export class JsonParser {
    constructor(type) {
        this.type = type;
    }

    parse(data) {
        if (Array.isArray(data)) {
            return data.map(item => new this.type(item));
        } else {
            return new this.type(data);
        }
    }
}