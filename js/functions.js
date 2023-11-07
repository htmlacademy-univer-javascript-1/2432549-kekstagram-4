const isEqualOrLess = (string, length) => string.length<=length;

const isPalindromic = (string) =>{

  const preparedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = preparedString.split('').reverse().join('');

  return reversedString===preparedString;
};

isEqualOrLess();
isPalindromic();
