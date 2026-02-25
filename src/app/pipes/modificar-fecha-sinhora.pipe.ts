import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FechaSinhora'
})
export class ModificarFechaSinhoraPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.split(" ")[0];
  }

}
