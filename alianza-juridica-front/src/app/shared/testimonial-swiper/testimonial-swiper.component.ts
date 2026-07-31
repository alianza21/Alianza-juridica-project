import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TestimonialItem {
  name: string;
  role?: string;
  message: string;
  rating?: number;
  image?: string;
}

@Component({
  selector: 'app-testimonial-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-swiper.component.html',
  styleUrls: ['./testimonial-swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialSwiperComponent implements AfterViewInit {
  @ViewChild('swiperEl', { static: true }) swiperEl!: ElementRef<HTMLElement>;
  @ViewChild('prevEl', { static: true }) prevEl!: ElementRef<HTMLButtonElement>;
  @ViewChild('nextEl', { static: true }) nextEl!: ElementRef<HTMLButtonElement>;
  @ViewChild('paginationEl', { static: true }) paginationEl!: ElementRef<HTMLElement>;

  @Input() items: TestimonialItem[] = [];
  @Input() slidesPerView: number | 'auto' = 1;
  @Input() desktopSlidesPerView = 3;

  ngAfterViewInit(): void {
    const el = this.swiperEl.nativeElement as any;
    const total = this.items.length;

    const canLoop = total >= 4;
    const canCenter = this.items.length >= 5;

    Object.assign(el, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 24,
      loop: canLoop,
      rewind: !canLoop,
      centeredSlides: canCenter,

      // Navegación y paginación ahora apuntan a elementos externos
      navigation: {
        enabled: false, // se activa en el breakpoint 768
        nextEl: this.nextEl.nativeElement,
        prevEl: this.prevEl.nativeElement,
      },
      pagination: {
        enabled: false,
        el: this.paginationEl.nativeElement,
        clickable: true,
      },

      breakpoints: {
        0: {
          navigation: { enabled: false },
          pagination: { enabled: false },
        },
        768: {
          slidesPerView: Math.min(this.desktopSlidesPerView, total || this.desktopSlidesPerView),
          navigation: { enabled: true },
          pagination: { enabled: true },
        },
      },
    });

    el.initialize();
  }

  trackByIndex(index: number): number {
    return index;
  }
}