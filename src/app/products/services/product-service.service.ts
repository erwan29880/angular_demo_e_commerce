import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModeleProduct } from '../modele/modele';
import { map, filter, Observable, BehaviorSubject, switchMap, of, mergeMap, debounceTime, distinctUntilChanged, combineLatest } from 'rxjs'
import { ajax } from 'rxjs/ajax';

/**
 * Service pour obtenir les produits du serveur
 * et effectuer des tris sur les données via les recherches de la searchbar
 */

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  // recherche dans les produits
  private _pattern = new BehaviorSubject<string>("");
  private _pattern$ = this._pattern.asObservable();
  private _asc = new BehaviorSubject<boolean>(false);
  private _asc$ = this._asc.asObservable();
  private _desc = new BehaviorSubject<boolean>(false);
  private _desc$ = this._desc.asObservable();
  private _triId = new BehaviorSubject<boolean>(true);
  private _triId$ = this._triId.asObservable();
  private _triPrixAsc = new BehaviorSubject<boolean>(false);
  private _triPrixAsc$ = this._triPrixAsc.asObservable();
  private _triPrixDesc = new BehaviorSubject<boolean>(false);
  private _triPrixDesc$ = this._triPrixDesc.asObservable();
  
  // loader
  private _loader = new BehaviorSubject<boolean>(false);
  private _loader$ = this._loader.asObservable();

  constructor(private http: HttpClient) {}

  
  getPattern() : Observable<ModeleProduct[]>{
    console.log(this._asc)
   return combineLatest([this._pattern$, this.getData(), this._asc$, this._desc$, this._triId$, this._triPrixAsc$, this._triPrixDesc$]).pipe(
    debounceTime(300),
    map(([pattern, data, asc, desc, triId, prixAsc, prixDesc]) => {
      if (asc === true) {   // tri alphabétique croissant
        data.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : (a.title.toLowerCase() < b.title.toLowerCase()) ? - 1 : 0 )
      } 
      if(desc === true) {   // tri alphabétique décroissant
        data.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (a.title.toLowerCase() > b.title.toLowerCase()) ? - 1 : 0 )
      }
      if (triId === true) {  // tri par id -> tri initial venant du serveur
        data.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? - 1 : 0 )
      }
      if (prixAsc === true) {  // tri prix croissant
        data.sort((a, b) => (a.price > b.price) ? 1 : (a.price < b.price) ? - 1 : 0 )
      }
      if (prixDesc === true) {  // tri prox décroissant
        data.sort((a, b) => (a.price < b.price) ? 1 : (a.price > b.price) ? - 1 : 0 )
      }
      this.setLoader(false)   // désactiver le loader de la page produits.components.html

      // recherche par searchbar, le défaut est une chaîne vide
      return data.filter(e => e.title.toLowerCase().search(pattern.toLowerCase())!==-1) as ModeleProduct[]
    })
   )
  }


  // getters et setters

  setPattern(pattern: string) {
    this._pattern.next(pattern);
  }

  setAsc(value: boolean) {
    this._asc.next(value);
  }

  setDesc(value: boolean) {
    this._desc.next(value);
  }

  setTriId(value: boolean) {
    this._triId.next(value);
  }

  setTriPrixAsc(value: boolean) {
    this._triPrixAsc.next(value);
  }
 
  setTriPrixDesc(value: boolean) {
    this._triPrixDesc.next(value);
  }

  getData() {
    return this.http.get<ModeleProduct[]>('http://212.227.74.246:3001/products');
  }

  getDataById(id: string) {
    const url = "http://212.227.74.246:3001/products/" + id;
    return this.http.get<ModeleProduct>(url);
  }

  getLoader() {
    return this._loader$;
  }

  setLoader(value: boolean) {
    return this._loader.next(value);
  }
}
