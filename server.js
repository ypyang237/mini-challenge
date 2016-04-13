var express = require('express'),
    app = express(),
    fs = require('fs');

app.engine('dlr', function (path, options, callback) {

  fs.readFile(path, function (err, content) {

    if (err) {
      throw new Error(err);
    }

    var tempWords = content.toString().match(/(\$\$\w+\$\$)/g);
    var words = {}

    tempWords.forEach(function(tempWord) {

      words[tempWord] = tempWord.replace(/(\$)/g, '');
    })

    var rendered = content.toString();

    for (var key in words) {

      if (rendered.includes(key)) {

        rendered = rendered.replace(key, options[words[key]]);
      }
    }
    
    return callback(null, rendered);
  });
});

app.set('view engine', 'dlr');
app.set('views', './dlr');

app.get('/', function (req, res) {

  res.render('index', {title: 'Pam', message: 'Hello', link: 'http://www.google.com', linktext: 'goog'});
})


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on 3000');
})