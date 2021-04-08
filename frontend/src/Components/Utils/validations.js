export const validateEmailAddress = (email) => {
  const pattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

export const validatePassword = (password) => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?%#`^()_=+{}[|\\\];:'"<>,./?~&])[A-Za-z\d$@!%*?%#`^()_=+{}[|\\\];:'"<>,./?~&]{8,49}/;
  return pattern.test(password);
};
