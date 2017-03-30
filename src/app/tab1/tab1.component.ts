import { Component } from '@angular/core';
import { OnsNavigator, Params } from 'angular2-onsenui';
import { Page3Component } from '../page3/page3.component';

@Component({
  selector: 'ons-page',
  templateUrl: './tab1.template.html'
})
export class Tab1Component {
  // コンストラクタ
  constructor(private navigator: OnsNavigator, private params: Params) {
  }

  // ページ遷移
  push() {
    const options = {
      data: {
        title: 'Page 3',
      },
      animation: 'lift',
    };
    this.navigator.element.pushPage(Page3Component, options);
  }
}