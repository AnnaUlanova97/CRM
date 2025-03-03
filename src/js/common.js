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

let client = {
  surname: "Скворцов",
  name: "Денис",
  middleName: "Юрьевич",
  contacts: [
    {
      connection: "phone",
      value: "88888888888",
    },
    {
      connection: "mail",
      value: "ddddd",
    },
    {
      connection: "fb",
      value: "ddfrre",
    },
    {
      connection: "vk",
      value: "aavff",
    },
  ],
};

function svgCreate(id, classIcon = "") {
  return `<svg class="icon ${classIcon}">
  <use xlink:href="#${id}"></use>
  </svg>`;
}

// =========================================================

// Функция рендера страницы
function renderClient(client) {
  const CLIENT_WRAP = document.querySelector(".clients__wrap");
  const CLIENT = document.createElement("ul");
  const ID = document.createElement("li");
  const NAME = document.createElement("li");
  const DATE_CREATION = document.createElement("li");
  const DATE_CHANGE = document.createElement("li");
  const CONTACTS = document.createElement("li");
  const CHANGES = document.createElement("li");
  const BTN_CHANGES = document.createElement("button");
  const BTN_CANCEL = document.createElement("button");
  const itemsArr = [ID, NAME, DATE_CHANGE, DATE_CREATION, CONTACTS, CHANGES];

  let phoneClient = client.contacts.find(
    (contact) => contact.connection === "phone"
  );
  let mailClient = client.contacts.find(
    (contact) => contact.connection === "mail"
  );
  let fbClient = client.contacts.find((contact) => contact.connection === "fb");
  let vkClient = client.contacts.find((contact) => contact.connection === "vk");
  let otherClient = client.contacts.find(
    (contact) => contact.connection === "other"
  );

  if (fbClient) {
    CONTACTS.innerHTML = `${svgCreate("fb", "table-icon")}`;
  } else {
    console.log("error");
  }

  if (otherClient) {
    CONTACTS.innerHTML = `${svgCreate("vk", "table-icon")}`;
  } else {
    console.log("error");
  }

  CLIENT.classList.add("clients__inner", "clients__table");
  itemsArr.forEach((i) => i.classList.add("clients__item"));
  BTN_CHANGES.classList.add("clients__btn", "clients__btn--change");
  BTN_CANCEL.classList.add("clients__btn", "clients__btn--cancel");

  BTN_CHANGES.innerHTML = `Изменить ${svgCreate("actions", "table-icon")}`;
  BTN_CANCEL.innerHTML = `Удалить ${svgCreate("cancel", "table-icon_cancel")}`;

  CLIENT_WRAP.append(CLIENT);
  itemsArr.forEach((i) => CLIENT.append(i));
  CHANGES.append(BTN_CHANGES, BTN_CANCEL);
  BTN_CANCEL.append.createElement;

  NAME.textContent =
    client.surname + " " + client.name + " " + client.middleName;
  console.log(client.contacts);
}

renderClient(client);

// Открытие модалки и закрытие
document.body.addEventListener("click", (e) => {
  const btn = e.target.closest(".js-btn-modal-open");
  const closeBtn = e.target.closest(".js-modal-close");
  const modal = e.target.closest(".modal");

  if (btn) {
    let id = btn.dataset.modal;
    document.getElementById(id).classList.add("open");
  }

  if (closeBtn) {
    closeBtn.closest(".modal").classList.remove("open");
  }

  if (modal && e.target === modal) {
    modal.classList.remove("open");
  }
});

// Слушатель для добавления нового контакта
document.querySelector(".modal__btn").addEventListener("click", (e) => {
  getSelect();
  const arr = [...document.querySelectorAll(".js-contact-input")];

  if (arr.length >= 10) {
    e.target.style.display = "none";
  }
  console.log(arr);

  document.querySelector(".modal__add").classList.add("open");
});

// События селекта
document.querySelector(".modal__inner").addEventListener("click", (e) => {
  // Открытие/закрытие селекта
  const wrap = e.target.closest(".contact__wrap");
  if (wrap) {
    const parent = wrap.closest(".contact");
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
  const CONTACT_WRAP = document.createElement("div");
  const CONTACT_DD = document.createElement("div");
  const CONTACT_BTN = document.createElement("button");
  const CONTACT_SELECT = document.createElement("div");
  const CONTACT_BTN_FB = document.createElement("button");
  const CONTACT_BTN_ADD_TEL = document.createElement("button");
  const CONTACT_BTN_EMAIL = document.createElement("button");
  const CONTACT_BTN_VK = document.createElement("button");
  const INPUT = document.createElement("input");
  const BTN_DELETE = document.createElement("div");
  const BUTTONS = [
    CONTACT_BTN_ADD_TEL,
    CONTACT_BTN_EMAIL,
    CONTACT_BTN_FB,
    CONTACT_BTN_VK,
  ];

  CONTACT.classList.add("contact");
  CONTACT_WRAP.classList.add("contact__wrap");
  CONTACT_DD.classList.add("contact__dropdown");
  CONTACT_BTN.classList.add("contact__btn");
  CONTACT_SELECT.classList.add("contact__select");
  BUTTONS.forEach((i) => i.classList.add("js-contact-btn"));
  INPUT.classList.add("contact__input", "js-contact-input");
  BTN_DELETE.classList.add("contact__delete");

  CONTACT_BTN.textContent = "Телефон";
  CONTACT_BTN_ADD_TEL.textContent = "Доп. телефон";
  CONTACT_BTN_EMAIL.textContent = "Email";
  CONTACT_BTN_VK.textContent = "Vk";
  CONTACT_BTN_FB.textContent = "Facebook";
  INPUT.setAttribute("placeholder", "Введите данные контакта");
  INPUT.setAttribute("type", "tel");

  CONTACT_DD.append(CONTACT_BTN);
  CONTACT_DD.insertAdjacentHTML(
    "beforeend",
    svgCreate("arrow_back", "modal-arrow")
  );
  BTN_DELETE.innerHTML = `${svgCreate("contact-cancel", "contact-cancel")}`;

  CONTACT.append(CONTACT_WRAP, INPUT, BTN_DELETE);
  CONTACT_WRAP.append(CONTACT_DD, CONTACT_SELECT);
  CONTACT_SELECT.append(
    CONTACT_BTN_ADD_TEL,
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

  document.querySelector(".modal__inner").append(CONTACT);
}
