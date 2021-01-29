export const PATTERN = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^[^\s]+$/,
    name: /(.|\s)*\S(.|\s)*/,
// name: /^[a-z A-Z ]*$/,
    phone: "^[1-9][0-9]*$",
    price: /(^[0][1-9]+)|([1-9]\d*)+$/,
    alphaNumeric: "^[a-zA-Z0-9]+$",
    alphaNumericWithSpace: "^[a-zA-Z0-9 ]+$",
    alphabetsWithSpace: "^[a-zA-Z ]*$",
    // onlyNumber: /^[0-9]*/
    onlyNumber: "^[0-9]*$",
    noSpace: /^\S*$/,
    REGNO: /(^[A-Za-z]{2}(?:[0-9]){2}(?:[A-Za-z]){1,2}([0-9]){4})$/i
};
