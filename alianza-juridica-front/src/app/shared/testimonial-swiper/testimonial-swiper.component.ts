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
  rating?: number; // 1 a 5
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

  @Input() items: TestimonialItem[] = [];
  @Input() autoplayDelay = 4500;
  @Input() slidesPerView: number | 'auto' = 1;
  @Input() desktopSlidesPerView = 3;

  ngAfterViewInit(): void {
    const el = this.swiperEl.nativeElement as any;
    const total = this.items.length;

    // Loop seguro solo si hay suficientes slides
    const canLoop = total >= 4;
    const canCenter = this.items.length >= 5;

    Object.assign(el, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 24,
      loop: canLoop,
      rewind: !canLoop,
      centeredSlides: canCenter,
      navigation: true,
      pagination: {
        enabled: false, // se activa desde 768px 
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: Math.min(this.desktopSlidesPerView, total || this.desktopSlidesPerView),
          pagination: {
            enabled: true,
            clickable: true,
          },
        },
      },
      autoplay: this.autoplayDelay
        ? { delay: this.autoplayDelay, disableOnInteraction: false }
        : undefined,
    });

    el.initialize();
  }

  trackByIndex(index: number): number {
    return index;
  }
}