async function handleSubmit(event) {
  event.preventDefault();
  console.log("Hello");

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  if (formText.length == 0) {
    alert("Input field cannot be empty");
    return;
  }
  //validate url
  const valid = Client.simpleUrlValidation(formText);

  console.log(valid);
  if (!valid) {
    document.getElementById("valid").innerHTML =
      "URL is invalid, try including 'http' in your URL";
    //to exit from the function
    return;
  } else {
    document.getElementById("valid").innerHTML = " ";
  }
  const requestedOption = {
    url: formText,
  };

  try {
    //calling api with URL
    sentimentAnalysis("http://localhost:8081/analysis", requestedOption).then(
      function (response) {
        //Updating UI
        document.getElementById("status").innerHTML =
          "Status: " + response.status.msg;

        document.getElementById("polarity").innerHTML =
          "Polarity: " + response.score_tag;

        document.getElementById("subjectivity").innerHTML =
          "Subjectivity: " + response.subjectivity;

        document.getElementById("snippet").innerHTML =
          "Snippet text from article: " + response.sentence_list[0].text;
      }
    );
  } catch (error) {
    console.log("An error occured " + error);
  }
}

const sentimentAnalysis = async (endPoint = "", requestedOption = {}) => {
  const response = await fetch(endPoint, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestedOption),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("An error occured " + error);
  }
};
export { handleSubmit };
