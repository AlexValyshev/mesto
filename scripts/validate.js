enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// Функция поиска всех форм на странице.
function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const allForm = Array.from(document.querySelectorAll(formSelector));
  allForm.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

// Функция поиска всех полей и кнопок в форме и их обработка.
function setEventListeners (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const allInput = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  allInput.forEach((input) => {
    input.addEventListener('input', () => {
    checkInputValidity(form, input, inputErrorClass, errorClass);
    toggleSubmitButton(allInput, button, inactiveButtonClass);
  });
});
}

// Функция валидации полей формы.
const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    addError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    removeError(form, input, inputErrorClass, errorClass);
  }
};

// Функция добавления и стилизации ошибки, при невалидности поля формы.
const addError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const inputError = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(errorClass);
};

// Функция удаления стилизации и ошибки, при валидности поля формы.
function removeError (form, input, inputErrorClass, errorClass) {
  const inputError = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  inputError.classList.remove(errorClass);
  inputError.textContent = '';
};

// Функция переключения кнопки.
const toggleSubmitButton = (allInput, button, inactiveButtonClass) => {
  if (containsInvalidInput(allInput)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

// Функция проверки наличия невалидных полей в форме.
const  containsInvalidInput =(allInput) => {
  return allInput.some((input) => {
  return !input.validity.valid;
});
}








