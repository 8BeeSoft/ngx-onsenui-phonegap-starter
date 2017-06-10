import { AppPage } from './app.po';

describe('page1', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display title', async () => {
    const text = await page.getPage1TitleText();
    await expect(text).toEqual('Page 1');
  });

  it('should display message', async () => {
    const text = await page.getPage1ParagraphText();
    await expect(text).toEqual('This is the first page.');
  });

  it('should push page', async () => {
    page.getPage1Button().click();
    setTimeout(async () => {
      const text = await page.getPage2TitleText();
      await expect(text).toEqual('Page 2');
    }, 1000);
  });

});
