import { Pipe } from '@angular/core';

@Pipe({
  name: 'objToArr',
  pure: false
})

export class ObjToArrPipe {
  transform(object:any) {
    var newArr = []
    for (var key in object) {
        newArr.push(object[key]);
    }
    return newArr;
  }
}