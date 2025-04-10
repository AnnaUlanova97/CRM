import "./helpers/globalFunctions.js";
import BaseModal from "./components/modals/BaseModal.js";
import Tooltip from "./components/common/Tooltip.js";

// info: Инициализация глобальных для приложения компонентов, функций или событий
document.addEventListener("DOMContentLoaded", (event) => {
  // info: Если находимся в режиме локальной разработки,
  //  отображаем в углу виджет со списком страниц для удобной навигации между ними.
  if (window?.APP?.mode === "development") {
    const pages = ["index", "catalog"];

    import("./helpers/pagesWidget.js").then((module) => {
      if (module) {
        module.default(pages);
      }
    });
  }

  // info: Функция для получения файла svg-спрайта и его вставки в DOM.
  if (window?.APP?.svgSpritePath) {
    (async () => {
      try {
        const response = await fetch(window.APP.svgSpritePath);
        const sprite = await response.text();
        const SVGContainer = document.getElementById("__SVG-container__");

        if (sprite || !response) {
          SVGContainer.innerHTML = sprite;
          SVGContainer.querySelector("style")?.remove();
        } else {
          new Error("sprite loading error");
        }
      } catch (error) {
        throw error;
      }
    })();
  }

  document.querySelectorAll(".js-open-modal").forEach((modal) => {
    modal.addEventListener(
      "click",
      BaseModal.showModal.bind(this, modal.dataset.modalId, {})
    );
  });

  document.querySelectorAll(".js-tooltip").forEach(
    (element) =>
      new Tooltip({
        element: element,
        showOnClick: true,
        placement: "bottom",
      })
  );
});

//

//

//

function svgCreate(id, classIcon = "") {
  return `<svg class="icon ${classIcon}">
    <use xlink:href="#${id}"></use>
    </svg>`;
}

// =========================================================
async function getClientsList() {
  return fetch("http://localhost:3000/api/clients", {})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

async function getClient(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`);
  const data = await response.json();
  return data;
}

async function deleteClientApi(idClient) {
  await fetch(`http://localhost:3000/api/clients/${idClient}`, {
    method: "DELETE",
  });
}

async function changeClient({ idClient, name, surname, lastName, contacts }) {
  await fetch(`http://localhost:3000/api/clients/${idClient}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      surname,
      lastName,
      contacts,
    }),
  });
}

// Функция рендера страницы
async function renderClients(clientsList) {
  const CLIENT_CONTENT = document.querySelector(".clients__content");

  clientsList.forEach((client) => {
    const CLIENT = document.createElement("ul");
    const NAME = document.createElement("li");
    const ID = document.createElement("li");
    const DATE_CREATION = document.createElement("li");
    const DATE_CHANGE = document.createElement("li");
    const CONTACTS = document.createElement("li");
    const CHANGES = document.createElement("li");
    const BTN_CHANGES = document.createElement("button");
    const BTN_CANCEL = document.createElement("button");
    const itemsArr = [ID, NAME, DATE_CHANGE, DATE_CREATION, CONTACTS, CHANGES];
    const TIME_CREATION = document.createElement("span");
    const TIME_CHANGE = document.createElement("span");

    const formatDate1 = (dateStr) => {
      const date = new Date(dateStr);

      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const formatDate2 = (dateStr) => {
      const date2 = new Date(dateStr);
      return date2.toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    CLIENT.classList.add("clients__inner", "clients__filters");
    CLIENT.dataset.id = client.id;
    itemsArr.forEach((i) => i.classList.add("clients__item"));
    CONTACTS.classList.add("js-clients__item");
    BTN_CHANGES.classList.add(
      "btn-svg",
      "btn-svg--purple",
      "js-btn-modal-open",
      "js-btn__change"
    );
    BTN_CANCEL.classList.add(
      "btn-svg",
      "btn-svg--red",
      "js-btn-modal-open",
      "js-btn__delete"
    );
    BTN_CANCEL.dataset.modal = "modal-delete";
    BTN_CHANGES.dataset.modal = "modal-open";
    BTN_CHANGES.dataset.id = client.id;
    BTN_CANCEL.dataset.id = client.id;

    TIME_CHANGE.classList.add("clients__time");
    TIME_CREATION.classList.add("clients__time");

    BTN_CHANGES.innerHTML = `Изменить ${svgCreate("actions", "table-icon")}`;
    BTN_CANCEL.innerHTML = `Удалить ${svgCreate("cancel", "table-icon")}`;
    NAME.textContent =
      client.surname + " " + client.name + " " + client.lastName;

    DATE_CREATION.textContent = formatDate1(client.createdAt);
    TIME_CREATION.textContent = formatDate2(client.createdAt);
    DATE_CHANGE.textContent = formatDate1(client.updatedAt);
    TIME_CHANGE.textContent = formatDate2(client.updatedAt);
    ID.textContent = client.id;

    // CONTACTS

    function createContactIcon(key) {
      const BTN = document.createElement("span");

      BTN.classList.add("tooltip");

      BTN.innerHTML = `${svgCreate(key, "table-icon")}`;

      return BTN;
    }

    const contactTypes = {
      Facebook: "fb",
      Email: "mail",
      Телефон: "phone",
      Vk: "vk",
    };

    const MAX_SVG = 4;
    // const SVG_TO_SHOW = client.contacts.slice(0, MAX_SVG);
    const SVG_HIDDEN = client.contacts.length - MAX_SVG;
    const SVG_TO_SHOW = client.contacts;

    SVG_TO_SHOW.forEach((contact) => {
      if (contactTypes[contact.type]) {
        const ICON = createContactIcon(contactTypes[contact.type]);
        const TOOLTIP = document.createElement("div");
        const TOOLTIP_CONTENT = document.createElement("span");

        TOOLTIP.classList.add("tooltip__content");
        // TOOLTIP_CONTENT.innerText = `${contact.type}: ${contact.value}`;
        TOOLTIP_CONTENT.innerText = `${contact.value}`;

        TOOLTIP.append(TOOLTIP_CONTENT);
        ICON.append(TOOLTIP);
        CONTACTS.append(ICON);
      }
    });

    if (SVG_HIDDEN > 0) {
      const MORE_CONTACTS = document.createElement("span");
      const NUMBER = document.createElement("span");
      const BOX = document.createElement("span");

      BOX.classList.add("table-icon");
      BOX.classList.add("table-icon--ellipse");
      NUMBER.classList.add("table-icon--number");

      MORE_CONTACTS.innerHTML = `${svgCreate("ellipse", "table-icon")}`;
      NUMBER.textContent = `+${SVG_HIDDEN}`;

      CONTACTS.append(BOX);
      BOX.append(MORE_CONTACTS, NUMBER);
    }

    CLIENT.append(ID, NAME, DATE_CREATION, DATE_CHANGE, CONTACTS, CHANGES);
    CHANGES.append(BTN_CHANGES, BTN_CANCEL);
    DATE_CREATION.append(TIME_CREATION);
    DATE_CHANGE.append(TIME_CHANGE);
    CLIENT_CONTENT.append(CLIENT);
  });

  document.body.addEventListener("click", (e) => {
    const clientItem = e.target.closest(".js-clients__item");
    if (clientItem) {
      clientItem.classList.add("active");
    }
  });
}

async function init() {
  const CLIENT_CONTENT = document.querySelector(".clients__content");
  CLIENT_CONTENT.innerHTML = "";

  const clients = await getClientsList();
  renderClients(clients);
}
init();

// Открытие модалки
document.body.addEventListener("click", (e) => {
  // if (e.target.classList.closest("js-btn-modal-toggle")) {
  //   let id = e.target.dataset.modal;
  //   document.getElementById(id).classList.add("open");
  // } Твоим способом НЕ ПОЛУЧАЕТСЯ
  const btn = e.target.closest(".js-btn-modal-open");
  const closeBtn = e.target.closest(".js-modal-close");
  const modal = e.target.closest(".modal");

  if (btn) {
    let id = btn.dataset.modal;
    document.getElementById(id).classList.add("open");
  }

  if (closeBtn) {
    closeBtn.closest(".modal").classList.remove("open");
    resetModal();
  }

  if (modal && e.target === modal) {
    modal.classList.remove("open");
    resetModal();
  }
});

let currentClientId;
// Закрытие модалки
function resetModal() {
  document.querySelector(".input__name").value = "";
  document.querySelector(".input__surname").value = "";
  document.querySelector(".input__lastname").value = "";
  document.querySelector(".modal__id").textContent = "";
  document.querySelectorAll(".contact").forEach((el) => el.remove());
  document.querySelector(".js-modal__btn").style.display = "flex";
  document.querySelector(".modal__add").classList.remove("open");
  currentClientId = null;
}

// Слушатель для добавления еще одного контакта
document.querySelector(".js-modal__btn").addEventListener("click", (e) => {
  document.querySelector(".modal__inner").append(getSelect());

  const arr = [...document.querySelectorAll(".js-contact-input")];

  if (arr.length >= 10) {
    e.target.style.display = "none";
  }

  document.querySelector(".modal__add").classList.add("open");
});

// События селекта
document.querySelector(".js-modal__inner").addEventListener("click", (e) => {
  // Открытие/закрытие селекта
  const content = e.target.closest(".contact__content");
  if (content) {
    const parent = content.closest(".contact");
    parent.querySelector(".contact__select").classList.toggle("open");
    parent.querySelector(".contact__dropdown").classList.toggle("open");
  }
  // Выбор пункта в селекте
  if (e.target.classList.contains("js-contact-btn")) {
    const parent = e.target.closest(".contact");
    const contactBtn = parent.querySelector(".contact__btn");
    const input = parent.querySelector(".js-contact-input");

    contactBtn.textContent = e.target.textContent;

    if (e.target.textContent === "Email") {
      input.setAttribute("type", "email");
      input.setAttribute("max-length", "30");
    } else if (e.target.textContent === "Доп. телефон") {
      input.setAttribute("type", "tel");
      input.setAttribute("max-length", "16");
    } else if (["Vk", "Facebook"].includes(e.target.textContent)) {
      input.setAttribute("type", "url");
      input.setAttribute("max-length", "30");
    }
  }
});

// Отдельный слушатель для закрытия

// Функция создания селекта
function getSelect() {
  const CONTACT = document.createElement("div");
  const CONTACT_CONTENT = document.createElement("div");
  const CONTACT_DROPDOWN = document.createElement("div");
  const CONTACT_BTN = document.createElement("button");
  const CONTACT_SELECT = document.createElement("div");
  const CONTACT_BTN_FB = document.createElement("button");
  const CONTACT_BTN_TEL2 = document.createElement("button");
  const CONTACT_BTN_EMAIL = document.createElement("button");
  const CONTACT_BTN_VK = document.createElement("button");
  const INPUT = document.createElement("input");
  const BTN_DELETE = document.createElement("div");

  const BUTTONS = [
    CONTACT_BTN_TEL2,
    CONTACT_BTN_EMAIL,
    CONTACT_BTN_FB,
    CONTACT_BTN_VK,
  ];

  CONTACT.classList.add("contact");
  CONTACT_CONTENT.classList.add("contact__content");
  CONTACT_DROPDOWN.classList.add("contact__dropdown");
  CONTACT_BTN.classList.add("contact__btn");
  CONTACT_SELECT.classList.add("contact__select");
  BUTTONS.forEach((i) => i.classList.add("js-contact-btn"));
  INPUT.classList.add("contact__input", "js-contact-input");
  BTN_DELETE.classList.add("contact__delete");

  CONTACT_BTN.textContent = "Телефон";
  CONTACT_BTN_TEL2.textContent = "Доп. телефон";
  CONTACT_BTN_EMAIL.textContent = "Email";
  CONTACT_BTN_VK.textContent = "Vk";
  CONTACT_BTN_FB.textContent = "Facebook";
  INPUT.setAttribute("placeholder", "Введите данные контакта");
  INPUT.setAttribute("type", "tel");

  CONTACT_DROPDOWN.append(CONTACT_BTN);
  CONTACT_DROPDOWN.insertAdjacentHTML(
    "beforeend",
    svgCreate("arrow_back", "modal-arrow")
  );
  BTN_DELETE.innerHTML = `${svgCreate("contact-cancel", "contact-cancel")}`;

  CONTACT.append(CONTACT_CONTENT, INPUT, BTN_DELETE);
  CONTACT_CONTENT.append(CONTACT_DROPDOWN, CONTACT_SELECT);
  CONTACT_SELECT.append(
    CONTACT_BTN_TEL2,
    CONTACT_BTN_EMAIL,
    CONTACT_BTN_FB,
    CONTACT_BTN_VK
  );

  // Появление кнопки удалить, при вводе символов в инпут
  INPUT.oninput = function (e) {
    if (INPUT.value.length > 1) {
      BTN_DELETE.style.display = "flex";
    } else {
      BTN_DELETE.style.display = "none";
    }
  };

  BTN_DELETE.addEventListener("click", (e) => {
    INPUT.value = "";
  });

  return CONTACT;
}

// Функция слушателя на добавление нового клиента в таблицу
document.querySelector(".js-btn__save").addEventListener("click", async (e) => {
  const name = document.querySelector(".input__name");
  const surname = document.querySelector(".input__surname");
  const lastname = document.querySelector(".input__lastname");
  const input = document.querySelectorAll(".js-contact-input");
  const contactBox = document.querySelectorAll(".contact");

  // Создаем массив контактов
  const contacts = [];

  contactBox.forEach((div) => {
    const type = div.querySelector(".contact__btn").textContent.trim();
    const value = div.querySelector(".js-contact-input").value.trim();

    if (value) {
      contacts.push({ type, value });
    }
  });

  const response = await fetch("http://localhost:3000/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // * обязательное поле, имя клиента
      name: name.value,
      // * обязательное поле, фамилия клиента
      surname: surname.value,
      // необязательное поле, отчество клиента
      lastName: lastname.value,
      // контакты - необязательное поле, массив контактов
      // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
      contacts: contacts,
    }),
  });
  const data = await response.json();

  if (response.status === 201) {
    document.querySelectorAll(".contact").forEach((el) => el.remove());
    document.querySelector(".modal__add").classList.remove("open");
    document.getElementById("modal-open").classList.remove("open");

    name.value = "";
    surname.value = "";
    lastname.value = "";
    input.value = "";
    await init();
  }
});

// Функция удаления клиента из таблицы
document.body.querySelector(".js-delete").addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const CLIENT = document
    .querySelector(`[data-id='${id}']`)
    .closest(".clients__inner");
  if (CLIENT) {
    CLIENT.remove();
    document.querySelector(".modal").classList.remove("open");
  }
  deleteClientApi(id);
});

// Функция изменения информации о клиенте

// События
document.body.addEventListener("click", async (e) => {
  if (e.target.classList.contains("js-btn__delete")) {
    const client = e.target.dataset.id;
    const btn = document.body.querySelector(".js-delete");
    btn.dataset.id = client;
  }
});

document.body.addEventListener("click", async (e) => {
  if (e.target.classList.contains("js-btn__change")) {
    const id = e.target.dataset.id;
    const client = await getClient(id);
    currentClientId = client.id;

    const name = document.querySelector(".input__name");
    const surname = document.querySelector(".input__surname");
    const lastname = document.querySelector(".input__lastname");

    name.value = client.name;
    surname.value = client.surname;
    lastname.value = client.lastName;

    const modal = document.getElementById("modal-open");
    modal.classList.add("open");

    const contactWrapper = document.querySelector(".js-modal__inner");
    document.querySelectorAll(".contact").forEach((el) => el.remove());

    if (client.contacts && client.contacts.length > 0) {
      client.contacts.forEach((contact) => {
        const contactElem = getSelect();
        const typeBtn = contactElem.querySelector(".contact__btn");
        const input = contactElem.querySelector(".js-contact-input");

        typeBtn.textContent = contact.type;
        input.value = contact.value;

        // Установим type input по типу
        if (contact.type === "Email") {
          input.setAttribute("type", "email");
        } else if (contact.type === "Доп. телефон") {
          input.setAttribute("type", "tel");
        } else if (["Vk", "Facebook"].includes(contact.type)) {
          input.setAttribute("type", "url");
        }

        contactWrapper.append(contactElem);
      });

      document.querySelector(".modal__add").classList.add("open");
    }
  }
});

// Сортировка
document.body.addEventListener("click", (e) => {
  const sortBtn = e.target.closest(".js-btn__sort--id");
  const sortSvg = document.body.querySelector(".js-icon");

  if (sortBtn) {
    sortSvg.classList.toggle("icon--transform");
  }
});
