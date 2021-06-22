import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import AddEventModal from '../AddEventModal/AddEventModal';
import apiCalls from '../../api_calls';
import format from '../utils/format';
import './styles/calendar.scss';

const Calendar = () => {
    const [chargers, setChargers] = useState([]);
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    let calendarRef = useRef(null);

    useEffect(() => {
        const firstLoadEvents = async () => {
            const apiEvents = await apiCalls.eventApiCall.getAllEvents();
            const formatedEvents = format.formatEvents(apiEvents);
            setEvents(formatedEvents);
        };

        const firstLoadChargers = async () => {
            const apiChargers = await apiCalls.chargerApiCall.getAllChargers();
            setChargers(apiChargers);
        };

        firstLoadEvents();
        firstLoadChargers();
    }, []);

    const renderEventContent = event => {
        return (
            <div className="row wrap pl-3 pt-2">
                <span className="event-info">
                    {`${event.event.extendedProps.patente} - ${event.event.extendedProps.marca} - ${event.event.extendedProps.modelo}`}
                </span>
                <span className="event-info">{`${event.event.extendedProps.nombre} ${event.event.extendedProps.apellido}`}</span>
                <span className="event-info">Cargador {event.event.extendedProps.chargerId}</span>
                <span className="event-info">{event.timeText}</span>
            </div>
        )
    };

    const onClickEventHandler = eventInfo => {
        setEvent(eventInfo.event);
        setModalType("edit");
        setModalOpen(true);
    };

    const onSelectHandler = selectInfo => {
        setModalType("create");
        setModalOpen(true);
    };

    const onAddEvent = async event => {
        try {
            let calendarApi = await calendarRef.current.getApi();
            calendarApi.addEvent(event);
        } catch (error) {
            console.error(error);
        }
    };

    const onDeleteEvent = event => {
        event.remove();
    };

    const onUpdateEvent = async res => {
        try {
            res.event.setDates(res.newData.inicio, res.newData.fin);
            res.event.setExtendedProp("id", res.newData.id);
            res.event.setExtendedProp("inicio", res.newData.inicio);
            res.event.setExtendedProp("fin", res.newData.fin);
            res.event.setExtendedProp("nombre", res.newData.nombre);
            res.event.setExtendedProp("apellido", res.newData.apellido);
            res.event.setExtendedProp("email", res.newData.email);
            res.event.setExtendedProp("patente", res.newData.patente);
            res.event.setExtendedProp("marca", res.newData.marca);
            res.event.setExtendedProp("modelo", res.newData.modelo);
            res.event.setExtendedProp("chargerId", res.newData.chargerId);
            apiCalls.eventApiCall.updateEvent(res.event.extendedProps);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <div className="full-calendar-wrapper">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridDay"
                    allDaySlot={false}
                    selectable={true}
                    select={onSelectHandler}
                    eventClick={onClickEventHandler}
                    events={events}
                    eventContent={renderEventContent}
                    eventAdd={(addInfo) => {
                        apiCalls.eventApiCall.createEvent(addInfo.event.extendedProps);
                    }}
                    eventRemove={(removeInfo) => {
                        apiCalls.eventApiCall.deleteEvent(removeInfo.event.id);
                    }}
                />
            </div>
            <AddEventModal
                chargers={chargers}
                modalType={modalType}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                event={event}
                onAddEvent={event => onAddEvent(event)}
                onDeleteEvent={event => onDeleteEvent(event)}
                onUpdateEvent={event => onUpdateEvent(event)}
            />
        </section>
    );
}

export default Calendar;