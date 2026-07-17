import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class FooterComponent {
      // Datos (ajusta según necesites)
  public phoneLocal = '3027796666'; // número local (sin prefijo internacional)
  public phoneInternational = '573027796666'; // formato internacional sin '+', ej. 57 (Colombia) + número
  public whatsappMessage = 'Hola, quiero información sobre sus servicios legales.'; // mensaje por defecto
  public address = 'Puerto Berrío, Calle 48 n. 6 - 40, Barrio El Hoyo, Colombia';
  public email = 'alianzajuridicamedellin@gmail.com'; // si es gmail, asegúrate del formato correcto: ejemplo@gmail.com

  // Getters que devuelven las URLs ya codificadas
  get telHref(): string {
    return `tel:+${this.phoneInternational}`;
  }

  get whatsappHref(): string {
    // wa.me requiere número en formato internacional sin signos y un texto opcional codificado
    const text = encodeURIComponent(this.whatsappMessage);
    return `https://wa.me/${this.phoneInternational}?text=${text}`;
  }

  get mapsHref(): string {
    // Google Maps search URL con query codificada
    const q = encodeURIComponent(this.address);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  get mailtoHref(): string {
    const subject = encodeURIComponent('Consulta desde sitio web');
    const body = encodeURIComponent('Hola, quisiera recibir información sobre...');
    return `mailto:${this.email}?subject=${subject}&body=${body}`;
  }
}