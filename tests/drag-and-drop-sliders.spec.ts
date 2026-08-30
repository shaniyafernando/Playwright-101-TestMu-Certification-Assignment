import test from '../lambdatest-setup'
import {expect} from '@playwright/test'
import DragAndDropSlidersPage from '../pages/DragAndDropSlidersPage';

test.beforeEach(async ({ page }) => {
  await page.goto("selenium-playground");
  await page.getByText("Drag & Drop Sliders").click();
  await expect(page).toHaveURL(
    "selenium-playground/drag-drop-range-sliders-demo/",
  );
});

[
    { defaultValue:'15', value: '95'},
].forEach(({ defaultValue, value }) => {
  test(`Drag and Drop Slider Default Value ${defaultValue} to ${value}`, async ({page}) => {
    const dragAndDropSlidersPage = new DragAndDropSlidersPage(page);
    const sliderInput = await dragAndDropSlidersPage.getDefaultValueSlider(defaultValue);
    expect(await sliderInput.inputValue()).toBe(defaultValue);
    console.log(`Default value of slider ${defaultValue}:`, await sliderInput.inputValue());
    await dragAndDropSlidersPage.dragSlider(defaultValue, value);
    expect(await sliderInput.inputValue()).toBe(value);
    console.log(`New value of slider ${defaultValue}:`, await sliderInput.inputValue());
  });
});
