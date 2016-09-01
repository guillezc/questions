import { Session }  from '../classes/session';
import { Vote }  from '../classes/vote';

export class Survey {

    public $key: number;
    public sessionId: string;
    public session: Session[];
    public question: string;
    public options: Vote[];

    constructor(){}

}