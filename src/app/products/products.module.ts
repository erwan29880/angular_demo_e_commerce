import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsComponent } from './produits/produits.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CategoriePipe } from './pipes/categorie.pipe';
import { PrixColorPipe } from './pipes/prix-color.pipe';
import { RatingPipe } from './pipes/rating.pipe';
import { ProduitComponent } from './produits/produit.component';
import { CartComponent } from './cart/cart.component';
import { BillingComponent } from './infospaiement/billing/billing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightCardDirective } from './directives/highlight.directive';
import { BorderCardDirective } from './directives/border.directive';
import { CartbarComponent } from './cartbar/cartbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { LoaderComponent } from '../loader/loader.component';

const routesProduits = [
  {path: "produit", component: ProduitsComponent},
  {path: "produit/:id", component: ProduitComponent},
  {path: "cart", component: CartComponent},
  {path: "billing", component: BillingComponent},
  {path: "", component: ProduitComponent}
]

@NgModule({
  declarations: [
    ProduitsComponent,
    CategoriePipe,
    PrixColorPipe,
    RatingPipe,
    ProduitComponent,
    CartComponent,
    BillingComponent,
    HighlightCardDirective,
    BorderCardDirective,
    CartbarComponent,
    SearchbarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesProduits)
  ]
})
export class ProductsModule { }
