'use strict';
const express = require('express'),
  bodyParser = require('body-parser'),
  querystring = require('querystring'),
  session = require('express-session'),
  config = require('config'),
  axios = require('axios'),
  fallback = require('express-history-api-fallback'),
  nanoid = require('nanoid');

const app = express();

app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: config.get('sessionKey'),
  })
);

app.get('/api/auth/reddit', (req, res) => {
  const stateToken = nanoid();
  req.session.stateToken = stateToken;
  const redditReqUrl =
    config.get('reddit.baseAuthUrl') +
    querystring.stringify({
      client_id: config.get('reddit.key'),
      response_type: 'code',
      state: stateToken,
      redirect_uri: config.get('reddit.redirectUrl'),
      duration: 'temporary',
      scope: 'identity history',
    });
  res.redirect(redditReqUrl);
});

app.get('/api/auth/reddit/callback', async (req, res) => {
  const { error, code, state } = req.query;
  const { stateToken } = req.session;

  if (error) console.error(error);

  if (state !== stateToken) {
    console.error(
      `response state "${state}" does not equal session state "${stateToken}"`
    );
    res.redirect('/login?success=false');
  }

  const { data: authResponse } = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    // https://github.com/axios/axios/issues/362
    querystring.stringify({
      grant_type: 'authorization_code',
      redirect_uri: config.get('reddit.redirectUrl'),
      code,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: config.get('reddit.key'),
        password: config.get('reddit.secret'),
      },
    }
  );

  res.redirect(`/?success=true&token=${authResponse.access_token}`);
});

app.use(express.static(`${__dirname}/dist`));

app.use(fallback('index.html', { root: `${__dirname}/dist` }));

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

app.listen(process.env.PORT || 3000, function() {
  console.log('app.js::Started web application on port 3000');
});

module.exports = app;
