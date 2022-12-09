function simpleUrlValidation(inputText) {
  console.log("::: Running Validation :::", inputText);

  //simply checking if it includes http or not
  if (inputText.includes("http")) {
    return true;
  } else {
    return false;
  }
}

export { simpleUrlValidation };
