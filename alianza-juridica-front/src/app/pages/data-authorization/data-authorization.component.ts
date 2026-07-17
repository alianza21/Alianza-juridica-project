import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-data-authorization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-authorization.component.html',
  styleUrls: ['./data-authorization.component.scss']
})
export class DataAuthorizationComponent implements OnInit {
  // Si ya tienes un servicio de branding, reemplaza este objeto por la inyección del servicio.
  branding = {
    contact: {
      address: 'Puerto Berrío. Calle 48 n. 6 - 40, Barrio El Hoyo',
      mail: 'alianzjuridicamedellin@gmail.com',
      phone: '302-779-6666'
    }
  };

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Soto Argel & Asociados - Autorización de tratamiento de datos');
    this.meta.updateTag({
      name: 'description',
      content: 'Autorización de tratamiento de datos personales para Soto Argel & Asociados'
    });
  }
}
