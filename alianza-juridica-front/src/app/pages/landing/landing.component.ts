import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SplitSectionComponent } from './components/split-section/split-section.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';
import { FaqAccordionComponent } from '../../shared/faq-accordion/faq-accordion.component';
import { NgOptimizedImage } from '@angular/common';
import { SwiperComponent, SwiperItem } from '../../shared/swiper/swiper.component';
import { TestimonialItem, TestimonialSwiperComponent } from '../../shared/testimonial-swiper/testimonial-swiper.component';


@Component({
    selector: 'app-landing',
    standalone:     true,
    imports: [SplitSectionComponent, 
        FaqAccordionComponent,
        NgOptimizedImage,
        SwiperComponent,
        TestimonialSwiperComponent
    ],
    //imports: [RouterLink],
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})

export class LandingComponent {
    // landing.component.ts
    public sobreNosotros = 'images/split-section/sobre-nosotros.webp';
    public laboral = 'images/split-section/laboral.webp'; 
    public accidente = 'images/split-section/accidente.webp';

    slides: SwiperItem[] = [
    {
      image: 'images/swiper-home/swiper_image_1.png',
      alt: 'Derecho laboral Swiper'
    },
    {
      image: 'images/swiper-home/swiper_image_2.png',
      alt: 'Accidentes de tránsito Swiper'
    },
    {
      image: 'images/swiper-home/swiper_image_3.png',
      alt: 'Defensa y acompañamiento'
    },
  ];

  faqItems = [
  {
    question: '¿Cuánto tiempo tardan en responder mi consulta?',
    answer: 'Respondemos tan pronto como sea posible dentro de nuestro horario de atención.',
  },
  {
    question: '¿Mi información personal está protegida?',
    answer: 'Sí. Tratamos tus datos conforme a nuestra política de tratamiento de datos personales y la normativa vigente.',
  },
  {
    question: '¿Debo llenar todos los campos del formulario?',
    answer: 'Los campos marcados con asterisco son obligatorios para poder darte una orientación adecuada.',
  },
  {
    question: '¿Puedo contactarlos por WhatsApp?',
    answer: 'Sí, también puedes escribirnos directamente por WhatsApp si tienes problemas con el formulario o prefieres ese canal.',
  },
  ];

  testimonials: TestimonialItem[] = [
    {
      name: 'María G.',
      role: 'Cliente ',
      rating: 5,
      message: 'Excelente atención, me orientaron con mucha claridad y rapidez.',
    },
    {
      name: 'Carlos R.',
      role: 'Admin EPM',
      rating: 5,
      message: 'Muy profesionales. Me sentí acompañado durante todo el proceso.',
    },
    {
      name: 'Laura P.',
      role: 'CEO de Movistar',
      rating: 4,
      message: 'Respondieron mis dudas y me ayudaron a entender mis opciones.',
    },
    {
      name: 'Paula Andrea R.',
      role: 'cliente',
      rating: 5,
      message: 'Sumamente profesionales, una rapida atencion y una responsabilidad increible.',
    },
    {
      name: 'Harold Hugo Neris.',
      role: 'cliente',
      rating: 5,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta non ipsum vitae sollicitudin. Duis suscipit, sapien at pellentesque rutrum, ipsum nisi tincidunt nulla, sed elementum libero libero ac sem. Ut rhoncus pharetra risus, vitae venenatis lorem tincidunt ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin imperdiet at felis vel lacinia. Donec consequat faucibus eros non pretium. In libero ante, scelerisque nec pretium in, convallis sit amet libero. Aenean nec urna eu turpis iaculis maximus quis id odio. Proin vel laoreet mauris. Curabitur fringilla, ligula ut vestibulum faucibus, magna neque euismod turpis, quis maximus erat odio in augue. Mauris commodo ultricies ipsum, in semper lacus venenatis non. Morbi semper elit ac nulla feugiat mollis. Fusce nunc ex, maximus id sollicitudin viverra, mollis dapibus.'
    },
  ];
}

