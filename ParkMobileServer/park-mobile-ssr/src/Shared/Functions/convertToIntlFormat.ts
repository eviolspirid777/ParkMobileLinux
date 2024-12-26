export const convertToIntlFormat = (number: string | number | undefined) => {
  let convertedNumber = number;
  if(typeof convertedNumber === "string") {
    convertedNumber = parseInt(convertedNumber);
  }
  if(convertedNumber !== undefined) {
    return Intl.NumberFormat("ru-RU").format(convertedNumber)
  }
}