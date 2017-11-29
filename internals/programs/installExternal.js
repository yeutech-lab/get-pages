/**
 * Run this script from the project directory with `npm run install-external $moduleName`
 */
const fs = require('fs');
const path = require('path');
const async = require('async');
const npmUtils = require(path.join(__dirname, '../utils/npm'));
const declinationJsonPath = path.join(__dirname, '../../declination.json');

function installPeer(name, value, cb) {
  const packageJson = npmUtils.readPackageJson();
  if (!(packageJson.peerDependencies instanceof Object)) {
    packageJson.peerDependencies = {};
  }
  packageJson.peerDependencies[name] = value;
  npmUtils.writePackageJson(packageJson, cb);
}
function installDev(name, value, cb) {
  const packageJson = npmUtils.readPackageJson();
  if (!(packageJson.devDependencies instanceof Object)) {
    packageJson.devDependencies = {};
  }
  packageJson.devDependencies[name] = value;
  npmUtils.writePackageJson(packageJson, cb);
}

function installRollupExternal(name, cb) {
  const declination = JSON.parse(fs.readFileSync(declinationJsonPath, { encoding: 'utf8' }));
  if (declination.external.indexOf(name) === -1) {
    declination.external.push(name);
    fs.writeFileSync(declinationJsonPath, JSON.stringify(declination, null, 2), { encoding: 'utf8' });
  }

  cb();
}

function installRollupGlobal(name, globalName, cb) {
  const declination = JSON.parse(fs.readFileSync(declinationJsonPath, { encoding: 'utf8' }));

  if (!declination.globals[name]) {
    declination.globals[name] = globalName || name;
    fs.writeFileSync(declinationJsonPath, JSON.stringify(declination, null, 2), { encoding: 'utf8' });
  }

  cb();
}

function installExternalList(dependencyList, cb) {
  async.eachSeries(dependencyList, (name, done) => {
    installExternal(name, done);
  }, cb);
}

function installExternal(dependency, cb) {
  const installName = dependency.split('*')[0];
  const globalName = dependency.split('*')[1];
  const reGitUrl = /^git\+[ssh|https]+:\/\/.*@.*\/(.*)\.git/;
  const reNameGitUrl = new RegExp('/([A-z1-9-]+).git{1}');

  async.auto({
    installInNodeModules: (done) => {
      npmUtils.installDevDependency(installName, done);
    },
    isGitUrl: (done) => {
      const match = dependency.match(reGitUrl);
      if (match) {
        done(null, match.length > 0);
      } else {
        done();
      }
    },
    gitUrl: ['isGitUrl', (results, done) => {
      if (results.isGitUrl) {
        const match = installName.match(reGitUrl);
        const gitUrl = match[0];
        done(null, gitUrl);
      } else {
        done();
      }
    }],
    packageName: ['isGitUrl', (results, done) => {
      if (results.isGitUrl) {
        const match = installName.match(reNameGitUrl);
        const packageName = match[1];
        done(null, packageName);
      } else {
        done(null, installName.split('@')[0]);
      }
    }],
    version: ['installInNodeModules', 'packageName', (results, done) => {
      const re = new RegExp(`${results.packageName}@([\\d\\.]+)`, 'i');
      const match = results.installInNodeModules.match(re);
      const version = match[1];
      done(null, version);
    }],
    installPeerInPackageJson: ['gitUrl', 'version', (results, done) => {
      const value = results.isGitUrl ? `${results.gitUrl}#${results.version}` : `^${results.version}`;
      installPeer(results.packageName, value, done);
    }],
    installDevInPackageJson: ['gitUrl', 'installPeerInPackageJson', (results, done) => {
      const value = results.isGitUrl ? `${results.gitUrl}#${results.version}` : `^${results.version}`;
      installDev(results.packageName, value, done);
    }],
    installRollupExternal: ['packageName', (results, done) => {
      installRollupExternal(results.packageName, done);
    }],
    installRollupGlobal: ['installRollupExternal', (results, done) => {
      installRollupGlobal(results.packageName, globalName, done);
    }],
  }, (err, results) => {
    if (err) {
      throw err;
    }
    if (cb) cb(err, results);
  });
}

function help() {
  console.log('');
  console.log('    npm run rollup-umd install-external [packageName] [packageName*globalName] [...]');
  console.log('');
  console.log('example:');
  console.log('');
  console.log('npm run rollup-umd install-external bootstrap-styled react*React styled-components*styled');
}

function run(args) {
  const program = args[0];
  switch (program) {
    case 'help':
      help();
      break;
    case undefined:
      help();
      break;
    default:
      installExternalList(args);
      break;
  }
}

module.exports = run;
