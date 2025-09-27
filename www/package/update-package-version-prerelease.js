const {execSync} = require('child_process');
const semver = require('semver');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const pkg = require('./package.json');

const pkgSemVer = semver.parse(pkg.version);

const pkgVersion = pkgSemVer.version;
// console.log('pkgVersion=', pkgVersion);

const pkgVersionWithoutPrerelease = `${pkgSemVer.major}.${pkgSemVer.minor}.${pkgSemVer.patch}`;
// console.log('pkgVersionWithoutPrerelease=', pkgVersionWithoutPrerelease);

const currentDatetime = dayjs.utc().format('YYYYMMDDTHHmmss[Z]');
// console.log('currentDatetime=', currentDatetime);

const newPkgVersion = `${pkgVersionWithoutPrerelease}-${currentDatetime}`;
// console.log('newPkgVersion=', newPkgVersion);

if (semver.valid(newPkgVersion)) {
  console.log(`updating package version from\n${pkgVersion}\nto\n${newPkgVersion}\n`);
  // see https://stackoverflow.com/a/67270807
  execSync(`npm version ${newPkgVersion}`);
  console.log(`updated package version to\n${newPkgVersion}\n`);
}
else {
  // see https://stackoverflow.com/a/37738481
  process.exitCode = 1;
  throw new Error(`new package version would be invalid: ${newPkgVersion}`);
}
