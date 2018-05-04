import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PrePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pre',
})
export class PrePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value
      .replace(/\n/g, '<br>')
      .replace(/ /g, '&nbsp;');
  }
}
