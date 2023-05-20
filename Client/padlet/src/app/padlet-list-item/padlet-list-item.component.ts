import {Component, Input} from '@angular/core';
import {Padlet} from "../shared/padlet";

@Component({
  selector: 'a.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent {
    @Input() padlet : Padlet | undefined;
}
