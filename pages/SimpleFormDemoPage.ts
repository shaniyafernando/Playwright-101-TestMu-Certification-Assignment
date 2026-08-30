import { Page } from "@playwright/test";

export default class SimpleFormDemoPage {
  constructor(public page: Page) {}

  async enterMessage(message: string) {
    await this.page.fill('input#user-message', message);
  }

  async clickGetCheckedValueButton() {
    await this.page.getByText("Get Checked Value").click();
  }

  async getMessage() {
    return this.page.locator("#message");
  }
}
