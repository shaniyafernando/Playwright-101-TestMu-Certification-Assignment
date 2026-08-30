import test from '../lambdatest-setup'
import {expect} from '@playwright/test'
import InputFormSubmitDemoPage from '../pages/InputFormSubmitDemoPage';

test.beforeEach(async ({ page }) => {
  await page.goto("selenium-playground");
  await page.getByText("Input Form Submit").click();
  await expect(page).toHaveURL("selenium-playground/input-form-demo/");
  await page.waitForLoadState("networkidle");
});

test("Form Validation", async ({ page }) => {
  const inputFormSubmitDemoPage = new InputFormSubmitDemoPage(page)
  await inputFormSubmitDemoPage.clickSubmitButton();

  const formFieldLocators = [
    inputFormSubmitDemoPage.nameInputLocator,
    inputFormSubmitDemoPage.emailInputLocator,
    inputFormSubmitDemoPage.passwordInputLocator,
    inputFormSubmitDemoPage.companyInputLocator,
    inputFormSubmitDemoPage.websiteInputLocator,
    inputFormSubmitDemoPage.address1InputLocator,
    inputFormSubmitDemoPage.countrySelectLocator,
    inputFormSubmitDemoPage.cityInputLocator,
    inputFormSubmitDemoPage.stateInputLocator,
    inputFormSubmitDemoPage.zipCodeInputLocator,
  ];

  for (const formFieldLocator of formFieldLocators) {
    if (formFieldLocator === inputFormSubmitDemoPage.countrySelectLocator){
      expect( page.locator(formFieldLocator).locator('option:checked')).toHaveText('Choose an option')
      continue
    }
    const validationMessage = await page
      .locator(formFieldLocator)
      .evaluate((el) => (el as HTMLInputElement).validationMessage);
    console.log(
      "Validation Message for locator " + formFieldLocator + ":",
      validationMessage,
    ); 
    expect(validationMessage).toBe("Please fill out this field.");
  }

  await inputFormSubmitDemoPage.enterName("John Doe");
  await inputFormSubmitDemoPage.enterEmail("john.doe@example.com");
  await inputFormSubmitDemoPage.enterPassword("password123");
  await inputFormSubmitDemoPage.enterCompany("Example Inc.");
  await inputFormSubmitDemoPage.enterWebsite("https://www.example.com");
  await inputFormSubmitDemoPage.enterAddress1("123 Main St");
  await inputFormSubmitDemoPage.enterAddress2("Apt 4B");
  await inputFormSubmitDemoPage.selectCountry("United States");
  await inputFormSubmitDemoPage.enterCity("New York");
  await inputFormSubmitDemoPage.enterState("NY");
  await inputFormSubmitDemoPage.enterZipCode("10001");

  expect(await page.locator(inputFormSubmitDemoPage.successMessageLocator)).toBeHidden();
  await inputFormSubmitDemoPage.clickSubmitButton();
  expect(await page.locator(inputFormSubmitDemoPage.successMessageLocator)).toBeVisible();
  expect(await page.locator(inputFormSubmitDemoPage.successMessageLocator)).toHaveText('Thanks for contacting us, we will get back to you shortly.')
});
