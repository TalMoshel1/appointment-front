export function getStartOfWeek(currentDateString) {
    const now = new Date(currentDateString);
    const dayOfWeek = now.getDay(); 
  
    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0); 
  
    // Convert to UTC
    const startOfWeekUTC = new Date(startOfWeek.toUTCString());
  
    // Format to ISO string in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
    return startOfWeekUTC.toISOString();
  }