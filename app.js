"use strict"

app(data);

function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      break;
    default:
      app(people);
      break;
  }
  mainMenu(searchResults, people);
}

function mainMenu(person, people) {
  if (person.length == 0) {
    alert("Could not find that individual.");
    return app(people);
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      displayPerson(people);
      // TODO: get person's info
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

function searchByGender(people) {

}

function searchByDoB(people) {

}

function searchByHeight(people) {

}

function searchByWeight(people) {

}

function searchByEyeColor(people) {

}

function searchByOccupation(people) {

}

function searchByParents(people) {

}

function searchBySpouse(people) {

}

function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Age: " + person[0].age + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  }
  else {
    return false;
  }
}

function autoValid(input) {
  return true; // default validation only
}