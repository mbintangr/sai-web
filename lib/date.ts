import { DateTime } from "next-auth/providers/kakao";

const formatter = (dateStr: string) => {
    // create new date object from dateStr
    const date = new Date(dateStr);

    // create new Intl.DateTimeFormat (formatter) object with id-ID locale
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: 'medium',
        timeStyle: 'short',
    })
    
    return formatter.format(date);
}

const checkStatus = (dateStr: DateTime) => {
    const date = new Date(dateStr);

    // Create thresholds
    const tepatWaktu = new Date(date);
    tepatWaktu.setHours(7, 0, 0, 0);

    const terlambat = new Date(date);
    terlambat.setHours(14, 0, 0, 0);

    if (date < tepatWaktu) {
        return "Tepat Waktu";
    } else if (date < terlambat) {
        return "Terlambat";
    } else {
        return "Pulang";
    }
};

const extractDate = (dateStr: DateTime) => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
}

const extractTime = (dateStr: DateTime) => {
    const date = new Date(dateStr);
    return date.toTimeString().split(' ')[0];
}

export { formatter, checkStatus, extractDate, extractTime }