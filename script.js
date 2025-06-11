// Your code here.
const itemsContainer = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let draggedItem = null;
let offsetX = 0;
let offsetY = 0;

// Enable each item to be draggable
items.forEach(item => {
  item.style.position = 'absolute';
  const rect = item.getBoundingClientRect();
  const parentRect = itemsContainer.getBoundingClientRect();
  
  // Initialize their position relative to container
  item.style.left = `${rect.left - parentRect.left}px`;
  item.style.top = `${rect.top - parentRect.top}px`;

  item.addEventListener('mousedown', (e) => {
    draggedItem = item;

    const itemRect = draggedItem.getBoundingClientRect();
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
  });
});

function dragMove(e) {
  if (!draggedItem) return;

  const containerRect = itemsContainer.getBoundingClientRect();
  const itemRect = draggedItem.getBoundingClientRect();

  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  newX = Math.max(0, Math.min(newX, containerRect.width - itemRect.width));
  newY = Math.max(0, Math.min(newY, containerRect.height - itemRect.height));

  draggedItem.style.left = `${newX}px`;
  draggedItem.style.top = `${newY}px`;
}

function dragEnd() {
  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', dragEnd);
  draggedItem = null;
}
