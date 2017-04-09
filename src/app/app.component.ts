import { Component, ViewEncapsulation } from '@angular/core';
import { Page1Component } from './page1/page1.component';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.scss'],
  template: '<ons-navigator [page]="page"></ons-navigator>',
})
export class AppComponent {
  page = Page1Component;
}