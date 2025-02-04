import BasePage from "./Base.js";

class CatalogPage extends BasePage {
    constructor({ page }) {
        super()
    }
}

new CatalogPage({
    page: document.querySelector('.js-body')
})
