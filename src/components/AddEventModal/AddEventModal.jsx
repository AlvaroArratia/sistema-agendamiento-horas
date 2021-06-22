import React, { useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import validations from '../utils/validations';
import "react-datetime/css/react-datetime.css";
import './styles/addEventModal.scss';

Modal.setAppElement('#root');

const AddEventModal = ({ modalType, isOpen, onClose, onAddEvent, onDeleteEvent, onUpdateEvent, event, chargers }) => {
    const [eventId, setEventId] = useState(2);
    const [day, setDay] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [licensePlate, setLicesnsePlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");

    const resetInputs = () => {
        setDay("");
        setStart("");
        setEnd("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setLicesnsePlate("");
        setBrand("");
        setModel("");
    };

    const onSubmit = () => {
        const data = {
            day,
            start,
            end,
            nombre: firstName,
            apellido: lastName,
            email,
            patente: licensePlate,
            marca: brand,
            modelo: model,
        };
        if (validations.validateInputs(data)) {
            onAddEvent({
                id: eventId,
                allDay: false,
                inicio: validations.formatDate(day, start),
                fin: validations.formatDate(day, end),
                start: validations.formatDate(day, start),
                end: validations.formatDate(day, end),
                nombre: firstName,
                apellido: lastName,
                email,
                patente: licensePlate,
                marca: brand,
                modelo: model,
                backgroundColor: 'rgb(64, 61, 93)',
                borderColor: 'rgb(64, 61, 93)'
            });
            setEventId(eventId + 1);
            resetInputs();
            onClose();
        }
    };

    const onDelete = () => {
        onDeleteEvent(event);
        resetInputs();
        onClose();
    };

    const onUpdate = () => {
        const data = {
            day,
            start,
            end,
            nombre: firstName,
            apellido: lastName,
            email,
            patente: licensePlate,
            marca: brand,
            modelo: model,
        };
        if (validations.validateInputs(data)) {
            onUpdateEvent({
                event,
                newData: {
                    id: event.id,
                    inicio: validations.formatDate(day, start),
                    fin: validations.formatDate(day, end),
                    nombre: firstName,
                    apellido: lastName,
                    email,
                    patente: licensePlate,
                    marca: brand,
                    modelo: model
                }
            });
            resetInputs();
            onClose();
        }
    };

    return (
        <Modal
            className="add-event-modal"
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: 'transparent'
                }
            }}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <form className="col">
                <div className="col col-12">
                    <div className="row">
                        <div className="col col-12">
                            <div className="row align-items-center mb-2">
                                <h2 id="add-event-modal-title" className="modal-title mr-3">
                                    {modalType === "create" ? "Agendar carga" : "Editar evento de carga"}
                                </h2>
                                {modalType === "edit" ?
                                    <button type="button" id="delete-event-btn" className="delete-modal-btn" onClick={onDelete}>Eliminar</button> :
                                    ""}
                            </div>
                            <div className="row mb-2">
                                <div className="col col-4">
                                    <Datetime
                                        timeFormat={false}
                                        inputProps={{
                                            id: "day-datetime",
                                            placeholder: "Fecha",
                                            className: "date-input",
                                            required: true
                                        }}
                                        value={day}
                                        onChange={date => setDay(date)}
                                    />
                                </div>
                                <div className="col col-4">
                                    <Datetime
                                        dateFormat={false}
                                        inputProps={{
                                            id: "start-datetime",
                                            placeholder: "Hora inicio",
                                            className: "date-input",
                                            required: true
                                        }}
                                        value={start}
                                        onChange={date => setStart(date)}
                                    />
                                </div>
                                <div className="col col-4 justify-end">
                                    <Datetime
                                        dateFormat={false}
                                        inputProps={{
                                            id: "end-datetime",
                                            placeholder: "Hora fin",
                                            className: "date-input",
                                            required: true
                                        }}
                                        value={end}
                                        onChange={date => setEnd(date)}
                                    />
                                </div>
                            </div>
                            <span id="chargers">Cargador 1</span>
                        </div>
                    </div>
                    <div className="col col-12">
                        <h3 className="modal-subtitle">¿Quién agenda la carga?</h3>
                        <div className="row mb-3">
                            <div className="col col-6 mr-2">
                                <input type="text" id="fname-field" placeholder="Nombre" value={firstName} onChange={e => setFirstName(e.target.value)} required={true} />
                            </div>
                            <div className="col col-6 ml-2">
                                <input type="text" id="lname-field" placeholder="Apellido" value={lastName} onChange={e => setLastName(e.target.value)} required={true} />
                            </div>
                        </div>
                        <input type="email" id="email-field" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required={true} />
                    </div>
                    <div className="col col-12 mb-4">
                        <h3 className="modal-subtitle">Datos del vehículo</h3>
                        <div className="row car-info">
                            <div className="col col-4 align-items-start">
                                <input type="text" id="license-plate-field" placeholder="Patente" value={licensePlate} onChange={e => setLicesnsePlate(e.target.value)} required={true} />
                            </div>
                            <div className="col col-4 align-items-center">
                                <input type="text" id="car-brand-field" placeholder="Marca" value={brand} onChange={e => setBrand(e.target.value)} required={true} />
                            </div>
                            <div className="col col-4 align-items-end">
                                <input type="text" id="car-model-field" placeholder="Modelo" value={model} onChange={e => setModel(e.target.value)} required={true} />
                            </div>
                        </div>
                    </div>
                    <div className="col col-12">
                        <div className="row row-reverse justify-space-btw">
                            {modalType === "create" ?
                                <button type="button" className="success-modal-btn" onClick={onSubmit}>Guardar</button> : ""}
                            {modalType === "edit" ?
                                <button type="button" className="success-modal-btn" onClick={onUpdate}>Actualizar</button> :
                                ""}
                            <span id="warning-message"></span>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default AddEventModal;