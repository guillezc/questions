import { Session }  from '../classes/session';

export class Vote {

    public $key: number;
    public day: string;
    public sessionId: string;
    public session: Session[];
    public question: string;
    public responses: any[];

    constructor(){}

}