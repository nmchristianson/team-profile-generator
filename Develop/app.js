const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function newEntry() {
    inquirer.prompt(
        {
            type: "input",
            name: "newEntry",
            message: "Would you like to add a new entry? Enter Y or N."
        }
    ).then(function(addNew){
        if(addNew.newEntry === "N" || addNew.newEntry === "n") {
            fs.writeFile(outputPath, render(teamMembers), function(err){
                if (err) {
                    throw err;
                }
            });
    } else if(addNew.newEntry === "Y" || addNew.newEntry === "y") {
        employeeInfo();
    } else {
        alert("Please enter Y or N");
        return;
    }
});
}

function employeeInfo() {
    inquirer.prompt([
    {
        type: "input",
        name: "employeename",
        message: "Please enter the employee's name:"
    },
    {
        type: "input",
        name: "employeeid",
        message: "What is the employee ID?"
    },
    {
        type: "input",
        name: "employeeemail",
        message: "Enter in the employee's email:"
    },
    {
        type: "input",
        name: "title",
        message: "Is this employee a Manager, Engineer or Intern?"
    }
]).then(function(basicInfo){
    if(basicInfo.title === "Engineer" || basicInfo.title === "engineer"){
        inquirer.prompt(
            {
                type: "input",
                name: "github",
                message: "What is their gitHub username?"
            }
        ).then(function(engineerInfo){
            const engineer = new Engineer(basicInfo.employeename, basicInfo.employeeid, basicInfo.employeeemail, engineerInfo.github);
            teamMembers.push(engineer);
            newEntry();
        });

    } else if(basicInfo.title === "Intern" || basicInfo.title === "intern") {
        inquirer.prompt(
            {
                type: "input",
                name: "school",
                message: "What school did/does this intern attend?"
            }
        ).then(function(internInfo){
            const intern = new Intern(basicInfo.employeename, basicInfo.employeeid, basicInfo.employeeemail, internInfo.school);
            teamMembers.push(intern);
            newEntry();
        });

    } else if(basicInfo.title === "Manager" || basicInfo.title === "manager") {
        inquirer.prompt(
            {
                type: "input",
                name: "office",
                message: "What is their office number?"
            }
        ).then(function(managerInfo){
            const manager = new Manager(basicInfo.employeename, basicInfo.employeeid, basicInfo.employeeemail, managerInfo.office);
            teamMembers.push(manager);
            newEntry();
        });
    } else {
        alert("Please enter a Manger, Engineer, or Intern for the title.");
        return;
    }
})};

newEntry();