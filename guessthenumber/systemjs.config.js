System.config({
    map : {
        'app': 'app',
        'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
        '@angular': 'https://npmcdn.com/@angular'
    },
    packages:{
        'app':  { main: 'main.ts',  defaultExtension: 'ts' },
        '@angular/common': { main: 'index.js' },
        '@angular/compiler': { main: 'index.js' },
        '@angular/core': { main: 'index.js' },
        '@angular/platform-browser': { main: 'index.js' },
        '@angular/platform-browser-dynamic': { main: 'index.js' },
    },
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'typescript',
    typescriptOptions: {
        emitDecoratorMetadata: true
    }
});