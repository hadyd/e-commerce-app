const formatRp = (number) => {
  if (number) {
    const locale = 'id-ID';
    const options = { style: 'currency', currency: 'IDR' };
    const formattedNumber = number.toLocaleString(locale, options);
    return formattedNumber;
  }
};

export { formatRp };
