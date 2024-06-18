const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to execute shell command and return it as a string
const exec = (cmd) => execSync(cmd, { encoding: 'utf-8' });

// Function to get all package directories
const getPackageDirs = () => {
  return glob.sync('**/package.json', {
    ignore: ['**/node_modules/**'], // Ignore node_modules directories
  }).map((pkgJsonPath) => path.dirname(pkgJsonPath));
};

// Main function to update packages
const updatePackages = () => {
  const packageDirs = getPackageDirs();

  packageDirs.forEach((dir) => {
    console.log(`Updating packages in ${dir}...`);
    try {
      exec(`cd ${dir} && ncu -u`);
      console.log(`Successfully updated packages in ${dir}`);
    } catch (error) {
      console.error(`Failed to update packages in ${dir}`);
      console.error(error);
    }
  });
  console.log('running yarn install');
  exec(`yarn install`);
};

// Run the update
updatePackages();
