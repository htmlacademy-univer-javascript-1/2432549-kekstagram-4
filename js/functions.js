const isEqualOrLess = (string, length) => string.length<=length;

const isPalindromic = (string) =>{

  let preparedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = preparedString.split('').reverse().join('');

  return reversedString===preparedString;
};
