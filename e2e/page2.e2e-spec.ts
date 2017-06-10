import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('page2', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.getPage1Button().click();
    browser.sleep(1000);
  });

  it('should display title', async() => {
    const text = await page.getPage2TitleText();
    await expect(text).toEqual('Page 2');
  });

  it('should display message', async () => {
    const text = await page.getPage2ParagraphText();
    await expect(text).toEqual('This is the second page.');
  });

  it('should pop page', async () => {
    page.getPage2Button().click();
    setTimeout(async () => {
      const text = await page.getPage1TitleText();
      await expect(text).toEqual('Page 1');
    }, 1000);
  });

});
