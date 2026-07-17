import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-accordion.component.html',
  styleUrls: ['./faq-accordion.component.scss'],
})
export class FaqAccordionComponent {
  @Input() title = 'FAQ';
  @Input() eyebrow = 'Preguntas frecuentes';
  @Input() subtitle = 'Resolvemos las dudas más comunes.';
  @Input() items: FaqItem[] = [];

  openIndex: number | null = null;

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  isOpen(index: number): boolean {
    return this.openIndex === index;
  }
}