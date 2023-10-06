import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Panier } from '../modele/modele';

/**
 * gestion du panier
 */

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private _panier = new BehaviorSubject<Panier[]>([]);
  private _panier$ = this._panier.asObservable();

  setPanier(panier: Panier[]) {
    return this._panier.next(panier);
  }

  getPanier() : Observable<Panier[]>{
    return this._panier$;
  }

  deleteItem(id: number, data: Panier[]) {
    if(data[id].nombre === 1) {
      data.splice(id, 1)
    } else {
      data[id].nombre--;
    }
    return this._panier.next(data);
  }

  deleteRow(id: number, data: Panier[]){
    data.splice(id, 1);
    return this._panier.next(data);
  }

  addItem(id: number, data: Panier[]) {
    data[id].nombre++;
    return this._panier.next(data);
  }
}
