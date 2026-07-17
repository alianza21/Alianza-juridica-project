import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  // Si ya tienes un servicio de branding, reemplaza esto por la inyección del servicio.
  branding = {
    contact: {
      address: 'Puerto Berrío. Calle 48 n. 6 - 40, Barrio El Hoyo',
      mail: 'alianzjuridicamedellin@gmail.com',
      phone: '302-779-6666'
    }
  };

  // URL del documento completo (PDF u otro). Ajusta la ruta real en assets o servidor.
  fullDocUrl = '../../../assets/docs/politica-tratamiento-datos.pdf';

  downloadFullDoc(): void {
    // Abrir en nueva pestaña; si prefieres descargar, usar anchor con download.
    window.open(this.fullDocUrl, '_blank', 'noopener');
  }
}
