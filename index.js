#!/usr/bin/env node

const inquirer = require("inquirer");
const scaffoldProject = require("./scaffoldProject");

async function main() {
  const { projectName, framework, cssMethod, useTypeScript } =
    await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Enter the name of your project:",
        default: "my-design-system",
        validate: (input) => (input ? true : "Project name cannot be empty"),
      },
      {
        type: "list",
        name: "framework",
        message: "Which framework/library?",
        choices: ["React", "Vue"],
      },
      {
        type: "confirm",
        name: "useTypeScript",
        message: "Would you like to use TypeScript?",
        default: false,
      },
      {
        type: "list",
        name: "cssMethod",
        message: "Which CSS method?",
        choices: ["styled-components", "tailwindcss"],
      },
    ]);

  scaffoldProject(framework, useTypeScript, projectName, cssMethod);
}

main();
