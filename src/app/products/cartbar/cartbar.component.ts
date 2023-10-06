import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';
import { CartInterface } from '../modele/modele';
import { Panier } from '../modele/modele';

/**
 * gestion de l'image du caddie
 */

@Component({
  selector: 'app-cartbar',
  templateUrl: './cartbar.component.html',
  styleUrls: ["./cartbar.scss"]
})
export class CartbarComponent  implements OnInit{
  panier: Panier[] = [];
  isItems: boolean = false;
  nbItems: number = 0;
  cart: CartInterface = {};

  constructor(private route: Router, private panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.getPanier().subscribe(els => {
      this.panier = els;
      if (this.panier.length !== 0) {
        this.nbItems = 0;
        this.isItems = true;
        this.calculNbItems();
      } else {
        this.isItems = false;
      }
    })
  }

  // go to cart
  onChargeCart() : void {
    this.route.navigate(['/cart']);
  }

  // cahngement d'image si le cart est vide ou non
  getCardImage() : string {
    if (this.isItems) {
      return `url('/assets/cartred.png')`;
    } else {
      return `url('/assets/cartempty.png')`;
    }
  }
 
  // calcul du nombre d'item pour afficher le nombre sur l'image du panier
  calculNbItems() : void {
    for(let row of this.panier) {
      this.nbItems += row.nombre;
    }
  }
}
