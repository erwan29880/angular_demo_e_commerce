import { Pipe, PipeTransform } from '@angular/core';

// rond de couleur pour la catégorie

@Pipe({
  name: 'categorie'
})
export class CategoriePipe implements PipeTransform {

  transform(value : string): string {
    return value === "smartphones" ? "smartphone" : "laptop";
  }
}
