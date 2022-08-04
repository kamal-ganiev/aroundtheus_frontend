import Modal from "./Modal";

export default class ModalWithImage extends Modal {
  handleOpenImagePreview(image) {
    const modalPreviewImage = document.querySelector(`.modal-preview__image`);

    modalPreviewImage.src = image.src;
    modalPreviewImage.alt = image.alt;
    document.querySelector(`.modal-preview__title`).textContent = image.alt;
  }
}
