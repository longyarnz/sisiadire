export default function ValidatePhoneNumber(number){
  const { length } = number.toString();
  const digits = Number(number);
  if (length === 1 && digits !== 0) return -1;
  else if (length === 2 && !/^(0)(8|7|9)/.test(number)) return -1;
  else if (length === 3 && !/^0(8|(7|9)(?!1))(0|1)/.test(number)) return -1;
  else if (length === 4 && !/^0(8|(7|9)(?!1))(0(?!0)|1)[0-9]/.test(number)) return -1;
  else if (length > 4 && length <= 11 && !/^0(8|(7|9)(?!1))(0(?!0)|1)[0-9]/.test(number)) return -1;
  else if (length > 11) return number.slice(0, 11);
  else return number;
}