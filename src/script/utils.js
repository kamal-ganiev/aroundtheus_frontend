//////////// Opening/Closing Modals Functions \\\\\\\\\\\\

function openModal(modal) {
  modal.addEventListener("mousedown", handleOutsideClickClose);
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.removeEventListener("mousedown", handleOutsideClickClose);
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

const modalCloseButtons = document.querySelectorAll(".modal__close-button");
modalCloseButtons.forEach((item) => {
  item.addEventListener("click", () => closeModal(item.closest(".modal")));
});

//////////// Opening/Closing Modals by Pressing "Escape" \\\\\\\\\\\\

const modalList = Array.from(document.querySelectorAll(".modal"));

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
};

//////////// Opening/Closing Modals by Clicking Outside of Modals \\\\\\\\\\\\

const handleOutsideClickClose = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
};

export { openModal, closeModal };
