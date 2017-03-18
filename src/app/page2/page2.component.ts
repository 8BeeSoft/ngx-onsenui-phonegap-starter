import { Component } from '@angular/core';
import { OnsNavigator, Params, ElementRef } from 'angular2-onsenui';

@Component({
    selector: 'ons-page',
    styleUrls: ['./page2.component.scss'],
    templateUrl: './page2.template.html'
})
export class Page2Component {
    // タイトル
    title = null;

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