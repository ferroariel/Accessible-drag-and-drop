document.addEventListener('DOMContentLoaded', function () {
  // let's define some constants to hold references to our interface structural components
  const statusElement = document.getElementById('status');
  const draggableItems = document.querySelectorAll('[draggable="true"]');
  const dropzone = document.getElementById('dropzone');
  const droppedItemsList = document.getElementById('dropped-items');

  // use a variable to hold a reference to an element when it is being dragged
  let draggedItem = null;

  const dragSound = document.querySelector('#drag-sound');
  const dropSound = document.querySelector('#drop-sound');

  // create a function to keep all users updated about the changes in the interface
  const updateStatusMessage = (message) => {
    statusElement.textContent = message;
  };

  // add handlers for dragging and dropping events
  const handleDragStart = (event) => {
    startDrag(event.target.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dropItem();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnd = (event) => {
    event.target.setAttribute('aria-grabbed', 'false');
  };

  const addDroppedItem = (itemId) => {
    if (itemId) {
      const listItem = document.createElement('li');
      listItem.setAttribute('tabindex', '0');
      listItem.textContent = itemId;
      droppedItemsList.appendChild(listItem);
    } else {
      updateStatusMessage(`Drop has failed.`);
    }
  };
// add event listeners to the draggable items and drop zone to fire our handlers
  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
  });

  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('drop', handleDrop);
});

// now we create the function responsible for starting the dragging process, update the UI and notify the change
function startDrag(itemId) {
  const statusElement = document.getElementById('status');
  const dragSound = document.querySelector('#drag-sound');

  draggedItem = itemId;
  statusElement.textContent = `Drag started for ${draggedItem}.`;
  dragSound.play();
  document.getElementById(itemId).setAttribute('aria-grabbed', 'true');
}

// finally, create a function to drop the item in the drop zone and add it to the list of dragged items
function dropItem() {
  const statusElement = document.getElementById('status');
  const dropSound = document.querySelector('#drop-sound');

  if (draggedItem) {
    const droppedItemsList = document.getElementById('dropped-items');
    const listItem = document.createElement('li');
    listItem.setAttribute('tabindex', '0');
    listItem.textContent = draggedItem;
    droppedItemsList.appendChild(listItem);
    statusElement.textContent = `Element dropped in the drop zone successfully.`;
    dropSound.play();
    draggedItem = null;
  } else {
    statusElement.textContent = `No item to drop.`;
  }
}
