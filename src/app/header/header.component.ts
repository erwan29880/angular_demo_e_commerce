import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.components.html' 
})
export class HeaderComponent implements OnInit {
  // title: string = "Démo avec Angular"

  constructor(private changeUrl: Router) {}

  ngOnInit(): void {
  }

  // onAccueil() {
  //   this.changeUrl.navigate(['/articles'])
  // }

  // onArticles() {
  //   this.changeUrl.navigate(['/articles'])
  // }

  onProduit() {
    this.changeUrl.navigate(['/produit'])
  }
}
