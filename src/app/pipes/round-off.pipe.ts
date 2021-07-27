import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundOff'
})
export class RoundOffPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
