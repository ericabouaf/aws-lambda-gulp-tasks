# aws-lambda-gulp-tasks

Simply exposes the tasks from https://github.com/ThoughtWorksStudios/node-aws-lambda as gulp tasks

## Usage

    npm install gulp --save-dev
    npm install run-sequence --save-dev
    npm install aws-lambda-gulp-tasks --save-dev

gulpfile.js :
````js
var gulp = require('gulp');
var runSequence = require('run-sequence');
require('aws-lambda-gulp-tasks')(gulp);

gulp.task('deploy', function(callback) {
  return runSequence(
    ['clean'],
    ['js', 'node-mods'],
    // ADD ANY FILE YOU WANT TO THE dist/ folder
    ['zip'],
    ['upload'],
    callback
  );
});
````

lambda-config.js :
````js
module.exports = {
  accessKeyId: <access key id>,  // optional
  secretAccessKey: <secret access key>,  // optional
  profile: <shared credentials profile name>, // optional for loading AWS credentials from custom profile
  region: 'us-east-1',
  handler: 'index.handler',
  role: <role arn>,
  functionName: <function name>,
  timeout: 10,
  memorySize: 128,
  eventSource: {
    EventSourceArn: <event source such as kinesis ARN>,
    BatchSize: 200,
    StartingPosition: "TRIM_HORIZON"
  }
}
````

In your repository :

    $ gulp deploy

## Gulp tasks made available

 * clean
 * js
 * node-mods
 * zip
 * upload

 * deploy (the full process) is given in the example above (but customizable)


## Handling local modules

If your project includes local modules and they are included in package.json using a relative path (_e.g._ `'my-helper-module': "file:../my-helper-module"`) then the node-mods task will fail to run `npm install` correctly as these modules are no longer resolvable from within the dist folder.

To rectify this situation the module import takes a second parameter `options` which can be used to fix-up these relative paths in the package.json as it being copied to dist/, so changing the `require` to:
````js
require('aws-lambda-gulp-tasks')(gulp, { fixRelativePackages: true });
````
in your gulpfile.js will ensure the `gulp deploy` works as expected.

# License

(The MIT License)

Copyright (c) 2015 Eric Abouaf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
