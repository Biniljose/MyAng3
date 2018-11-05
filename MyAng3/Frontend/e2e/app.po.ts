import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  navigateToFavorites() {
    return browser.get('/favorites');
  }

  pressFavoritesButton() {
    return element.all(by.buttonText('Add to Favorites')).first().click();
  }

}
