import { Component, OnInit } from '@angular/core';
import { Observable, elementAt, filter } from 'rxjs';
import { ModeleProduct, CartInterface, Panier } from '../modele/modele';
import { ProductServiceService } from '../services/product-service.service';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';

/**
 * affiche tous les produits 
 * affiche la searchbar avec le panier dans le template
 */

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ["../style/produit.scss"]
})
export class ProduitsComponent implements OnInit {

  data!: ModeleProduct[];
  panier: Panier[] = [];
  isItems: boolean = false;
  nbItems: number = 0;
  cart: CartInterface = {};
  pattern!: string;
  loader$! : Observable<boolean>;

  constructor(private service: ProductServiceService, private route: Router, private panierService: PanierService) {}

  ngOnInit(): void {
    this.service.getPattern().subscribe(o => this.data=o);
    this.loader$ = this.service.getLoader()
    this.panierService.getPanier().subscribe(els => this.panier = els);
  }

  // go to product/id
  onChangeUrl(event: MouseEvent, id: number) : void {
    this.route.navigate(['/produit', id ])
  }

  // ajout item au panier
  onAddItem(event: MouseEvent, title: string, price: number, image: string) : void{
    let isPresent: boolean = false;
    for (let item of this.panier) {
      if (item.title === title) {
        item.nombre++;
        isPresent = true;
      }
    }
    
    if(!isPresent) {
      const pan: Panier = {
        title: title,
        nombre: 1,
        price: price,
        image: image
      };
      this.panier.push(pan);
    }
    this.panierService.setPanier(this.panier);
  }

}
