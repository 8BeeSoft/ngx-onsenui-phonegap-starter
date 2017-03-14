import { Component } from '@angular/core';
import { OnsNavigator, Params } from 'angular2-onsenui';

@Component({
  selector: 'ons-page',
  styleUrls: ['./page2.component.scss'],
  templateUrl: './page2.template.html'
})
export class Page2Component {
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