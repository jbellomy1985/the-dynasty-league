import { Map } from "immutable";

export default class Division {
    _avatarLink: string;
    _name: string;
    constructor(avatar: string, name: string) {
        this._avatarLink = avatar;
        this._name = name;
    }

    getAvatarLink(): string {
        return this._avatarLink;
    }

    getName(): string {
        return this._name;
    }
}