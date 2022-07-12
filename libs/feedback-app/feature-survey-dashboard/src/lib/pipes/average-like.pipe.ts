import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageLike'
})
export class AverageLikePipe implements PipeTransform {


  transform(value?: number, ...args: unknown[]): unknown {
    if(value === 0){
      return '👎'
    }
    if(value === 1){
      return '👍'
    }

    return '-'
  }

}
