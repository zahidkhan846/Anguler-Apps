import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
})
export class AddButtonComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(event: Event) {
    this.onClick.emit(event);
  }
}
