import { Component } from '@angular/core';

/**
 * loader
 * css déclaré dans le fichier principal
 * loader importé dans le module products
 */

@Component({
  selector: 'app-loader',
  template: `
  <div class="centrer-loader">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
  `
})
export class LoaderComponent {
}
