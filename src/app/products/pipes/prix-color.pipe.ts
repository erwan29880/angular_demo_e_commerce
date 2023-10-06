import { Pipe, PipeTransform } from '@angular/core';

// changement de couleur en fonction du prix

@Pipe({
  name: 'prixColor'
})
export class PrixColorPipe implements PipeTransform {

  transform(value: number): string {
    let cl: string = "";
    if (value < 500) {
      cl = "moins";
    } else if (value < 1000) {
      cl = "moyen";
    } else {
      cl = "plus";
    }
    return cl;
  }

}
