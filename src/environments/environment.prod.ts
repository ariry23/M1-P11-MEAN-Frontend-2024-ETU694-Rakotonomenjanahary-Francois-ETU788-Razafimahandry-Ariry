import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiBaseUrl: 'https://back-end-express-ws.onrender.com',
};
