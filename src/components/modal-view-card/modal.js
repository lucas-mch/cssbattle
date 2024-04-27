const modal = document.getElementById("modal-view-card");

document.addEventListener('keydown', (e) => {
  console.log("modal key down", e.key);
  if (e.key === 'Escape') {
    closeModalViewCard();
  }
})

function closeModalViewCard() {
  panel.style.filter = '';
  removeOpenAnimation();
  if (isOpened()) { modal.classList.remove('opened'); }
}

function openModalViewCard(id) {
  panel.style.filter = 'blur(8px)';
  let iframe = document.getElementById(id).cloneNode();
  fill(iframe);
  addOpenAnimation();
  if (!isOpened()) { modal.classList.add('opened'); }
}

function addOpenAnimation() {
  if (!hasOpenAnimation()) { modal.classList.add('open-animation'); }
}

function removeOpenAnimation() {
  if (hasOpenAnimation()) { modal.classList.remove('open-animation'); }
}

function hasOpenAnimation() {
  return modal.classList.contains('open-animation');
}

function isOpened() {
  return modal.classList.contains('opened');
}