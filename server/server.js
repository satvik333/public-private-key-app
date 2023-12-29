const express = require('express');
const configParams = require('./configuration');
const applicationRoutes = require('./routes/userRoutes');
const session = require('express-session');
const store = new session.MemoryStore();

const app = express();

app.use(
  session({
    secret: '1234', // Change this to a secure key
    cookie: { maxAge: 1800000 },
    saveUninitialized: false,
    store: store,
    resave: false
  })
);

app.use((req, res, next) => {
  req.store = store;
  next();
});

app.use('/', applicationRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${configParams.appEnv}:${port}`);
});
