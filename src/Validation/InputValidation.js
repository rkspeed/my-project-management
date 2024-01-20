const EmailValidation = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    console.log(email, regex.test(email));
    alert("Email not valid!");
    return false;
  }
  return true;
};

const ArrayValidation = (array, text) => {
  console.log(array);

  if (array.length == 0) {
    alert(`${text} can not be empty `);
    return false;
  }
  return true;
};

const EmptyValidation = (value,text) => {
  if (value == "") {
    alert(`${text} can not be empty `);
    return false;
  }
  return true;
};
export { EmailValidation, ArrayValidation, EmptyValidation };
