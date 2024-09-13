// [
//   { id: 1, name: "Krema", completed: false },
//   { id: 2, name: "Un", completed: false },
//   { id: 3, name: "Nişasta", completed: true },
//   { id: 4, name: "Süt", completed: false },
//   { id: 5, name: "Yumurta", completed: false },
//   { id: 6, name: "Çikolata", completed: true },
//   { id: 7, name: "Şeker", completed: false },
//   { id: 8, name: "Vanilya", completed: false },
// ];

const shoppingList = document.querySelector(".shopping-list");
const shoppingForm = document.querySelector(".shopping-form");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const clearBtn = document.querySelector(".clear");

document.addEventListener("DOMContentLoaded", function () {
  loadItems();
  shoppingForm.addEventListener("submit", handleFormSubmit);

  for (let button of filterButtons) {
    button.addEventListener("click", handleFilterSelection);
  }

  clearBtn.addEventListener("click", clear);
});

function saveToLS() {
  const listItems = shoppingList.querySelectorAll("li");
  const liste = [];

  for (let li of listItems) {
    const id = li.getAttribute("item-id");
    const name = li.querySelector(".item-name").textContent;
    const completed = li.hasAttribute("item-completed");

    liste.push(id, name, completed);
  }

  localStorage.setItem("shoppingItems", JSON.stringify(liste));
}

function loadItems() {
  const items = JSON.parse(localStorage.getItem("shoppingItems")) || [];
  shoppingList.innerHTML = "";

  for (let item of items) {
    const li = createListItem(item);
    shoppingList.appendChild(li);
  }
}

function createListItem(item) {
  // li
  const li = document.createElement("li");
  li.className = "border rounded p-2 mb-3";
  li.toggleAttribute("item-completed", item.completed);
  li.setAttribute("item-id", item.id);

  // checkbox
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = item.completed;
  input.classList.add("form-check-input");
  input.addEventListener("change", toggleCompleted);

  // item
  const div = document.createElement("div");
  div.textContent = item.name;
  div.classList.add("item-name");
  div.addEventListener("click", openEditMode);
  div.addEventListener("blur", closeEditMode);
  div.addEventListener("keydown", cancelEnter);

  // delete icon
  const i = document.createElement("i");
  i.className = "bi bi-x fs-3 text-danger delete-icon";
  i.addEventListener("click", removeItem);

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(i);

  return li;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("item_name");

  if (input.value.trim().length === 0) {
    alert("Eleman eklemek için bir değer girmelisiniz.");
    return;
  }

  addItem(input);
}

function addItem(input) {
  const id = generateId();
  const newItem = createListItem({
    id: id,
    name: input.value,
    completed: false,
  });

  shoppingList.appendChild(newItem);

  input.value = "";

  updateFilteredItems();

  saveToLS();
}

function generateId() {
  return Date.now().toString();
}

function toggleCompleted(e) {
  const li = e.target.parentElement;
  li.toggleAttribute("item-completed", e.target.checked);

  updateFilteredItems();

  saveToLS();
}

function removeItem(e) {
  const li = e.target.parentElement;
  shoppingList.removeChild(li);

  saveToLS();
}

function openEditMode(e) {
  const li = e.target.parentElement;

  if (li.hasAttribute("item-completed") == false) {
    e.target.contentEditable = true;
  }
}

function closeEditMode(e) {
  e.target.contentEditable = false;

  saveToLS();
}

function cancelEnter(e) {
  if (e.key == "Enter") {
    e.preventDefault();
    closeEditMode(e);
  }
}

function handleFilterSelection(e) {
  const filterBtn = e.target;

  for (let button of filterButtons) {
    button.classList.add("btn-secondary");
    button.classList.remove("btn-primary");
  }

  filterBtn.classList.add("btn-primary");
  filterBtn.classList.remove("btn-secondary");

  filterItems(filterBtn.getAttribute("item-filter"));
}

function filterItems(filterType) {
  const li_items = shoppingList.querySelectorAll("li");

  for (let li of li_items) {
    li.classList.remove("d-flex");
    li.classList.remove("d-none");

    const completed = li.hasAttribute("item-completed");

    if (filterType == "completed") {
      // tamamlananları göster
      li.classList.toggle(completed ? "d-flex" : "d-none");
    } else if (filterType == "incompleted") {
      // tamamlanmayanları göster
      li.classList.toggle(completed ? "d-none" : "d-flex");
    } else {
      // hepsini göster
      li.classList.toggle("d-flex");
    }
  }
}

function updateFilteredItems() {
  const activeFilter = document.querySelector(".btn-primary[item-filter]");

  filterItems(activeFilter.getAttribute("item-filter"));
}

function clear(e) {
  shoppingList.innerHTML = "";
  localStorage.clear("shoppingItems");
}
