const formatter = (dateStr: string) => {
    const date = new Date(dateStr);

    // Create new Intl.DateTimeFormat (formatter) object with id-ID locale
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC', // Set timezone
    });

    return formatter.format(date);
}

const checkStatus = (dateStr: string) => {
    const date = new Date(dateStr);

    const extractedDate = extractDate(dateStr);
    
    // Create thresholds
    const tepatWaktu = new Date(`${extractedDate}T07:00:00.000Z`);
    const terlambat = new Date(`${extractedDate}T14:00:00.000Z`);

    if (date < tepatWaktu) {
        return "Tepat Waktu";
    } else if (date < terlambat) {
        return "Terlambat";
    } else {
        return "Pulang";
    }
};

const extractDate = (dateStr: string) => {
    const date = new Date(dateStr);

    // Get the date part only, in UTC
    return date.toISOString().split('T')[0];
}

const extractTime = (dateStr: string) => {
    const date = new Date(dateStr);

    // Get the time part only, in UTC
    return date.toISOString().split('T')[1].split('.')[0];
}


const extractYear = (dateStr: string) => {
    const date = new Date(dateStr);

    const localDate = new Date(date.getTime());

    return localDate.getFullYear();
}

export { formatter, checkStatus, extractDate, extractTime, extractYear }
