import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import pubSub from 'pubsub-js'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  tokenPubSubModuleOpened?: string;
  title?: string = 'Redirigiendo...';
  description?: string = 'Lo estamos redirigiendo al módulo de acceso, espere un momento por favor.';
  redirectionComplete: boolean = false;
  routeData?: ActivatedRouteSnapshot | any;
  newWindow: any;

  constructor(private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    pubSub.unsubscribe(this.tokenPubSubModuleOpened!);
  }

  ngOnInit() {

    // Enviar mensaje al shell
    pubSub.publish('openModule', true);

    // Recibir mensaje del shell
    this.tokenPubSubModuleOpened = pubSub.subscribe(
      'moduleOpened',
      (_message, data: ActivatedRouteSnapshot | any) => {

        setTimeout(() => {
          this.routeData = data?.routeConfig;
          const urlExternal = this.routeData?.children?.[0].urlExternal;
          console.log(this.routeData);

          if (!urlExternal) {
            console.error("urlExternal no está definida o es posible que data.routeConfig.children no esté definida o esté vacía");
          }

          this.newWindow = window.open(urlExternal, '_blank');
          if (this.newWindow) {
              console.log("Ventana abierta con éxito.");
          } else {
              console.error("La ventana no se pudo abrir.");
          }
          this.redirectionComplete = true;
          this.title = "Módulo abierto";
          
        }, 2000);

        pubSub.unsubscribe(this.tokenPubSubModuleOpened!);
      }
    );
  }

  focusOnNewWindow() {
    if (this.newWindow && !this.newWindow.closed) {
        this.newWindow.focus();
    } else {
        this.newWindow = window.open(this.routeData.children?.[0].urlExternal, '_blank');
    }
  }

}

