import ApiService from '../../services/ApiService.js';

export default class BaseForm {
  constructor({ form } = {}) {
    this.form = form;
    this.method = this.form.method.toLowerCase() || 'post';

    this.setEventListeners();
  }

  setEventListeners() {
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault();

      await this.submit({})
    });
  }

  triggerSubmit(callback) {
    this.submit().then(() => {
      if (callback) {
        callback()
      }
    })
  }

  async submit({ formData } = {}) {
    if (valueTypes.isNil(formData)) {
      formData = this.getFormData();
    }

    try {
      const response = await ApiService[this.method](this.getRequestURL(), formData, {});

      this.onSuccess(response);
    } catch (response) {
      this.onError(response);
    } finally {
      this.onFinally();
    }
  }

  getFormData() {
    return new FormData(this.form);
  }

  getRequestURL() {
    return this.form.action;
  }

  onSuccess(response) {
    console.log(response);

    this.form.reset();
  }

  onError(response) {
    console.error(`При отправке формы произошла ошибка: ${response.message}`);
  }

  onFinally() {
    console.log('Запрос закончил свое выполнение');
  }
}