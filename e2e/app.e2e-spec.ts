import { AppPage } from './app.po';

describe('app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display ons-navigator', done => {
    page.getOnsNavigator()
      .then(navi => expect(navi).toBe(true))
      .then(done, done.fail);
  });

});
