import { Component, Inject, forwardRef } from '@angular/core';
import { OnsNavigator, Params } from 'angular2-onsenui';
import { Page1Component } from '../page1/page1.component';
import { Page2Component } from '../page2/page2.component';
import { SidePageComponent } from '../sidePage/sidePage.component';

@Component({
    selector: 'ons-page',
    templateUrl: './contentPage.template.html'
})
export class ContentPageComponent {
    // コンストラクタ
    constructor(
        @Inject(forwardRef(() => Page1Component)) private page1: Page1Component,
        private navigator: OnsNavigator,
        private params: Params) {
    }

    // メニューを開く
    open() {
        this.page1.side.element.open();
    }

    // ページ遷移
    push() {
        const options = {
            data: {
                title: 'Page 2'
            }
        };
        this.navigator.element.pushPage(Page2Component, options);
    }
}