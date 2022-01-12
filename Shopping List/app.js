const addBtn = document.querySelector('.footer__button');
const input = document.querySelector('.footer__input');
const items = document.querySelector('.items');

function onAdd() {
  const text = input.value;
  if (!text) {
    input.focus();
    return;
  }

  const item = createItem(text);
  items.append(item);

  item.scrollIntoView({ block: 'center' });

  input.value = '';
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const itemInfo = document.createElement('div');
  itemInfo.setAttribute('class', 'item__info');

  const checkBtn = document.createElement('button');
  checkBtn.setAttribute('class', 'item__check');

  const checkBtnIcon = document.createElement('i');
  checkBtnIcon.setAttribute('class', 'far fa-check-circle checked-icon');

  checkBtn.addEventListener('click', () => {
    itemName.classList.toggle('checked');
    if (itemName.classList.contains('checked')) {
      checkBtn.classList.add('checked');
      checkBtn.style.transform = 'rotateY(180deg)';
      setTimeout(() => {
        checkBtnIcon.classList.add('fas');
        checkBtnIcon.classList.remove('far');
      }, 200);
    } else {
      checkBtn.classList.remove('checked');
      checkBtn.style.transform = 'rotateY(0deg)';
      setTimeout(() => {
        checkBtnIcon.classList.remove('fas');
        checkBtnIcon.classList.add('far');
      }, 200);
    }
  });

  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item__name');
  itemName.innerText = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__delete');
  deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item__divider');

  checkBtn.append(checkBtnIcon);
  itemInfo.append(checkBtn);
  itemInfo.append(itemName);
  item.append(itemInfo);
  item.append(deleteBtn);
  itemRow.append(item);
  itemRow.append(itemDivider);

  return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    onAdd();
  }
});
