const shoppingList = document.querySelector(".shopping-list");

loadItems();

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
  li.className = "border rounded p-3 mb-3";

  // checkbox
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = item.completed;
  input.classList.add("form-check-input");

  // item
  const div = document.createElement("div");
  div.textContent = item.name;
  div.classList.add("item-name");

  // delete icon
  const i = document.createElement("i");
  i.className = "bi bi-x fs-3 text-danger delete-icon";

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(i);

  return li;
}
