{
  /* <li class="border rounded p-3 mb-3">
          <input type="checkbox" name="" id="" class="form-check-input" />
          <div class="item-name">item</div>
          <i class="bi bi-x fs-3 text-danger delete-icon"></i>
        </li> */
}

const shoppingList = document.querySelector(".shopping-list");

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
    shoppingList.innerHTML += `
        <li class="border rounded p-3 mb-3">
          <input type="checkbox" name="" id="" class="form-check-input" />
          <div class="item-name">${item.name}</div>
          <i class="bi bi-x fs-3 text-danger delete-icon"></i>
        </li>
    `;
  }
}

loadItems();
