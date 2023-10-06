import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Panier } from '../modele/modele';
import { PanierService } from '../services/panier.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

/**
 * visualisation du panier dans la page panier
 * permet d'ajouter ou retirer des items
 * permet de valider le panier
 */

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit {

  data: Panier[] = [];
  somme: number = 0;

  constructor(private route: Router, private servicePanier: PanierService){}

  ngOnInit() {
    this.servicePanier.getPanier().subscribe(els => {
      this.data = els;
      this.recalcSomme();
    }) 
  }

  getCurrentSlideUrl(url: string) : string | null{
    if (this.data) {
      return `url(${url})`;
    }
    return null;
  }

  // suprimer toute la ligne d'article
  onSupr(event : MouseEvent, id: number) {
    this.servicePanier.deleteRow(id, this.data);
    this.recalcSomme();
  }

  // ajouter un article
  onAddItem(event: MouseEvent, id: number) {
    this.servicePanier.addItem(id, this.data);
    this.recalcSomme();
  }

  // soustraire un article
  onSuprItem(event: MouseEvent, id: number) {
      this.servicePanier.deleteItem(id, this.data)
      this.recalcSomme();
  }

  // calcul du montant du panier
  recalcSomme() : void {
    if (this.data.length != 0) {
      this.somme = this.data.reduce((a, s) => a + (s.nombre * s.price), 0);
    } else {
      this.somme = 0;
    }
  }

  // valider le panier et aller au infos billing
  onValidateCart() : void {
    if (this.somme !== 0 || this.data.length !==0) {
      this.route.navigate(['/billing']);
    }
  }
}
