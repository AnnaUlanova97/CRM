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

// phone: "",
// vk: "",
// fb: "",
// mail: "",

function svgCreate(id, classIcon = "") {
  return `<svg class="icon ${classIcon}">
  <use xlink:href="#${id}"></use>
  </svg>`;
}

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

document.body.addEventListener("click", (e) => {
  const btn = e.target.closest(".js-btn-modal-open");
  if (btn) {
    let dataSet = btn.dataset.modal;
    document.getElementById(dataSet).classList.add("open");
    return;
  }

  const closeBtn = e.target.closest(".js-modal-close");
  if (closeBtn) {
    closeBtn.closest(".modal").classList.remove("open");
  }
});
