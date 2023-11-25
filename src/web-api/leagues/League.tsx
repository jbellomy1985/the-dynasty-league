import { List, Map } from "immutable";
import User from "./User";
import NFLState from "../nflState/NFLState";
import Roster from "./Roster";

enum Status {
    OFF_SEASON = "Off Season",
    IN_SEASON = "In Season",
    UNKOWN = ""
}

function getStatus(value: string): Status {
    switch(value) {
        case "pre_draft":
        case "drafting":
        case "complete":
            return Status.OFF_SEASON;
        case "in_season":
            return Status.IN_SEASON;
        default:
            return Status.UNKOWN;
    }
}

function buildUsers(leagueUsers: List<Map<string, any>>, rosters: List<Map<string, any>>, nflState: NFLState): User[] {
    const users: User[] = [];

    leagueUsers.forEach(leagueUser => {
        const rosterData: Map<string, any> | undefined = rosters.find(roster => roster.get("owner_id") === leagueUser.get("user_id"));
        const roster = new Roster(rosterData, nflState.getCurrentWeek());
        const user = new User(leagueUser, roster);
        users.push(user);
    });

    return users;
}

export default class League {
    static ID: string = "995785140678815744";
    static SPORT: string = "nfl";
    _name: string = "";
    _status: Status = Status.UNKOWN;
    _numTeams: number = 0;
    _users: User[] = [];
    _nflState: NFLState | null = null;

    constructor(
        league: Map<string, any> | null,
        users: List<Map<string, any>> | null,
        rosters: List<Map<string, any>> | null,
        nflState: Map<string, any> | null
    ) {
        this._name = league?.get("name");
        this._status = getStatus(league?.get("status"));
        this._numTeams = league?.get("total_rosters");
        this._nflState = new NFLState(nflState);
        if(users && rosters) {
            this._users = buildUsers(users, rosters, this._nflState);
        }
    }

    getName(): string {
        return this._name;
    }

    getStatus(): Status {
        return this._status;
    }

    getNumberOfTeams(): number {
        return this._numTeams;
    }

    getUsers(): User[] {
        return this._users;
    }

    getNFLState(): NFLState | null {
        return this._nflState;
    }
}
