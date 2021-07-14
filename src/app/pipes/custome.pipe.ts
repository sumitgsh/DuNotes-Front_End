import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';



@Pipe({name: 'subjectShort'})
export class CustomePipe implements PipeTransform {
  transform(value: string) {
    return value.length>18?value.substr(0,18)+"...":value;
  }
}