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

const checkStatus = (dateStr: string) => {
    const date = new Date(dateStr);
    const extractedDate = extractDate(dateStr);
  
    // Create thresholds
    const tepatWaktu = new Date(`${extractedDate}T07:00:00.000Z`);
    const terlambat = new Date(`${extractedDate}T14:00:00.000Z`);
  
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

function getNumberOfWeekdays(dateStr: string): number {
    let weekdaysCount = 0;
  
    // Parse the date string to get the year and month
    const [year, month] = dateStr.split('-').map(Number);
  
    // Note: JavaScript's Date object uses zero-based months (0 for January, 11 for December)
    const date = new Date(year, month - 1, 1);
  
    // Iterate through each day of the month
    while (date.getMonth() === month - 1) {
      const day = date.getDay();
      // Check if the day is a weekday (Monday to Friday)
      if (day !== 0 && day !== 6) {
        weekdaysCount++;
      }
      // Move to the next day
      date.setDate(date.getDate() + 1);
    }
  
    return weekdaysCount;
  }

export { formatter, dateFormatter, checkStatus, extractDate, extractTime, extractYear, getNumberOfWeekdays }
