export const CheckvalidatePassword = (p, passwordValid) => {
  let data = passwordValid;

  if (p.length > 11) {
    data.length = true;
  } else {
    data.length = false;
  }

  if (p.search(/[A-Z]/) < 0) {
    data.uppercase = false;
  } else {
    data.uppercase = true;
  }

  if (p.search(/[0-9]/) < 0) {
    data.number = false;
  } else {
    data.number = true;
  }
  if (p.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:\-]/) < 0) {
    data.specailchar = false;
  } else {
    data.specailchar = true;
  }
  return data;
};

export const CheckvalidEmail = (text) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(text)) return true;
  else return false;
};
