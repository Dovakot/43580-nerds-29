'use strict';

const slider = document.querySelector('.slider');

const buttonOpenModal = document.querySelector('.contacts__link');
const modal = document.querySelector('.modal');
const buttonCloseModal = modal.querySelector('.modal__button');
const modalForm = modal.querySelector('.modal-form');
const modalListFilds = modalForm.querySelectorAll('.modal-form__field');
const storage = localStorage;

/* Слайдер */

if (slider) {
  const sliderItems = slider.querySelectorAll('.slider__item');
  const sliderButtons = slider.querySelectorAll('.slider__control-button');

  const showCurrentSlide = function (button, slide) {
    button.addEventListener('click', function () {
      if (button.classList.contains('slider__control-button--current')) {
        return false;
      }

      const slideCurrent = slider.querySelector('.slider__item--current');
      const buttonCurrent = slider.querySelector('.slider__control-button--current');

      slideCurrent.classList.remove('slider__item--current');
      buttonCurrent.classList.remove('slider__control-button--current');

      slide.classList.add('slider__item--current');
      button.classList.add('slider__control-button--current');
    });
  };

  for (let i = 0; i < sliderItems.length; i++) {
    showCurrentSlide(sliderButtons[i], sliderItems[i]);
  }
}

/* Модальное окно */

const closeModal = function () {
  document.body.classList.remove('modal-show');
  modal.classList.remove('modal--show');

  const fildInvalid = modalForm.querySelector('.modal-form__field--invalid') || modal;
  fildInvalid.classList.remove('modal-form__field--invalid');
};

const checkEmptyFields = function (filds) {
  for (let fild of filds) {

    if (!fild.value && fild.tagName !== 'TEXTAREA') {
      fild.classList.remove('modal-form__field--invalid');
      void fild.offsetWidth;
      fild.classList.add('modal-form__field--invalid');

      fild.focus();

      return true;
    }

  }

  return false;
};

const saveDataToStorage = function (filds) {
  for (let fild of filds) {

    if (fild.tagName !== 'TEXTAREA') {
      const attrName = fild.getAttribute('name');

      storage.setItem(attrName, fild.value);
    }

  }
};

const writeDataToFields = function (filds) {
  let focusField = null;

  for (let fild of filds) {

    fild.removeAttribute('required');

    if (storage) {

      const attrName = fild.getAttribute('name');
      const storageValue = storage.getItem(attrName);

      if (storageValue) {
        fild.value = storageValue;
      }

    }

    if (!focusField && !fild.value) {
      focusField = fild;
    }

  }

  return focusField || filds[0];
};

buttonOpenModal.addEventListener('click', function (evt) {
  evt.preventDefault()
  modalForm.reset();

  const focusField = writeDataToFields(modalListFilds);

  document.body.classList.add('modal-show');
  modal.classList.add('modal--show');

  focusField.focus();
});

modalForm.addEventListener('submit', function (evt) {
  const fildEmpty = checkEmptyFields(modalListFilds);

  if (fildEmpty) {
    evt.preventDefault();
  } else {

    if (storage) {
      saveDataToStorage(modalListFilds);
    }

  }
});

buttonCloseModal.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeModal();
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {

    if (modal.classList.contains('modal--show')) {
      evt.preventDefault();
      closeModal();
    }

  }
});
