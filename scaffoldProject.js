const fs = require("fs-extra");
const { execSync } = require("child_process");
const path = require("path");

function scaffoldProject(framework, useTypeScript, projectName, cssMethod) {
  console.log(`Creating a new project: ${projectName}...`);

  if (framework === "React") {
    const tsFlag = useTypeScript ? "--template typescript" : "";
    console.log("Generating a new React project...");
    execSync(`npx create-react-app@latest ${projectName} ${tsFlag}`, {
      stdio: "inherit",
    });

    process.chdir(projectName);

    if (cssMethod === "Styled-components") {
      console.log("Installing Styled-components...");
      execSync("npm install styled-components", { stdio: "inherit" });
    } else {
      console.log("Installing TailwindCSS...");
      execSync("npm install tailwindcss", { stdio: "inherit" });
      console.log("Initializing TailwindCSS...");
      execSync("npx tailwindcss init", { stdio: "inherit" });

      const tailwindConfigContent = `
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
`;

      const tailwindConfigPath = "./tailwind.config.js";
      fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);

      const mainCssPath = "src/index.css";
      const cssContent = fs.readFileSync(mainCssPath, "utf8");
      const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
      fs.writeFileSync(mainCssPath, tailwindDirectives + cssContent);

      const packageJsonPath = "package.json";
      const packageJson = fs.readJsonSync(packageJsonPath);
      packageJson.scripts.start = "TAILWIND_MODE=watch react-scripts start";
      packageJson.scripts.build = "TAILWIND_MODE=build react-scripts build";
      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
    }
  } else if (framework === "Vue") {
    fs.copySync("vue-template", projectName);

    process.chdir(projectName);

    console.log("Installing Vue dependencies...");
    execSync("npm install vue", { stdio: "inherit" });

    if (cssMethod === "Styled-components") {
      console.log("Installing vue-styled-components...");
      execSync("npm install vue-styled-components", { stdio: "inherit" });
    } else {
      console.log("Installing TailwindCSS...");
      execSync("npm install tailwindcss", { stdio: "inherit" });
    }
  }

  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.name = projectName;
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
  }

  console.log(`Project ${projectName} has been created successfully!`);
}

module.exports = scaffoldProject;
