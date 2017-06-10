import { AppPage } from './app.po';

describe('app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display ons-navigator', async () => {
    const navi = await page.getOnsNavigator();
    await expect(navi).toBe(true);
  });

});
