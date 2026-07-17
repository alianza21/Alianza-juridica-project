import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-split-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './split-section.component.html',
    styleUrls: ['./split-section.component.scss'],
})
export class SplitSectionComponent {
    //'left pone la imagen sobre la izquierda; 'right' la pone sobre la derecha'
    @Input() imagePosition: 'left' | 'right' = 'left';

    //Title and block text
    @Input() title = '';
    @Input() text = '';

    get isImageRight(): boolean {
        return this.imagePosition === 'right';
    }
}