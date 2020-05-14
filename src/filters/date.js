export default value => {
  const date = new Date(value);
  return date.toLocaleString(['en-EN'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};
