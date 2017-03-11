import { OnsenModule } from 'angular2-onsenui';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { SidePageComponent } from './sidePage/sidePage.component';
import { ContentPageComponent } from './contentPage/contentPage.component';

@NgModule({
  imports:         [OnsenModule],
  declarations:    [AppComponent, Page1Component, Page2Component, SidePageComponent, ContentPageComponent],
  bootstrap:       [AppComponent],
  entryComponents: [Page1Component, Page2Component, SidePageComponent, ContentPageComponent],
  schemas:         [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}