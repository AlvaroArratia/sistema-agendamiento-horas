const formatEvents = events => {
    let nowDate = new Date();
    let nowDay = nowDate.getDate();
    let nowMonth = nowDate.getMonth() + 1;
    for (const key in events) {
        events[key].allDay = false;
        events[key].start = `${nowDate.getFullYear()}-${nowMonth < 10 ? "0" + nowMonth : nowMonth}-${nowDay < 10 ? "0" + nowDay : nowDay}T${events[key].inicio}`;
        events[key].end = `${nowDate.getFullYear()}-${nowMonth < 10 ? "0" + nowMonth : nowMonth}-${nowDay < 10 ? "0" + nowDay : nowDay}T${events[key].fin}`;
        events[key].backgroundColor = 'rgb(64, 61, 93)';
        events[key].borderColor = 'rgb(64, 61, 93)';
    }
    return events;
};

export default {
    formatEvents
};