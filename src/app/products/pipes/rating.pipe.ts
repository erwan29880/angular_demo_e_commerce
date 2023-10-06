import { Pipe, PipeTransform } from '@angular/core';

// affichage d'étoiles à la place du float rating

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: number): string {
    let rating!: string;
    if (value < 4.05) rating = "⭐";
    else if (value < 4.25) rating = "⭐⭐";
    else if (value < 4.45) rating = "⭐⭐⭐";
    else if (value < 4.65) rating = "⭐⭐⭐⭐";
    else rating = "⭐⭐⭐⭐⭐";
    return rating;
  }
}
