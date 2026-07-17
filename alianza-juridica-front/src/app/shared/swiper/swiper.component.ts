import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SwiperItem {
  image: string;
  alt: string;
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperComponent implements AfterViewInit {
  @ViewChild('swiperEl', { static: true }) swiperEl!: ElementRef<HTMLElement>;

  @Input() items: SwiperItem[] = [];
  @Input() slidesPerView: number | 'auto' = 1;
  @Input() loop = true;
  @Input() navigation = true;
  @Input() pagination = true;
  @Input() autoplayDelay = 5000;

  ngAfterViewInit(): void {
  const el = this.swiperEl.nativeElement as any;

  Object.assign(el, {
    slidesPerView: this.slidesPerView,
    loop: this.loop,
    // Forzar a Swiper a vigilar el tamaño del contenedor visible
    watchSlidesProgress: true, 
    pagination: true,
    autoplay: this.autoplayDelay
      ? { delay: this.autoplayDelay, disableOnInteraction: false }
      : undefined,
  });

  el.initialize();
  } 
}