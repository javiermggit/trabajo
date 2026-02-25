import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BrandingService {

  //cliente = environment.cliente.toLowerCase();

loadFonts(): Promise<void> {
  return new Promise(resolve => {
    //const style = document.createElement('style');
    // style.innerHTML = `
    //   @font-face {
    //     font-family: "adineue PRO";
    //     src: url("/${this.cliente}/HCHealth/assets/css/adineuePRO/IE9/b82329475307e0380dc1ea23f0c35266.eot");
    //     src:
    //       url("/${this.cliente}/HCHealth/assets/css/adineuePRO/iefix/b82329475307e0380dc1ea23f0c35266.eot") format("embedded-opentype"),
    //       url("/${this.cliente}/HCHealth/assets/css/adineuePRO/chrome/b82329475307e0380dc1ea23f0c35266.woff2") format("woff2"),
    //       url("/${this.cliente}/HCHealth/assets/css/adineuePRO/chrome/b82329475307e0380dc1ea23f0c35266.woff") format("woff"),
    //       url("/${this.cliente}/HCHealth/assets/css/adineuePRO/chrome/b82329475307e0380dc1ea23f0c35266.ttf") format("truetype");
    //   }
    // `;
    //document.head.appendChild(style);
    //resolve();
  });
}
}
