import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-x-btn',
  templateUrl: './x-btn.component.html',
  styleUrls: ['./x-btn.component.css'],
})
export class XBtnComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(event: Event) {
    this.onClick.emit(event);
  }
}
