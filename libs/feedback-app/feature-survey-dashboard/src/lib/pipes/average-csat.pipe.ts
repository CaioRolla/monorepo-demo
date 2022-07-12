import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageCSAT'
})
export class AverageCSATPipe implements PipeTransform {

  public readonly CSATrange = ['😡', '😕', '😐', '😊', '😍'];


  transform(value?: number, ...args: unknown[]): unknown {
    if(value === undefined){
      return '-'
    }

    return `${this.CSATrange[value]}`
    // return `${value} ${this.CSATrange[value]}`
  }

}
