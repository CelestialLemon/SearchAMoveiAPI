const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
const month2 = formatter.format(new Date(2003, 11, 12));

console.log(month2);