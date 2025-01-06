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

const dateFormatter = (dateStr: string) => {
    const date = new Date(dateStr);

    // Create new Intl.DateTimeFormat (formatter) object with id-ID locale
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: 'medium',
        timeZone: 'Asia/Jakarta', // Set timezone
    });

    return formatter.format(date);
}

const checkStatus = (dateStr: string, waktuMasukMaksimal: string, waktuPulang: string) => {
    const date = new Date(dateStr);
    const extractedDate = extractDate(dateStr);
  
    // Create thresholds
    const tepatWaktu = new Date(`${extractedDate}T${waktuMasukMaksimal}Z`);
    const terlambat = new Date(`${extractedDate}T${waktuPulang}Z`);
  
    if (date < tepatWaktu) {
      return { status: "Tepat Waktu", minutesLate: 0 };
    } else if (date < terlambat) {
      const minutesLate = Math.floor((date.getTime() - tepatWaktu.getTime()) / (1000 * 60));
      return { status: "Terlambat", minutesLate };
    } else {
      return { status: "Pulang", minutesLate: 0 };
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

function getNumberOfWeekdays(startDateStr: string, endDateStr: string): number {
  let weekdaysCount = 0;

  // Parse the date strings to get the start and end dates
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Ensure the end date is inclusive
  endDate.setDate(endDate.getDate() + 1); // Move to the next day for inclusive counting

  // Iterate through each day in the range
  for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
      const day = date.getDay();
      // Check if the day is a weekday (Monday to Friday)
      if (day !== 0 && day !== 6) {
          weekdaysCount++;
      }
  }

  return weekdaysCount;
}

export { formatter, dateFormatter, checkStatus, extractDate, extractTime, extractYear, getNumberOfWeekdays }
