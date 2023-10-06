import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';

/**
 * barre de recherche intégrée dans le template cartbar
 * recherches sur la page produits
 */

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.scss']
})
export class SearchbarComponent implements OnInit {

  searchbarinput!: FormGroup;
  asccheck: boolean = false;
  desccheck: boolean = false;

  constructor(private service: ProductServiceService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchbarinput = this.formBuilder.group({
      pattern : new FormControl("")
    })
  }

  // options de tri

  setPattern(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.service.setPattern(value);
  }

  sortAsc() {
    this.service.setLoader(true);
    this.service.setTriId(false);
    this.service.setTriPrixAsc(false);
    this.service.setTriPrixDesc(false);
    this.service.setDesc(false);
    this.service.setAsc(true);
  }

  sortDesc() {
    this.service.setLoader(true);
    this.service.setTriPrixAsc(false);
    this.service.setTriPrixDesc(false);
    this.service.setTriId(false);
    this.service.setAsc(false);
    this.service.setDesc(true);
  }

  sortTriId() {
    this.service.setLoader(true);
    this.service.setTriPrixAsc(false);
    this.service.setTriPrixDesc(false);
    this.service.setAsc(false);
    this.service.setDesc(false);
    this.service.setTriId(true);
  }

  sortPrixAsc() {
    this.service.setLoader(true);
    this.service.setTriPrixDesc(false);
    this.service.setAsc(false);
    this.service.setDesc(false);
    this.service.setTriId(false);
    this.service.setTriPrixAsc(true);
  }

  sortPrixDesc() {
    this.service.setLoader(true);
    this.service.setTriPrixAsc(false);
    this.service.setAsc(false);
    this.service.setDesc(false);
    this.service.setTriId(false);
    this.service.setTriPrixDesc(true);
  }
}
