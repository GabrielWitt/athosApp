import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { FirstKeyPipe } from './pipes/first-key.pipe';

// Components
import { BigButtonComponent } from './components/big-button/big-button.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const components = [
  BigButtonComponent,
  UserProfileComponent
]
const pipes = [
  FirstKeyPipe
]

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...pipes,
    ...components
  ],
  exports: [
    ...pipes,
    ...components
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SharedModule { }