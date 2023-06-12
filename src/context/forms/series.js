export const findBarang = (value, data, setValue = () => {}) => {
  const video = data.filter(({ _id, title }) => {
    return _id.includes(value);
    // || title.includes(value)
  });
  return setValue(video);
};
