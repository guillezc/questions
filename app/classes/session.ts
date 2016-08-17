import { Speaker }  from '../classes/speaker';

export class Session {

    public $key: number;
    public allDay: boolean;
    public day: number;
    public description: string;
    public endTime: Date;
    public hasDetails: boolean;
    public location: string;
    public onMySchedule: boolean;
    public slug: string;
    public managers: Speaker[];
    public speakers: Speaker[];
    public startTime: Date;
    public tags: any[];
    public title: string;

    constructor(){}

}

