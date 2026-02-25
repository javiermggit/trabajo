import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'VacunacionPipe',
  pure: false
})
export class VacunacionPipe implements PipeTransform {

  /**
   * Filtra de acuerdo a la edad 
   * @param items Listado de edades
   * @param edades edad a filtrar
   */
  transform(items: any[] , edad:string): any {
    if (!items ) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.edad == edad);
}

}
