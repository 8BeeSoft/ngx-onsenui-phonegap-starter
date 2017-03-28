import { Component, ViewEncapsulation } from '@angular/core';
import { Page1Component } from './page1/page1.component';

@Component({
  selector: 'my-app',
  template: '<ons-navigator [page]="page"></ons-navigator>',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  page = Page1Component;
}