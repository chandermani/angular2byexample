# Personal Trainer

Personal Trainer built using Angular2 and TypeScript

## Install

Clone this repo and execute in your favourite shell:

* `npm i -g gulp` to install gulp globally (if you don't have it installed already)
* `npm install` to install local npm dependencies

## Play

After completing installation type in your favourite shell:

* `gulp play` to start the app in a new browser window. App files are observed and will be re-transpiled on each change.

> ~~If you see a bunch of **TypeScript** compilation errors while running `gulp play`, the required **typings** did not get installed.  While `npm install` should also install the typings, at times this does not happen. 
> To fix this, try to install typings again with command `npm run typings install`. 
> If the typing installation throws error try to upgrade the typing global installation with command `npm install typings -g` and then run the command `npm run typings install` again.~~

> The old approach of using the `typings` tool to install typings has been abandoned in favour of **npm** based typing supported by new versions of **TypeScript** compiler. Take latest of the code and upgrade to latest version of TypeScript compiler. `npm install` should now install all typings. 

> **Note**: The book content still show use of `typings`, you can disregard it.
