import { AppPage } from './app.po';

describe('page1', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo()
  });

  it('should display title', done => {
    page.getPage1TitleText()
      .then(msg => expect(msg).toEqual('Page 1'))
      .then(done, done.fail);
  });

  it('should display message', done => {
    page.getPage1ParagraphText()
      .then(msg => expect(msg).toEqual('This is the first page.'))
      .then(done, done.fail);
  });

  it('should push page', done => {
    page.getPage1Button().click();
    setTimeout(() => {
      page.getPage2TitleText()
        .then(text => expect(text).toEqual('Page 2'))
        .then(done, done.fail);
    }, 1000);
  });

});
