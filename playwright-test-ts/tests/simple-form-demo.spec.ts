import test from '../lambdatest-setup'
import {expect} from '@playwright/test'
import SimpleFormDemoPage from '../pages/SimpleFormDemoPage';

test.beforeEach(async ({ page }) => {
  await page.goto("selenium-playground");
  await page.getByText("Simple Form Demo").click();
  await expect(page).toHaveURL("selenium-playground/simple-form-demo/");
});

[
  { message: "Hello, World!" },
].forEach(({ message }) => {
  test(`Simple Form Demo with Message: ${message}`, async ({ page }) => {
    const simpleFormDemoPage = new SimpleFormDemoPage(page);
    await simpleFormDemoPage.enterMessage(message);
    const displayedMessage = await simpleFormDemoPage.getMessage();
    console.log(
      "Displayed message by default:",
      await displayedMessage.textContent(),
    );

    const displayedValue = await displayedMessage.textContent();
    expect(displayedValue === null || displayedValue === "").toBeTruthy();

    await simpleFormDemoPage.clickGetCheckedValueButton();

    console.log(
      "Displayed message after submit:",
      await displayedMessage.textContent(),
    );
    expect(await displayedMessage.textContent()).toContain(message);
  });
});
