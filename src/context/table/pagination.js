export const getItemProps = (index, active, setActive = () => {}) => ({
  variant: active === index ? "gradient" : "text",
  color: active === index ? "blue" : "blue-gray",
  onClick: () => setActive(index),
  key: index,
});

export const next = (active, setActive = () => {}) => {
  if (active === 5) return;
  setActive(active + 1);
};

export const prev = (active, setActive = () => {}) => {
  if (active === 1) return;
  setActive(active - 1);
};

export const pageDivider = (data) => {
  const limiter = 20;
  const totalPages = Math.ceil(data.length / limiter);
  let divider = [];

  for (let indP = 0; indP < totalPages; indP++) {
    let page = [];
    for (let indD = indP * limiter; indD < (indP + 1) * limiter; indD++) {
      if (data[indD] !== undefined) page = [...page, data[indD]];
      else break;
    }
    divider = [...divider, page];
  }

  return { data: divider, pages: totalPages };
};
