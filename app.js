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
            displayPerson(person);
            break;
        case "family":
            let personFamily = findFamily(person, people);
            displayFamily(personFamily);
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
    return foundPerson;
}

// function findFamily(person, people) {
//     let personId = person[0].id;
//     let foundFamily = people.filter(function (potentialMatch) {
//         if (potentialMatch.parents === personId) {
//             return true;
//         }
//         else {
//             return false;
//         }
//     });
//     return foundFamily;
// }

function findFamily(person, people) {
    let foundFamily = [];
    for (let i = 0; i < people.length; i++) {
        if (people[i].parents == person[0].id) {
            foundFamily.push(people[i]);
        }
    }
    return foundFamily;
}

function searchByGender(people) {
    let gender = promptFor("What is the person's gender", validateGender);

    let foundPerson = people.filter(function (potentialMatch) {
        if (potentialMatch.gender === gender) {
            return true;
        }
        else {
            return false;
        }
    })
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
    let personInfo = "First Name: " + person[0].firstName + "\n";
    personInfo += "Last Name: " + person[0].lastName + "\n";
    personInfo += "Gender: " + person[0].gender + "\n";
    personInfo += "DoB: " + person[0].dob + "\n";
    personInfo += "Height: " + person[0].height + "\n";
    personInfo += "Weight: " + person[0].weight + "\n";
    personInfo += "Eye-Color: " + person[0].eyeColor + "\n";
    personInfo += "Occupation: " + person[0].occupation + "\n";
    alert(personInfo);
}

// function displayFamily(personFamily) {
//     alert("Found family members: " + personFamily);
// }
function displayFamily(personFamily) {
    alert("Found Desendants: \n" + personFamily.map(function (person) {
        return person.firstName + " " + person.lastName;
    }).join("\n"));
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

function validateGender(input) {
    if (input.toLowerCase() == "male" || input.toLowerCase() == "female") {
        return true;
    } else {
        return false;
    }
}