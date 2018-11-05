import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('news-app-dotnet App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('News Web');
  });

  it('should find a Headlines section', () => {
    page.navigateTo();
    expect(element(by.css('.headlines-section')).isPresent()).toBe(true);
  });

  it('should find a category section', () => {
    page.navigateTo();
    expect(element(by.css('.category-section')).isPresent()).toBe(true);
  });

  it('should find a category drop down', () => {
    page.navigateTo();
    expect(element(by.css('.category-section .category-drop-down')).isPresent()).toBe(true);
  });

  it('should find news cards with title, description etc.', () => {
    page.navigateTo();
    expect(element(by.css('.news-card')).isPresent()).toBe(true);
    expect(element(by.css('.news-title')).isPresent()).toBe(true);
    expect(element(by.css('.news-description')).isPresent()).toBe(true);
    expect(element(by.css('.news-published')).isPresent()).toBe(true);    
  });


  it('should be able to add news to favorites and see them', () => {
     page.navigateTo();
     browser.sleep(2000);
     page.pressFavoritesButton();
     page.navigateToFavorites();
     browser.sleep(2000);
     expect(element(by.css('.news-card')).isPresent()).toBe(true);
  });

  it('should be able to search news', () => {
    page.navigateTo(); 
    element(by.name('searchText')).sendKeys('Ajith');
    element(by.id('search-btn')).click();
    expect(browser.getCurrentUrl()).toContain('search');
 });

});
