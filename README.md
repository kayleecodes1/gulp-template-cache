# Gulp Template Cache

This is a [`Gulp`](http://gulpjs.com) plugin that converts HTML files into JavaScript strings that can then be quickly accessed through a global variable.

## Installation and Usage

In a shell:

```shell
npm install --save-dev gulp-template-cache
```

In your `gulpfile.js`:

```javascript
var templateCache = require('gulp-template-cache');

gulp.task('compile:templates', function() {
  return gulp.src('src/**/*.tpl.html')
    .pipe(templateCache())
    .pipe(gulp.dest('build'));
});
```

## Options

- `fileName`: The name of the JavaScript file that should be output by the plugin. Defaults to 'templates.js'.
- `globalVariable`: The name of the global variable that should reference the template cache. Defaults to 'templateCache'.
- `nameFunction`: A function that takes a template filepath and returns the string name of that template in the cache. Defaults to using the raw filepath.