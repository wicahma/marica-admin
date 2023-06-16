export const findBarang = (value, data, setValue = () => {}) => {
  const video = data.filter(({ _id, title }) => {
    return _id.includes(value);
  });
  return setValue(video);
};
