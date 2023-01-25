import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fallback-content',
  templateUrl: './fallback-content.component.html',
  styleUrls: ['./fallback-content.component.css'],
})
export class FallbackContentComponent implements OnInit {
  @Input() fallbackText: string;
  constructor() {}

  ngOnInit(): void {}
}
