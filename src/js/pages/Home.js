import BasePage from './Base.js'
import BaseForm from '../components/forms/BaseForm.js';

class HomePage extends BasePage {
    constructor({page}) {
        super()

        this.page = page

        this.Form = new BaseForm({
            form: this.page.querySelector('.js-form')
        })
    }
}

new HomePage({
    page: document.querySelector('.js-body')
})
