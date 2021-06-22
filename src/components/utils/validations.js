import moment from 'moment';

const formatDate = (date, hour) => {
    const separateDate = moment(date).toISOString().split("T");
    const separateHour = moment(hour).toISOString().split("T");
    return `${separateDate[0]}T${separateHour[1]}`;
};

const markWrongInput = (idElement) => {
    document.querySelector(idElement).style.borderColor = "red";
};

const unMarkInput = (idElement) => {
    document.querySelector(idElement).style.borderColor = "silver";
};

const isEmpty = (value, idElement) => {
    if (value == "" || value == null || value == undefined) {
        markWrongInput(idElement);
        return false;
    } else {
        unMarkInput(idElement);
        return true;
    }
};

const validateDate = (date, idElement) => {
    if (moment(date, 'DD/MM/YYYY').isValid()) {
        unMarkInput(idElement);
        return true;
    } else {
        markWrongInput(idElement);
        return false;
    }
};

const validateEmail = (email, idElement) => {
    var regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!regex.test(email)) {
        markWrongInput(idElement);
        return false;
    } else if (regex.test(email)) {
        unMarkInput(idElement);
        return true;
    }
};

const validateInputs = (data) => {
    if (isEmpty(data.day, "#day-datetime") &&
        isEmpty(data.start, "#start-datetime") &&
        isEmpty(data.end, "#end-datetime") &&
        validateDate(data.day, "#day-datetime") &&
        validateDate(data.start, "#start-datetime") &&
        validateDate(data.end, "#end-datetime") &&
        isEmpty(data.nombre, "#fname-field") &&
        isEmpty(data.apellido, "#lname-field") &&
        isEmpty(data.email, "#email-field") &&
        validateEmail(data.email, "#email-field") &&
        isEmpty(data.patente, "#license-plate-field") &&
        isEmpty(data.marca, "#car-brand-field") &&
        isEmpty(data.modelo, "#car-model-field")) {
        document.querySelector("#warning-message").textContent = "";
        return true;
    } else {
        document.querySelector("#warning-message").textContent = "Faltan campos por completar y/o el formato no es valido";
        return false;
    }
};

export default {
    formatDate,
    validateInputs
};