import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
import { expect } from 'chai';

const entryPoint = path.resolve(__dirname, '../dist/index.html');

describe('the application', () => {
  const drivers = [];

  it('should have the correct title', () => {
    const options = new chrome.Options();
    options.addArguments('--headless', '--disable-gpus');

    const driver =
      new webdriver.Builder()
        .withCapabilities({ 'browserName' : 'chrome' })
        .setChromeOptions(options)
        .build();
    drivers.push(driver);

    driver.get(`file://${entryPoint}`);
    return driver.getTitle().then(function(title) {
      expect(title).to.equal('Hierplane');
    });
  });

  after(() => {
    drivers.forEach(driver => {
      driver.close();
      driver.quit();
    });
  });
});
