import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() title: string = '';
  @Input() message: string = '';

  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClose(event: Event) {
    this.onClick.emit(event);
  }
}
