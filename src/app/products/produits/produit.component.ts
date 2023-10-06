import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ModeleProduct } from '../modele/modele';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from '../services/panier.service';
import { Panier } from '../modele/modele';

/**
 * affiche un seul produit
 */

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['../style/produit.scss']
})
export class ProduitComponent implements OnInit{

  data!: ModeleProduct | null;
  erreur!: string | null;
  currentIndex: number = 0;
  panier: Panier[] = [];

  constructor(private service: ProductServiceService, private route: ActivatedRoute, private router: Router, private panierService: PanierService) {}

  ngOnInit () : void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    if (id !== null) {
      this.service.getDataById(id).subscribe(o => this.data = o);
    } else {
      this.erreur = "L'item n'a pas pu être chargé !";
    }
    this.panierService.getPanier().subscribe(els => this.panier = els);
  }

  // gestion slider
  getCurrentSlideUrl() : string | null{
    if (this.data) {
      return `url(${this.data.images[this.currentIndex]})`;
    }
    return null;
  }

  goToPrevious(): void {
    if (this.data) {
      const isFirstSlide = this.currentIndex === 0;
      const newIndex = isFirstSlide
        ? this.data.images.length - 1
        : this.currentIndex - 1;
      this.currentIndex = newIndex;
    }
  }
  
  goToNext(): void {
    if (this.data) {
      const isLastSlide = this.currentIndex === this.data.images.length - 1;
      const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
      this.currentIndex = newIndex;
    }
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  checkActive(slideIndex: number) : string {
    return slideIndex === this.currentIndex ? "red" : "black";
  }

  // routing
  onChangeUrl() : void {
    this.router.navigate(['/produit']);
  }

  onChangeToCart() : void {
    this.router.navigateByUrl('/cart', {state : {k:'vle'} });
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
