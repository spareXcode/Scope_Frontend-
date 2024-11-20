import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-order-request-status-card',
  standalone: true,
  imports: [],
  templateUrl: './order-request-status-card.component.html',
  styleUrl: './order-request-status-card.component.css'
})
export class OrderRequestStatusCardComponent {

 @Input() text:string = ""

}
