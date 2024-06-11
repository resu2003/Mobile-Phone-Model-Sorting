const appleList = document.getElementById("apple-list");
const samsungList = document.getElementById("samsung-list");
const googleList = document.getElementById("google-list");
const check = document.getElementById("check");

const applePhones = [
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14'
];

const samsungPhones = [
  'Galaxy S24 Ultra',
  'Galaxy S24 Plus',
  'Galaxy S24',
  'Galaxy S23 Ultra',
  'Galaxy S23 Plus',
  'Galaxy S23',
  'Galaxy S23 FE',
];

const googlePhones = [
  'Pixel 8 Pro',
  'Pixel 8',
  'Pixel 8a',
  'Pixel 7 Pro',
  'Pixel 7',
  'Pixel 7a',
];
const listItems = {
  apple: [],
  samsung: [],
  google: [],
};

let dragStartIndex;

function createList(phoneList, listContainer, brand) {
  const newList = [...phoneList];
  newList
    .map((phone) => ({ value: phone, sort: Math.random() })) // randomize list
    .sort((a, b) => a.sort - b.sort) // generate new order
    .map((phone) => phone.value) // retrieve original strings
    .forEach((phone, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="phone-name">${phone}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems[brand].push(listItem);
      listContainer.appendChild(listItem);
    });
  addListeners(brand);
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault(); // dragDrop is not executed otherwise
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  const listContainer = this.closest("ul").id;
  swapItems(dragStartIndex, dragEndIndex, listContainer);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex, listContainerId) {
  const listArray = listItems[listContainerId.split("-")[0]];
  const itemOne = listArray[fromIndex].querySelector(".draggable");
  const itemTwo = listArray[toIndex].querySelector(".draggable");
  listArray[fromIndex].appendChild(itemTwo);
  listArray[toIndex].appendChild(itemOne);
}

function checkOrder() {
  ["apple", "samsung", "google"].forEach((brand) => {
    listItems[brand].forEach((listItem, index) => {
      const phoneName = listItem.querySelector(".draggable").innerText.trim();
      const originalList =
        brand === "apple" ? applePhones : brand === "samsung" ? samsungPhones : googlePhones;
      if (phoneName !== originalList[index]) listItem.classList.add("wrong");
      else {
        listItem.classList.remove("wrong");
        listItem.classList.add("right");
      }
    });
  });
}

// Event Listeners
function addListeners(brand) {
  const draggables = document.querySelectorAll(`#${brand}-list .draggable`);
  const dragListItems = document.querySelectorAll(`#${brand}-list li`);

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

createList(applePhones, appleList, "apple");
createList(samsungPhones, samsungList, "samsung");
createList(googlePhones, googleList, "google");

check.addEventListener("click", checkOrder);
