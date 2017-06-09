import { MyAppPage } from './app.po';
import { browser } from 'protractor';

describe('page2', () => {
  let page: MyAppPage;

  beforeEach(() => {
    page = new MyAppPage();
    page.navigateTo();
    page.getPage1Button().click();
    browser.sleep(1000);
  });

  it('should display title', done => {
    page.getPage2TitleText()
      .then(msg => expect(msg).toEqual('Page 2'))
      .then(done, done.fail);
  });

  it('should display message', done => {
    page.getPage2ParagraphText()
      .then(msg => expect(msg).toEqual('This is the second page.'))
      .then(done, done.fail);
  });

  it('should pop page', done => {
    page.getPage2Button().click();
    setTimeout(() => {
      page.getPage1TitleText()
        .then(text => expect(text).toEqual('Page 1'))
        .then(done, done.fail);
    }, 1000);
  });

});
