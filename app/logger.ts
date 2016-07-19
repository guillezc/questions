import {Injectable, provide} from '@angular/core';


@Injectable()
export class Logger {
  public log(log:any) {
    console.log(log); 
  }
}