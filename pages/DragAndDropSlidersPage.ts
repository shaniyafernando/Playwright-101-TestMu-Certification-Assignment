import {Page} from "@playwright/test";

type SliderLocator = Record<string, string>;

export default class DragAndDropSlidersPage {
    private sliderLocator: SliderLocator = {
        5: '//*[@id="slider1"]/div/input',
        15: '//*[@id="slider3"]/div/input',
        20: '//*[@id="slider2"]/div/input',
        25: '//*[@id="slider5"]/div/input',
        30: '//*[@id="slider6"]/div/input',
        40: '//*[@id="slider7"]/div/input',
        50: '//*[@id="slider4"]/div/input',
        80: '//*[@id="slider8"]/div/input'
    };

    constructor(public page: Page) {}

    async getDefaultValueSlider(value: string) {
        return this.page.locator(this.sliderLocator[value])
    }

    async dragSlider(defaultValue: string, newValue: string) {
        await this.page.fill(this.sliderLocator[defaultValue], newValue)
    }
}