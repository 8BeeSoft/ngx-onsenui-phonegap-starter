import { Component, ViewChild } from '@angular/core';
import { OnsNavigator, Params, OnsSplitterContent, OnsSplitterSide } from 'angular2-onsenui';
import { SidePageComponent } from '../sidePage/sidePage.component';
import { ContentPageComponent } from '../contentPage/contentPage.component';

@Component({
  selector: 'ons-page',
  templateUrl: './page1.template.html'
})
export class Page1Component {
  @ViewChild(OnsSplitterContent) content: OnsSplitterContent;
  @ViewChild(OnsSplitterSide) side: OnsSplitterSide;

  // ページ
  sidePage = SidePageComponent;
  contentPage = ContentPageComponent;

  // コンストラクタ
  constructor(private navigator: OnsNavigator, private params: Params) {
    console.log('params:', params.data);

    // 向き変更時のバグ対策
    ons.orientation.on('change', (event) => {
      if (!event.isPortrait && this.side.element.isOpen) {
        this.side.element.close();
      }
    });
  }
}