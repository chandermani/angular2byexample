To run the unit test follow these steps (Run them from command line, from `tests` parent folder):

 1. Install karma `npm install karma --save-dev`. (The karma version against which the code was tested is `0.13.22`)
 2. Install karma CLI `npm install -g karma-cli`. (The karma-cli version was `1.0.1`)
 3. Run karma wizard `karma init` and use the default options. This should install the necessary dependencies and create a new config file in the parent folder. *DELETE IT*. The config file in this folder needs to be used.
 4. Install Jasmine `npm install jasmine-core --save-dev --save-exact`. (The jasmine version against which the code was tested is `2.4.1`)
 5. To run the test first start the application `gulp play` then do `karma start tests/karma.conf.js`.
