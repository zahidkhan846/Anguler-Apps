import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
})
export class DropDownComponent implements OnInit {
  show: boolean = false;
  @Output() onRemove = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onShowDropDown() {
    this.show = !this.show;
  }

  onEditEvent(event: Event) {
    this.onEdit.emit(event);
    this.show = false;
  }

  onRemoveEvent(event: Event) {
    this.onRemove.emit(event);
    this.show = false;
  }
}
