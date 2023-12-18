export default class Stats {
    _positionRank: number;
    _points: number;
    constructor(data: Map<string, any>) {
        this._positionRank = data?.get("pos_rank_ppr") || 999;
        this._points = data?.get("pts_ppr") || 0;
    }

    getPositionRank(): number {
        return this._positionRank;
    }

    getPoints(): number {
        return this._points;
    }
}
