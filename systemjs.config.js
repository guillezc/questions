/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'firebase':                   'node_modules/firebase',
    'angularfire2':               'node_modules/angularfire2',
    'angular2-localstorage':      'node_modules/angular2-localstorage',
    'ng2-datetime':               'node_modules/ng2-datetime',
    'ng2-select':                 'node_modules/ng2-select',
    'ng2-tag-input':              'node_modules/ng2-tag-input',
    'ng2-table':                  'node_modules/ng2-table'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'firebase':                   { main: 'firebase.js', defaultExtension: 'js' },
    'angularfire2'              : { main: 'angularfire2.js', defaultExtension: 'js' },
    'angular2-localstorage':      { main: 'index.js', defaultExtension: 'js' },
    'ng2-datetime':               { main: 'ng2-datetime.js', defaultExtension: 'js' },
    'ng2-select':                 { main: 'ng2-select.js', defaultExtension: 'js' },
    'ng2-tag-input':              { main: 'index.js', defaultExtension: 'js' },
    'ng2-table':                  { main: 'ng2-table.js', defaultExtension: 'js' }
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
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  // No umd for router yet
  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
