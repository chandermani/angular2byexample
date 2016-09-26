(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': 'dist', // 'dist',
    'rxjs': 'node_modules/rxjs',
    '@angular':                   'node_modules/@angular',
    'angular2-modal':             'node_modules/angular2-modal',
    'angular2-modal/platform-browser': 'node_modules/angular2-modal/platform-browser',
    'angular2-modal/plugins/bootstrap': 'node_modules/angular2-modal/plugins/bootstrap'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'bootstrap.js', defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-modal': {main: 'index.js', defaultExtension: 'js'},
    'angular2-modal/platform-browser': {main: 'index.js', defaultExtension: 'js'},
    'angular2-modal/plugins/bootstrap': {main: 'index.js', defaultExtension: 'js'},
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',  
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'testing'
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);