export const validateAlpabetical = value => {
    const alfa = new RegExp(/^[a-z]+$/i);

    return alfa.test(value) ? '' : 'Только латинские буквы!';
};

export const validateNumeric = value => {
    console.log('validateNumeric ->' + value)
    const numeric = new RegExp(/^(\-)?[\d]+(\.\d+)?$/i);
    return numeric.test(value) ? '' : 'Только числа!';
};

// export const isNumeric(value) =  {
//   return !isNaN(parseFloat(value)) && isFinite(n);
// }

export const validateMaxLength = maxlength => value => {
    return value.length < maxlength ? '' : 'Не более ' + maxlength + ' символов!';
};

export const validateRequired = value => {
    return value.length > 0 ? '' : 'Поле обязательно к заполнению!';
};

export const validateEmail = value => {
    const email = /^\w+@\w+\.\w{2,4}$/i;
    return email.test(value) ? '' : 'Email невалидный!';
};

export const validateImg = () => {
    const img = document.getElementById('fileUpload').files[0];

    let resCheck =
        (img && img.name.includes('.jpg')) ||
        (img && img.name.includes('.png')) ||
        (img && img.name.includes('.gif'))
            ? ''
            : 'Загружаемая картинка должна быть одного из трех форматов - jpg, gif или png';

    return resCheck;
};

export const clearFileField = () => {
    let form = document.getElementById('feedback');
    let lengthFormElements = form.elements.length;
    //Массив значений всех элементов формы
    var values = new Array(form.elements.length);

    //Запись значений всех элементов формы
    for (var i = 0; i < lengthFormElements; i++) {
        values[i] = form.elements.item(i).value;
    }

    form.reset(); //Сброс значений всех элементов формы

    //Восстановление значений всех элементов формы, кроме input file
    for (var j = 0; j < lengthFormElements; j++) {
        //Здесь сравнивается тип, т.к. используется один input file
        //Если элементов input file больше, то нужно использовать id
        if (form.elements.item(j).type !== 'file') {
            form.elements.item(j).value = values[j];
        }
    }
};

export const setFieldBorderOnFocus = (isFieldValid, id) => {
    const field = document.getElementById(id);

    if (isFieldValid) {
        field.classList.remove('err');
        field.classList.remove('focusInValid');
        field.classList.add('ok');
    } else {
        field.classList.remove('ok');
        field.classList.remove('err');
        field.classList.remove('calc-field');
        field.classList.add('focusInValid');
    }
};

export const setFieldBorderOnBlur = (isFieldValid, id) => {
    const field = document.getElementById(id);

    if (isFieldValid) {
        field.classList.remove('err');
        field.classList.remove('focusInValid');
        field.classList.add('ok');
    } else {
        field.classList.remove('ok');
        field.classList.remove('focusInValid');
        field.classList.add('err');
    }
};
