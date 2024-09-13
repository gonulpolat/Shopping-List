const shoppingList = document.querySelector(".shopping-list");
const shoppingForm = document.querySelector(".shopping-form");

loadItems();

shoppingForm.addEventListener("submit", handleFormSubmit);

function loadItems() {
  const items = [
    { id: 1, name: "Krema", completed: false },
    { id: 2, name: "Un", completed: false },
    { id: 3, name: "Nişasta", completed: true },
    { id: 4, name: "Süt", completed: false },
    { id: 5, name: "Yumurta", completed: false },
    { id: 6, name: "Çikolata", completed: true },
    { id: 7, name: "Şeker", completed: false },
    { id: 8, name: "Vanilya", completed: false },
  ];

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
}

function generateId() {
  return Date.now().toString();
}

function toggleCompleted(e) {
  const li = e.target.parentElement;
  li.toggleAttribute("item-completed", e.target.checked);
}

function removeItem(e) {
  const li = e.target.parentElement;
  shoppingList.removeChild(li);
}
