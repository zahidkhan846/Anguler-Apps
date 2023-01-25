import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { AddButtonComponent } from './buttons/add-button/add-button.component';
import { DeleteButtonComponent } from './buttons/delete-button/delete-button.component';
import { DropDownComponent } from './buttons/drop-down/drop-down.component';
import { XBtnComponent } from './buttons/x-btn/x-btn.component';
import { FallbackContentComponent } from './fallback-content/fallback-content.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AlertComponent,
    AddButtonComponent,
    DeleteButtonComponent,
    DropDownComponent,
    XBtnComponent,
    FallbackContentComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    AddButtonComponent,
    DeleteButtonComponent,
    DropDownComponent,
    XBtnComponent,
    FallbackContentComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ],
})
export class SharedModule {}
