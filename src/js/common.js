import "./helpers/globalFunctions.js";
import BaseModal from "./components/modals/BaseModal.js";
import Tooltip from "./components/common/Tooltip.js";
import Inputmask from "inputmask/dist/inputmask.es6.js";

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
  return await response.json();
}

async function saveClient({ name, surname, lastname, contacts }) {
  const data = {
    // * обязательное поле, имя клиента
    name: name,
    // * обязательное поле, фамилия клиента
    surname: surname,
    // необязательное поле, отчество клиента
    lastName: lastname,
    // контакты - необязательное поле, массив контактов
    // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
    contacts: contacts,
  }
  return await fetch("http://localhost:3000/api/clients", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json()
  }).then((data) => {
    return data;
  });
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

async function renderTable() {
  const CLIENT_CONTENT = document.querySelector(".clients__content");
  CLIENT_CONTENT.innerHTML = "";

  const clients = await getClientsList();
  renderClients(clients);
}
renderTable();

function createContactIcon(key) {
  const BTN = document.createElement("span");

  BTN.classList.add("tooltip");

  BTN.innerHTML = `${svgCreate(key, "table-icon")}`;

  return BTN;
}

let clientsArray = [];

// Функция рендера страницы
async function renderClients(clientsList) {
  clientsArray = clientsList;

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

    CLIENT.classList.add("clients__inner", "clients__filters");
    CLIENT.dataset.id = client.id;
    itemsArr.forEach((item) => item.classList.add("clients__item"));
    CONTACTS.classList.add("js-contacts");
    BTN_CHANGES.classList.add(
      "btn-svg",
      "btn-svg--purple",
      "js-btn-modal-toggle",
      "js-btn-change"
    );
    BTN_CANCEL.classList.add(
      "btn-svg",
      "btn-svg--red",
      "js-btn-modal-toggle",
      "js-btn-delete"
    );
    BTN_CANCEL.dataset.modal = "delete-client";
    BTN_CHANGES.dataset.modal = "client-change";
    BTN_CHANGES.dataset.id = client.id;
    BTN_CANCEL.dataset.id = client.id;

    TIME_CHANGE.classList.add("clients__time");
    TIME_CREATION.classList.add("clients__time");
    ID.classList.add("js-id");

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
}

// Открытие модалки
document.body.addEventListener("click", (e) => {
  const modalWrap = document.querySelector(".modal-wrap");

  if (e.target.classList.contains("js-btn-modal-toggle") || e.target.classList.contains("modal-wrap")) {
    modalWrap.classList.toggle("open");
    if (!modalWrap.classList.contains("open")) {
      resetModal();
    }
    if (e.target.dataset.modal === "client-add") {
      document.querySelector(".add-client").classList.toggle("open-modal");
    }

    if (e.target.dataset.modal === "client-change") {
      document.querySelector(".change-client").classList.toggle("open-modal");
    }

    if (e.target.dataset.modal === "delete-client") {
      document.querySelector(".delete-client").classList.toggle("open-modal");
    }
  }

  if (e.target.classList.contains("modal-wrap")) {
    resetModal()
  }
});

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("input__name")) {

    e.preventDefault()
  }
})

// Ресет модалки
function resetModal() {
  // Судя по всему тут логика сборса модалки перед закрытием, это хорошо что она в функции отдельно. Вызывай эту функцию когда модалка закрывается, только тебе надо придумать как теперь это отслеживать, тк у тебя там нет отдельной кнопки закрытия
  // Я добавила ее туда, где возвращается ответ с сервера во время создания нового клиента
  document.querySelectorAll(".input__name").forEach((elem) => {
    elem.value = "";
  });
  document.querySelectorAll(".input__surname").forEach((elem) => {
    elem.value = "";
  });
  document.querySelectorAll(".input__lastname").forEach((elem) => {
    elem.value = "";
  });
  document.querySelectorAll(".add-client__id").forEach((elem) => {
    elem.textContent = "";
  });
  document.querySelectorAll(".contact").forEach((el) => el.remove());
  document.querySelector(".js-modal-btn").style.display = "flex";
  document.querySelector(".add-client__add-contact").classList.remove("open-modal");
  document.querySelector(".add-client").classList.remove("open-modal");
  document.querySelector(".change-client").classList.remove("open-modal");
  document.querySelector(".delete-client").classList.remove("open-modal");
  document.querySelector(".modal-wrap").classList.remove("open");
  document.querySelectorAll(".js-container").forEach((el) => el.classList.remove("open"));
}

// Слушатель для добавления нового контакта

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-modal-btn")) {
    e.target.closest(".open-modal").querySelector(".js-modal-select").append(getSelect());

    const arr = [...document.querySelectorAll(".js-contact-input")];

    if (arr.length >= 10) {
      e.target.style.display = "none";
    }
    e.target.closest(".open-modal").querySelector(".js-container").classList.add("open");
  }
})

// Слушатель на кнопку удаления инпута контактных данных
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-contact-delete")) {
    const arr = [...document.querySelectorAll(".js-contact-input")];
    console.log('ppp')
    if (arr.length < 1) {
      document.querySelector(".js-container").classList.remove("open");
    }
  }
})

// События селекта
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".js-modal-select");
  const content = e.target.closest(".contact__content")

  if(!e.target.closest(".contact__select")) {
    console.log('Нажали не внутри')
  } else {
    console.log('Нажали внутри')
  }

  if (btn) {
    const parent = content.closest(".contact");
    parent.querySelector(".contact__content").classList.toggle("open");
    // parent.querySelector(".contact__dropdown").classList.toggle("open");
  }

  // if (e.target.classList.contains("js-modal-select") && ) {}

  // const content = e.target.closest(".contact__content");
  // if (e.target.closest(".js-modal-select")) {
  //   // Открытие/закрытие селекта
  //
  //   if (content) {
  //     const parent = content.closest(".contact");
  //     parent.querySelector(".contact__select").classList.toggle("open");
  //     parent.querySelector(".contact__dropdown").classList.toggle("open");
  //   }
  //
  //   // Выбор пункта в селекте
  //   if (e.target.classList.contains("js-contact-btn")) {
  //     const parent = e.target.closest(".contact");
  //     const contactBtn = parent.querySelector(".contact__btn");
  //     const input = parent.querySelector(".js-contact-input");
  //
  //     contactBtn.textContent = e.target.textContent;
  //
  //     if (e.target.textContent === "Email") {
  //       input.setAttribute("type", "email");
  //       input.setAttribute("max-length", "30");
  //       Inputmask("email").mask(input);
  //     } else if (e.target.textContent === "Доп. телефон") {
  //       input.setAttribute("type", "tel");
  //       input.setAttribute("max-length", "16");
  //       Inputmask("+7 (999) 999-99-99").mask(input);
  //     } else if (["Vk", "Facebook"].includes(e.target.textContent)) {
  //       input.setAttribute("type", "url");
  //       input.setAttribute("max-length", "30");
  //     }
  //   }
  // }
})

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
  BTN_DELETE.classList.add("contact__delete", 'js-contact-delete');

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
    if (INPUT.value.length > 0) {
      BTN_DELETE.style.display = "flex";
    } else {
      BTN_DELETE.style.display = "none";
    }
  };

  BTN_DELETE.addEventListener("click", (e) => {
    INPUT.value = "";
    CONTACT.remove();
  });

  return CONTACT;
}

// Функция слушателя на добавление нового клиента в таблицу
document.querySelector(".js-btn-save").addEventListener("click", async (e) => {
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

  const client = await saveClient({ name: name.value.trim(), surname: surname.value.trim(), lastname: lastname.value.trim(), contacts: contacts });

  if (client) {
    document.querySelectorAll(".contact").forEach((el) => el.remove());
    document.querySelector(".add-client__add-contact").classList.remove("open");
    document.getElementById("modal-add").classList.remove("open");

    name.value = "";
    surname.value = "";
    lastname.value = "";
    input.value = "";
    document.querySelector(".load").style.display = "block";
    await renderTable();
    document.querySelector(".load").style.display = "none";
    resetModal();
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
    document.querySelector(".modal-wrap").classList.remove("open");
  }

  resetModal();
  deleteClientApi(id);
});

// События
// Слушатель на открытие модалки удаления клиента
document.body.addEventListener("click", async (e) => {
  if (e.target.classList.contains("js-btn-delete")) {
    const client = e.target.dataset.id;
    const btn = document.body.querySelector(".js-delete");
    btn.dataset.id = client;
  }
});
// слушатель на показ всех контактов
document.body.addEventListener("click", (e) => {
  // Так лучше? сделала два условия
  const clientItem = e.target.closest(".js-contacts");
  const clientEllipse = e.target.closest(".table-icon--ellipse");
  if (clientItem && clientEllipse) {
    clientItem.classList.add("active");
  }
});

let getClientData = {};
// Открытие модалки для изменения клиента
document.body.addEventListener("click", async (e) => {
  if (e.target.classList.contains("js-btn-change")) {
    const btn = document.body.querySelector(".js-save-changes");
    const btnDelete = document.body.querySelector(".js-save-delete");
    const id = e.target.dataset.id;
    const client = await getClient(id);

    const modal = document.querySelector(".change-client");

    const name = modal.querySelector(".input__name");
    const surname = modal.querySelector(".input__surname");
    const lastname = modal.querySelector(".input__lastname");
    const idText = modal.querySelector(".change-client__id");

    btn.dataset.id = id;
    btnDelete.dataset.id = id;
    name.value = client.name;
    surname.value = client.surname;
    lastname.value = client.lastName;
    idText.textContent = `ID: ${client.id.slice(0, 6)}`;

    const contactWrapper = modal.querySelector(".js-modal-select");
    contactWrapper.innerHTML = "";

    if (client.contacts && client.contacts.length > 0) {
      client.contacts.forEach((contact) => {
        const contactElem = getSelect();
        const typeBtn = contactElem.querySelector(".contact__btn");
        const input = contactElem.querySelector(".js-contact-input");

        if (!typeBtn || !input) {
          return;
        }

        typeBtn.textContent = contact.type;
        input.value = contact.value;

        if (contact.type === "Email") {
          input.setAttribute("type", "email");
        } else if (contact.type === "Доп. телефон") {
          input.setAttribute("type", "tel");
        } else if (["Vk", "Facebook"].includes(contact.type)) {
          input.setAttribute("type", "url");
        }
        contactWrapper.append(contactElem);
      });
      document
        .querySelector(".change-client__add-contact")
        .classList.add("open");
    }
    // getClientData.idClient = id;
  }
});
// слушатель на удаление клиента из модалки change
document.body.addEventListener("click", async (e) => {
  if (e.target.classList.contains("js-save-delete")) {
    const id = e.target.dataset.id;
    document.querySelector(".change-client").classList.remove("open-modal");
    document.querySelector(".delete-client").classList.add("open-modal");
    document.querySelector(".js-delete").dataset.id = id;
  }
})
// Слушатель на кнопку сохранения изменений клиента
document.body
  .querySelector(".js-save-changes")
  .addEventListener("click", async (e) => {
    const modal = document.querySelector(".change-client");
    const nameNew = modal.querySelector(".input__name");
    const surnameNew = modal.querySelector(".input__surname");
    const lastnameNew = modal.querySelector(".input__lastname");
    const contactBox = modal.querySelectorAll(".contact");
    const contacts = [];

    contactBox.forEach((div) => {
      const type = div.querySelector(".contact__btn").textContent.trim();
      const value = div.querySelector(".js-contact-input").value.trim();

      if (value) {
        contacts.push({ type, value });
      }
    });

    getClientData.idClient = e.target.dataset.id;
    getClientData.name = nameNew.value;
    getClientData.surname = surnameNew.value;
    getClientData.lastName = lastnameNew.value;
    getClientData.contacts = contacts;

    await changeClient(getClientData);
    resetModal();
    await renderTable();
  });

// Сортировка по ID
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-sort-id")) {
    const sortSvg = document.querySelector(".js-icon-id");
    const clientsWrap = document.querySelector(".clients__content");

    const isAsc = sortSvg.classList.toggle("icon--transform");

    const sortedClients = [...clientsArray].sort((a, b) => {
      return isAsc ? b.id - a.id : a.id - b.id;
    });

    sortedClients.forEach((client) => {
      const clientNode = document.querySelector(
        `.clients__inner[data-id="${client.id}"]`
      );
      if (clientNode) {
        clientsWrap.appendChild(clientNode);
      }
    });
  }
});

// Сортировка по имени
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-sort-name")) {
    const sortSvg = document.querySelector(".js-icon-name");
    const clientsWrap = document.querySelector(".clients__content");

    const isAsc = sortSvg.classList.toggle("icon--transform");

    const sortedClients = [...clientsArray].sort((a, b) => {
      const nameCompare = a.name.localeCompare(b.name);
      if (nameCompare !== 0) return isAsc ? nameCompare : -nameCompare;
      return isAsc
        ? a.surname.localeCompare(b.surname)
        : b.surname.localeCompare(a.surname);
    });

    sortedClients.forEach((client) => {
      const clientNode = document.querySelector(
        `.clients__inner[data-id="${client.id}"]`
      );
      if (clientNode) {
        clientsWrap.appendChild(clientNode);
      }
    });
  }
});

//Сортировка по дате создания
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-sort-save")) {
    const sortSvg = document.querySelector(".js-icon-save");
    const clientsWrap = document.querySelector(".clients__content");

    const isAsc = sortSvg.classList.toggle("icon--transform");

    const sortedClients = [...clientsArray].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isAsc ? dateB - dateA : dateA - dateB;
    });

    sortedClients.forEach((client) => {
      const clientNode = document.querySelector(
        `.clients__inner[data-id="${client.id}"]`
      );
      if (clientNode) {
        clientsWrap.appendChild(clientNode);
      }
    });
  }
});

// Сортировка по дате изменения
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-sort-change")) {
    const sortSvg = document.querySelector(".js-icon-change");
    const clientsWrap = document.querySelector(".clients__content");

    const isAsc = sortSvg.classList.toggle("icon--transform");

    const sortedClients = [...clientsArray].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return isAsc ? dateB - dateA : dateA - dateB;
    });

    sortedClients.forEach((client) => {
      const clientNode = document.querySelector(
        `.clients__inner[data-id="${client.id}"]`
      );
      if (clientNode) {
        clientsWrap.appendChild(clientNode);
      }
    });
  }
});

// Фильтрация
let debounceTimer;

document.querySelector(".header__search").addEventListener("input", () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const inputValue = document
      .querySelector(".header__search")
      .value.trim()
      .toLowerCase();
    const clients = [...clientsArray];

    if (inputValue === "") {
      renderClients(clientsArray);
      return;
    }

    const filtered = clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(inputValue) ||
        client.surname.toLowerCase().includes(inputValue) ||
        client.lastName.toLowerCase().includes(inputValue)
      );
    });

    document.querySelector(".clients__content").innerHTML = "";
    renderClients(filtered);
  }, 300);
});


// document.body.querySelector(".header__form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   let clients = [...clientsArray];
//   console.log(clients);

//   document.body.querySelector(".clients__content").innerHTML = "";

//   const inputValue = document.body.querySelector(".header__search").value;

//   let newList = clients.filter((client, index, arr) => {
//     return (
//       client.name === inputValue ||
//       client.surname === inputValue ||
//       client.lastname === inputValue
//     );
//   });

//   renderClients(newList);
// });
