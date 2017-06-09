import { MyAppPage } from './app.po';

describe('my-app', () => {
  let page: MyAppPage;

  beforeEach(() => {
    page = new MyAppPage();
    page.navigateTo();
  });

  it('should display ons-navigator', done => {
    page.getOnsNavigator()
      .then(navi => expect(navi).toBe(true))
      .then(done, done.fail);
  });

});
