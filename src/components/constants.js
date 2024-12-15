export function formatDate(dateString) {
  return dateString.split('-').reverse().join('.');
}

export function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
