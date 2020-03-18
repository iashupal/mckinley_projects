const s = require('shelljs');

s.ls('./dist/*.ttf').forEach(function(file) {
  s.cp(file, './dist/assets/');
});

s.ls('./dist/*.woff').forEach(function(file) {
  s.cp(file, './dist/assets/');
});

s.ls('./dist/*.woff2').forEach(function(file) {
  s.cp(file, './dist/assets/');
});
