import { Component, ViewChild } from '@angular/core';
import { OnsNavigator, Params, ElementRef } from 'angular2-onsenui';

@Component({
  selector: 'ons-page',
  styleUrls: ['./page3.component.scss'],
  templateUrl: './page3.template.html'
})
export class Page3Component {
  // タイトル
  title = null;

  // コンストラクタ
  constructor(private navigator: OnsNavigator, private params: Params) {
    console.log('params:', params.data);
    this.title = params.data.title;
  }

  // 戻る
  pop() {
    this.navigator.element.popPage();
  }
}