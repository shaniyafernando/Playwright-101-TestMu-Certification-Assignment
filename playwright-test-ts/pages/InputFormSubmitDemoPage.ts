import { expect, Page } from "@playwright/test";

export default class InputFormSubmitDemoPage {
  public nameInputLocator = 'input[id="name"]';
  public emailInputLocator = 'input[id="inputEmail4"]';
  public passwordInputLocator = 'input[id="inputPassword4"]';
  public companyInputLocator = 'input[id="company"]';
  public websiteInputLocator = 'input[id="websitename"]';
  public address1InputLocator = 'input[id="inputAddress1"]';
  public address2InputLocator = 'input[id="inputAddress2"]';
  public countrySelectLocator = 'select[name="country"]';
  public cityInputLocator = 'input[id="inputCity"]';
  public stateInputLocator = 'input[id="inputState"]';
  public zipCodeInputLocator = 'input[id="inputZip"]';
  public submitButtonLocator = '//*[@id="seleniumform"]/div[6]/button';
  public successMessageLocator = '//*[@id="__next"]/div/main/div/section[2]/div/div/div/div/p';

  constructor(public page: Page) {
  }

  async enterName(name: string) {
    await this.page.locator(this.nameInputLocator).fill(name);
  }

  async enterEmail(email: string) {
    await this.page.locator(this.emailInputLocator).fill(email);
  }

  async enterPassword(password: string) {
    await this.page.locator(this.passwordInputLocator).fill(password);
  }

  async enterCompany(company: string) {
    await this.page.locator(this.companyInputLocator).fill(company);
  }

  async enterWebsite(website: string) {
    await this.page.locator(this.websiteInputLocator).fill(website);
  }

  async enterAddress1(address1: string) {
    await this.page.locator(this.address1InputLocator).fill(address1);
  }

  async enterAddress2(address2: string) {
    await this.page.locator(this.address2InputLocator).fill(address2);
  }

  async selectCountry(country: string) {
    const select = this.page.locator(this.countrySelectLocator);
    await expect(select).toBeVisible({ timeout: 5000 });
    await select.selectOption({ label: country });
  }

  async enterCity(city: string) {
    await this.page.locator(this.cityInputLocator).fill(city);
  }

  async enterState(state: string) {
    await this.page.locator(this.stateInputLocator).fill(state);
  }

  async enterZipCode(zipCode: string) {
    await this.page.locator(this.zipCodeInputLocator).fill(zipCode);
  }

  async clickSubmitButton() {
    const submitButton = this.page.locator(this.submitButtonLocator);
    await expect(submitButton).toBeVisible({ timeout: 5000 });
    await submitButton.click();
  }
}
