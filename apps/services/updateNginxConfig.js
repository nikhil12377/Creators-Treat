/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs').promises;
const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const sslCertPath = path.join(__dirname, 'ssl', 'nginx.crt');
const sslKeyPath = path.join(__dirname, 'ssl', 'nginx.key');

const generateSSLCertificates = async () => {
  const sslDir = path.join(__dirname, 'ssl');
  try {
    await fs.mkdir(sslDir, { recursive: true });
  } catch (err) {
    throw new Error(`Failed to create SSL directory: ${err.message}`);
  }

  return new Promise((resolve, reject) => {
    const command = `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ${sslKeyPath} -out ${sslCertPath} -subj "/C=US/ST=YourState/L=YourCity/O=YourOrganization/CN=localhost"`;
    exec(command, (error) => (error ? reject(error) : resolve()));
  });
};

const installNginx = () => {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    let command;

    if (platform === 'darwin') {
      command = 'brew install nginx';
    } else if (platform === 'linux') {
      command = 'sudo apt update && sudo apt install -y nginx';
    } else {
      reject(new Error('Unsupported OS'));
      return;
    }

    exec(command, (error) => (error ? reject(error) : resolve()));
  });
};

const findNginxConfigPath = () => {
  return new Promise((resolve, reject) => {
    exec('sudo nginx -t 2>&1', { encoding: 'utf8' }, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      const match = stdout.match(/nginx: the configuration file (.+?) syntax is ok/);
      resolve(match ? match[1] : null);
    });
  });
};

const run = async () => {
  try {
    console.log('Generating SSL certificates...');
    await generateSSLCertificates();

    let nginxConfigPath = await findNginxConfigPath();

    if (!nginxConfigPath) {
      console.log('Nginx not found, installing...');
      await installNginx();
      nginxConfigPath = await findNginxConfigPath();
    }

    if (!nginxConfigPath) {
      console.error('Could not find or install Nginx.');
      process.exit(1);
    }

    const localNginxConfigPath = path.join(__dirname, 'nginx.conf');
    const newConfigData = await fs.readFile(localNginxConfigPath, 'utf8');

    const replacements = {
      USER_MS_PORT: process.env.USER_MS_PORT || '6000',
      ORDER_MS_PORT: process.env.ORDER_MS_PORT || '7000',
      DASHBOARD_MS_PORT: process.env.DASHBOARD_MS_PORT || '8000',
      VALIDATE_MS_PORT: process.env.VALIDATE_MS_PORT || '8000',
      '/path/to/your/certificate.pem': sslCertPath,
      '/path/to/your/private.key': sslKeyPath,
    };

    const updatedNewConfig = Object.entries(replacements).reduce(
      (config, [key, value]) => config.replace(new RegExp(key, 'g'), value),
      newConfigData,
    );

    await fs.writeFile(nginxConfigPath, updatedNewConfig, 'utf8');

    exec('nginx -s reload', (error) => {
      if (error) {
        console.error(`Error reloading Nginx: ${error}`);
        return;
      }
      console.log('Nginx configuration updated and reloaded.');
    });
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
};

run();
