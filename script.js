const container = document.querySelector('.items');
let isDragging = false;
let startX;
let initialScrollLeft;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  container.classList.add('active');
  startX = e.pageX - container.offsetLeft;
  initialScrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
  container.classList.remove('active');
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1.5; // Sensitivity factor
  container.scrollLeft = initialScrollLeft - walk;
});
