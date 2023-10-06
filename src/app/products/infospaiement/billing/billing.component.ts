import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../services/panier.service';
import { Panier } from '../../modele/modele';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * formulaire pour entrer les informations de facturation et d'expédition
 */

@Component({
  selector: 'app-billing',
  templateUrl : './billing.component.html',
  styleUrls: ['./billing.scss']
})
export class BillingComponent implements OnInit {

  panier!: Panier[];
  somme: number = 0;
  infos!: FormGroup;
  notSubmitted: boolean = true;

  constructor(private panierService: PanierService, private formBuilder: FormBuilder){}

  ngOnInit() {

    this.infos = this.formBuilder.group({
      nom : new FormControl("", { validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern("^[a-zA-Z àéèùçîïôö'-]*$")
      ], updateOn: 'change'}),
      prenom : new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern("^[a-zA-Z àéèùçîïôö]*$")
      ]),
      adresse : new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern("^[0-9a-zA-Z àéèùçîïôö]*$")
      ]),
      zipcode : new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern("^[0-9]*$")
      ]), 
      ville : new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.pattern("^[a-zA-Z àéèùçîïôö]*$")
      ]),
      email : new FormControl("", [
        Validators.required,
        Validators.email
      ])
    })

    this.panierService.getPanier().subscribe(els => this.panier = els);
    this.recalcSomme();
  }

  // calculer montant total de la commande
  recalcSomme() : void {
    if (this.panier.length != 0) {
      this.somme = this.panier.reduce((a, s) => a + (s.nombre * s.price), 0);
    }
  }

  // TODO : faire quelque chose au submit
  onSubmit() {
    this.notSubmitted = false;
  }


  // gestion validators

  get nom() {
    return this.infos.controls['nom'];
  }

  get prenom() {
    return this.infos.controls['prenom'];
  }

  get adresse() {
    return this.infos.controls['adresse'];
  }

  get zipcode() {
    return this.infos.controls['zipcode'];
  }

  get ville() {
    return this.infos.controls['ville'];
  }
}
