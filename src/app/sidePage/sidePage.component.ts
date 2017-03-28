import { Component, Inject, forwardRef } from '@angular/core';
import { OnsSplitterContent } from 'angular2-onsenui';
import { Page1Component } from '../page1/page1.component';

@Component({
  selector: 'ons-page',
  templateUrl: './sidePage.template.html'
})
export class SidePageComponent {
  // コンストラクタ
  constructor(
    @Inject(forwardRef(() => Page1Component)) private page1: Page1Component) {
  }

  // メニューを開く
  close() {
    this.page1.side.element.close();
  }
}