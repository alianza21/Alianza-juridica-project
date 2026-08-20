import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-banner-consultation',
  standalone: true,
  imports: [RouterModule, CommonModule, NgStyle],
  templateUrl: './banner-consultation.component.html',
  styleUrls: ['./banner-consultation.component.scss'],
})
export class BannerConsultationComponent {
  @Input() title = 'Nos importa, nosotros pelearemos sus derechos';
  @Input() subtitle = 'Personal serio y responsable con su caso'; //url opcional
  @Input() buttons: { label: string; route?: string; href?: string; primary?:boolean }[] = [
    { label: 'Solicitar consulta', route: '/consulta', primary: true },
    { label: 'Mas Informacion', route: '/about'}
  ]
backgroundImage = '/images/banner-consultation/banner-consultation-image1.webp';

  
}