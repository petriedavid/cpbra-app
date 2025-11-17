import { html, fixture, expect } from '@open-wc/testing';
import "../cpbra-app.js";

describe("CpbraApp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <cpbra-app
        title="title"
      ></cpbra-app>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
