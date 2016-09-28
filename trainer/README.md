# Personal Trainer

Personal Trainer built using Angular2 and TypeScript

## Install

Clone this repo and execute in your favourite shell:

* `npm i -g gulp` to install gulp globally (if you don't have it installed already)
* `npm install` to install local npm dependencies

> While `npm intall` should also install the typings, at times this does not happen. Install typing with command `npm typings install`
## Play

After completing installation type in your favourite shell:

* `gulp play` to start the app in a new browser window. App files are observed and will be re-transpiled on each change.

> If you see a bunch of **TypeScript** compilation errors while running `gulp play`, the required **typings** did not get installed.  While `npm install` should also install the typings, at times this does not happen. 
> To fix this, try to install typings again with command `npm run typings install`. 
> If the typing installation throws error try to upgrade the typing global installation with command `npm install typings -g` and then run the command `npm run typings install` again.
