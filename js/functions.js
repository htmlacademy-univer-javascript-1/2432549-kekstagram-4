const isEqualOrLess = (string, length) => string.length<=length;

const isPalindromic = (string) =>{

  let preparedString = string.toLowerCase().replaceAll(" ", "");
  let reversedString = "";

  for (let i = preparedString.length-1; i>=0;  i--){
      reversedString += preparedString[i];
  }

  return reversedString===preparedString;
}
