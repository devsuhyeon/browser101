const addBtn = document.querySelector('.footer__button');
const input = document.querySelector('.footer__input');
const items = document.querySelector('.items');
const form = document.querySelector('.new-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

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

let id = 0;
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);

  itemRow.innerHTML = `
    <div class="item">
      <div class="item__info">
        <button class="item__check">
          <i class="far fa-check-circle checked-icon" data-check-id=${id}></i>
        </button>
        <span class="item__name">${text}</span>
      </div>
      <button class="item__delete">
        <i class="fas fa-trash-alt" data-delete-id=${id}></i>
      </button>
    </div>
    <div class="item__divider"></div>
  `;

  id++;
  return itemRow;
}

items.addEventListener('click', (event) => {
  const checkId = event.target.dataset.checkId;
  const deleteId = event.target.dataset.deleteId;

  if (!checkId && !deleteId) {
    return;
  }

  if (checkId) {
    const itemRow = document.querySelector(`.item__row[data-id="${checkId}"]`);
    const itemName = itemRow.querySelector('.item__name');
    const checkBtn = itemRow.querySelector('.item__check');
    const checkBtnIcon = itemRow.querySelector('.checked-icon');

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
  } else if (deleteId) {
    const toBeDeleted = document.querySelector(
      `.item__row[data-id="${deleteId}"]`
    );
    toBeDeleted.remove();
  }
});
