import { Component, ViewChild } from '@angular/core';
import { OnsNavigator, Params, ElementRef } from 'angular2-onsenui';
import { Tab1Component } from '../tab1/tab1.component';
import { Tab2Component } from '../tab2/tab2.component';

@Component({
  selector: 'ons-page',
  styleUrls: ['./page2.component.scss'],
  templateUrl: './page2.template.html'
})
export class Page2Component {
  // タイトル
  title = null;

  // タブ
  tab1 = Tab1Component;
  tab2 = Tab2Component;

  // コンストラクタ
  constructor(private navigator: OnsNavigator, private params: Params, elementRef: ElementRef) {
    console.log('params:', params.data);
    this.title = params.data.title;

    // スワイプで戻る
    elementRef.nativeElement.addEventListener('swiperight', () => this.pop());
  }

  // 戻る
  pop() {
    this.navigator.element.popPage();
  }
}