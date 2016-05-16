/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

    //map tells the System loader where to look for things
    var  map = {
        'app':                        'app',
        '@angular':                   'https://npmcdn.com/@angular',
        'rxjs':                       'https://npmcdn.com/rxjs@5.0.0-beta.6',
        'ts':                         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
        'typescript':                 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js',
    };

    //packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':  { main: 'main.ts',  defaultExtension: 'ts' },
        'rxjs': { defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'platform-browser',
        'platform-browser-dynamic'
    ];

    // Add package entries for angular packages
    ngPackageNames.forEach(function(pkgName) {
       packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
    });

    var config = {
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: 'typescript',
        typescriptOptions: {
            emitDecoratorMetadata: true
        },

        map: map,
        packages: packages
    }

    System.config(config);

})(this);