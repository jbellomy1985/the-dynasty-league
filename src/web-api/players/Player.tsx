export type TPlayer = {
    player_id: string;
    fantasy_positions: string[];
    full_name: string;
    age: number;
}

export default class Player {
    _ID: string;
    _positions: string[];
    _name: string;
    _age: number;
    constructor(data: TPlayer) {
        this._ID = data.player_id;
        this._positions = data.fantasy_positions;
        this._name = data.full_name;
        this._age = data.age;
    }

    getID(): string {
        return this._ID;
    }

    getPositions(): string[] {
        return this._positions;
    }

    getName(): string {
        return this._name;
    }

    getAge(): number {
        return this._age;
    }
}
