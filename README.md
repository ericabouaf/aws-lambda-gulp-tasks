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
