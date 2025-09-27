const pkg = require('./package.json');
const semver = require('semver');

const pkgSemVer = semver.parse(pkg.version);
const pkgVersion = pkgSemVer.version;
console.log(pkgVersion);
