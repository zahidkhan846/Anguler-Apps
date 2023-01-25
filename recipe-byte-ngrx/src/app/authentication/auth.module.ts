import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../user-interface/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RegisterLoginComponent } from './register-login/register-login.component';

@NgModule({
  declarations: [AuthComponent, RegisterLoginComponent],
  imports: [FormsModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
