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
            searchResults = searchByCriteria(people);
            break;
        default:
            app(people);
            break;
    }
    let onePerson = searchResults[0]
    mainMenu(onePerson, people);
}

function mainMenu(person, people) {
    if (!person) {
        alert("Could not find that individual.");
        return app(people);
    }

    let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " .\n Do you want to know their 'info', 'family', or 'descendants'? \n Type the option you want or 'restart' or 'quit'", validateDisplayOptions);

    switch (displayOption) {
        case "info":
            displayPerson(person);
            break;
        case "family":
            let personFamily = findFamily(person.id, people);
            displayFamily(personFamily);
            break;
        case "descendants":
            let descendants = findDescendants(person.id, people);
            displayDescendants(descendants);
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


//Search Functions

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
    return foundPerson;
}

function searchByCriteria(people) {
    let criteriaNumber = promptFor("How many criterion do you want to use? Enter 1 - 5", validateCriteriaNumber);
    // let searchCriteria = [];
    let searchCriteria;
    let searchCriterion = [];
    let criteriaResults = [];
    let criterionInput = [];
    if (criteriaNumber == 1) {
        searchCriteria = promptFor("Which criteria would you like to search for? Enter gender, eyecolor, height, weight, dob, occupation", validateSearchCriteria);
        criteriaResults = searchChoices(searchCriteria, people);
    } else {
        for (let i = 0; i < criteriaNumber; i++) {
            searchCriterion.push(promptFor("Which criteria would you like to search for? Enter gender, eyecolor, height, weight, dob, occupation", validateSearchCriteria));
            criterionInput.push(prompt("What is the person's " + searchCriterion[i]));
        }
        criteriaResults = searchMultiples(searchCriterion, people, criterionInput);
    }
    displayPeople(criteriaResults);
}

function findFamily(person, people) {
    let foundFamily = people.filter(function (potentialMatch) {
        if (potentialMatch.parents == person || potentialMatch.spouse == person) {
            return true;
        }
        else {
            return false;
        }
    })
    return foundFamily;
}

function findDescendants(person, people) {
    let foundDescendants = people.filter(function (potentialMatch) {
        if (potentialMatch.parents[0] == person || potentialMatch.parents[1] == person) {
            findDescendants(potentialMatch.id, people);
            return true;
        }
        else {
            return false;
        }
    })
    return foundDescendants;
}

function searchChoices(searchCriteria, people) {
    let criteriaResults = [];
    switch (searchCriteria) {
        case "gender":
            criteriaResults = searchByGender(people);
            break;
        case "eyecolor":
            criteriaResults = searchByEyeColor(people);
            break;
        case "height":
            criteriaResults = searchByHeight(people);
            break;
        case "weight":
            criteriaResults = searchByWeight(people);
            break;
        case "dob":
            criteriaResults = searchByDoB(people);
            break;
        case "occupation":
            criteriaResults = searchByOccupation(people);
            break;
        default:
            break;
    }
    return criteriaResults;
}

function searchMultiples(searchCriterion, people, input) {
    let results;
    for (let i = 0; i < searchCriterion.length; i++) {
        let dataInput = input[i];
        results = people.filter(function (potentialMatch) {

            if (searchCriterion[i] == "gender") {
                if (potentialMatch.gender == dataInput) {
                    return true
                } else {
                    return false;
                }
            }
            if (searchCriterion[i] == "eyecolor") {
                if (potentialMatch.eyeColor == dataInput) {
                    return true
                } else {
                    return false;
                }
            }
            if (searchCriterion[i] == "height") {
                if (potentialMatch.height == dataInput) {
                    return true
                } else {
                    return false;
                }
            }
            if (searchCriterion[i] == "weight") {
                if (potentialMatch.weight == dataInput) {
                    return true
                } else {
                    return false;
                }
            }
            if (searchCriterion[i] == "dob") {
                if (potentialMatch.dob == dataInput) {
                    return true
                } else {
                    return false;
                }
            }
            if (searchCriterion[i] == "occupation") {
                if (potentialMatch.occupation == dataInput) {
                    return true
                } else {
                    return false;
                }
            }
        })
    }
    return results;
}

function searchByGender(people) {
    let gender = promptFor("What is the person's gender", validateGender);

    let genderResults = people.filter(function (potentialMatch) {
        if (potentialMatch.gender == gender) {
            return true;
        }
        else {
            return false;
        }
    })
    return genderResults;
}

function searchByDoB(people) {
    let dob = promptFor("What is the person's dob?  Enter MM/DD/YYYY", autoValid);

    let dobResults = people.filter(function (potentialMatch) {
        if (potentialMatch.dob == dob) {
            return true;
        }
        else {
            return false;
        }
    })
    return dobResults;
}

function searchByHeight(people) {
    let height = promptFor("What is the person's height?", validateNumber);

    let heightResults = people.filter(function (potentialMatch) {
        if (potentialMatch.height == height) {
            return true;
        }
        else {
            return false;
        }
    })
    return heightResults;
}

function searchByWeight(people) {
    let weight = promptFor("What is the person's weight", validateNumber);

    let weightResults = people.filter(function (potentialMatch) {
        if (potentialMatch.weight == weight) {
            return true;
        }
        else {
            return false;
        }
    })
    return weightResults;
}

function searchByEyeColor(people) {
    let eyeColor = promptFor("What is the person's eyeColor", autoValid);

    let eyeColorResults = people.filter(function (potentialMatch) {
        if (potentialMatch.eyeColor == eyeColor) {
            return true;
        }
        else {
            return false;
        }
    })
    return eyeColorResults;
}

function searchByOccupation(people) {
    let occupation = promptFor("What is the person's occupation", autoValid);

    let occupationResults = people.filter(function (potentialMatch) {
        if (potentialMatch.occupation == occupation) {
            return true;
        }
        else {
            return false;
        }
    })
    return occupationResults;
}


//Display Functions

function displayPeople(people) {
    alert(people.map(function (person) {
        return person.firstName + " " + person.lastName;
    }).join("\n"));
}

function displayPerson(person) {
    let personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
    personInfo += "Gender: " + person.gender + "\n";
    personInfo += "DoB: " + person.dob + "\n";
    personInfo += "Height: " + person.height + "\n";
    personInfo += "Weight: " + person.weight + "\n";
    personInfo += "Eye-Color: " + person.eyeColor + "\n";
    personInfo += "Occupation: " + person.occupation + "\n";
    alert(personInfo);
}

function displayFamily(personFamily) {
    alert("Found Family: \n" + personFamily.map(function (person) {
        return person.firstName + " " + person.lastName;
    }).join("\n"));
}

function displayDescendants(descendants) {
    alert("Found Descendants: \n" + descendants.map(function (person) {
        return person.firstName + " " + person.lastName;
    }).join("\n"));
}


//Validation Functions

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

function validateGender(input) {
    if (input.toLowerCase() == "male" || input.toLowerCase() == "female") {
        return true;
    } else {
        return false;
    }
}

function validateDisplayOptions(input) {
    if (input.toLowerCase() == "info" || input.toLowerCase() == "family" || input.toLowerCase() == "descendants" || input.toLowerCase() == "restart" || input.toLowerCase() == "quit") {
        return true;
    } else {
        return false;
    }
}

function validateCriteriaNumber(input) {
    if (input > 0 && input < 6) {
        return true;
    } else {
        return false;
    }
}

function validateSearchCriteria(input) {
    if (input.toLowerCase() == "gender" || input.toLowerCase() == "eyecolor" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "dob" || input.toLowerCase() == "occupation") {
        return true;
    } else {
        return false;
    }
}

function validateNumber(input) {
    if (!isNaN(input)) {
        return true;
    } else {
        return false;
    }
}