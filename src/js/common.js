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

// let client = {
//   surname: "Скворцов",
//   name: "Денис",
//   middleName: "Юрьевич",
//   contacts: [
//     {
//       connection: "phone",
//       value: "88888888888",
//     },
//     {
//       connection: "mail",
//       value: "ddddd",
//     },
//     {
//       connection: "fb",
//       value: "ddfrre",
//     },
//     {
//       connection: "vk",
//       value: "aavff",
//     },
//   ],
// };

function svgCreate(id, classIcon = "") {
  return `<svg class="icon ${classIcon}">
  <use xlink:href="#${id}"></use>
  </svg>`;
}

// =========================================================
async function getClientsList() {
  return fetch("http://localhost:3000/api/clients", {})
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
// console.log(await getClientsList());

// Функция рендера страницы
async function renderClients(arr) {
  const CLIENT_CONTENT = document.querySelector(".clients__content");
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

  // let phoneClient = client.contacts.find(
  //   (contact) => contact.connection === "phone"
  // );
  // let mailClient = client.contacts.find(
  //   (contact) => contact.connection === "mail"
  // );
  // let fbClient = client.contacts.find((contact) => contact.connection === "fb");
  // let vkClient = client.contacts.find((contact) => contact.connection === "vk");
  // let otherClient = client.contacts.find(
  //   (contact) => contact.connection === "other"
  // );

  // if (fbClient) {
  //   CONTACTS.innerHTML = `${svgCreate("fb", "table-icon")}`;
  // }

  // if (otherClient) {
  //   CONTACTS.innerHTML = `${svgCreate("vk", "table-icon")}`;
  // }

  CLIENT.classList.add("clients__inner", "clients__filters");
  itemsArr.forEach((i) => i.classList.add("clients__item"));
  BTN_CHANGES.classList.add("btn-svg", "btn-svg--purple");
  BTN_CANCEL.classList.add("btn-svg", "btn-svg--red");

  BTN_CHANGES.innerHTML = `Изменить ${svgCreate("actions", "table-icon")}`;
  BTN_CANCEL.innerHTML = `Удалить ${svgCreate("cancel", "table-icon")}`;

  // const arr = await getClientsList();
  arr.forEach((client) => {
    NAME.textContent =
      client.surname + " " + client.name + " " + client.lastName;
    console.log(client);
    CLIENT_CONTENT.append(CLIENT);
    itemsArr.forEach((i) => CLIENT.append(i));
    CHANGES.append(BTN_CHANGES, BTN_CANCEL);
    BTN_CANCEL.append.createElement;
  });
}

renderClients(await getClientsList());

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
  }

  if (modal && e.target === modal) {
    modal.classList.remove("open");
  }
});

// Закрытие модалки
document.body.addEventListener("click", (e) => {});

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
  const inputBtn = document.querySelector(".contact__btn");

  if (inputBtn.textContent === "Телефон") {
    const value = input.value;
  }

  console.log(document.querySelector(".contact__btn").textContent);

  const response = await fetch("http://localhost:3000/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // * обязательное поле, имя клиента
      name: name.value,
      // * обязательное поле, фамилия клиента
      surname: surname.value,
      // необязательное поле, отчество клиента
      lastname: lastname.value,
      // контакты - необязательное поле, массив контактов
      // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
      contacts: [
        {
          type: inputBtn.textContent,
          value: input.value,
        },
      ],
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
    renderClient(client);
  }
});

// Функция удаления клиента из таблицы
// document.querySelector(".");

// async function name() {
//   const response = await fetch("http://localhost:3000/api/clients");
//   const data = await response.json();
//   console.log(data);
// }
// name();

// async function createContact() {
//   const response = await fetch("http://localhost:3000/api/clients", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
//       id: "1234567890",
//       // дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
//       createdAt: "2021-02-03T13:07:29.554Z",
//       // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
//       updatedAt: "2021-02-03T13:07:29.554Z",
//       // * обязательное поле, имя клиента
//       name: "Василий",
//       // * обязательное поле, фамилия клиента
//       surname: "Пупкин",
//       // необязательное поле, отчество клиента
//       lastName: "Васильевич",
//       // контакты - необязательное поле, массив контактов
//       // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
//       contacts: [
//         {
//           type: "Телефон",
//           value: "+71234567890",
//         },
//         {
//           type: "Email",
//           value: "abc@xyz.com",
//         },
//         {
//           type: "Facebook",
//           value: "https://facebook.com/vasiliy-pupkin-the-best",
//         },
//       ],
//     }),
//   });
//   const data = await response.json();
//   console.log(data);
// }
// createContact();
