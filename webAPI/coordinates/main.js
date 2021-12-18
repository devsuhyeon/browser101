const target = document.querySelector('.target');
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', (event) => {
  let x = event.clientX;
  let y = event.clientY;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  horizontal.style.top = `${y}px`;
  vertical.style.left = `${x}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.innerHTML = `${x}px, ${y}px`;
});
