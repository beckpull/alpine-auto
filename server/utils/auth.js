const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// set token secret and expiration date
const secret = process.env.AUTH_SECRET;
// process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    console.log('secret', secret);
    console.log('authMiddleware ---')

    // console.log("THIS IS THE REQ...: ", req);
    // console.log("THIS IS THE REQ.BODY...: ", req.body);
    // console.log("THIS IS THE REQ.QUERY...: ", req.query);
    // console.log("THIS IS THE REQ.HEADERS...: ", req.headers);

<<<<<<< HEAD
    // console.log("THIS IS THE REQ...: ", req);
    console.log('Middleware hit');
    // console.log('Headers:', JSON.stringify(req.headers, null, 2));
    // console.log('Query:', JSON.stringify(req.query, null, 2));
    // console.log('Body:', JSON.stringify(req.body, null, 2));
    // console.log(req.body.variables);
    // console.log("req.headers.authorization", req.headers.authorization);

    // allows token to be sent via req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization || req.headers['Authorization'];
    // console.log("This is the token : ", token);
=======

    // allows token to be sent via req.query or headers
    let token = req.body.variables?.token || req.query.token || req.headers.authorization || req.headers['Authorization'];
    console.log("This is the token : ", token);
>>>>>>> main
  
    if (req.headers.authorization != null) {
      token = token.split(' ').pop().trim();
    }
    // console.log("This is the token after split : ", token);

    if (!token) {
      // console.log('No token provided:');
      return req;
    }

<<<<<<< HEAD
    // console.log('Token received: ', token);
=======
    console.log('req.headers.authorization: ',req.headers.authorization);
    console.log('Token received outside: ', token);
    // console.log('Secret used for verification outside: ', secret);
>>>>>>> main


    // verify token and get user data out of it
    try {
      console.log('Token inside the try: ', token);
      console.log('Secret inside the try: ', secret);
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('Data from login: ', data);

    } catch (error){
      console.log('Invalid token: ', error.message);
    }

    return req;
  },
  signToken: function ({ username, email, password, _id }) {
    const payload = { username, email, password, _id };
<<<<<<< HEAD
    // console.log('Payload: ', payload);
=======
    console.log('Payload: ', payload);
    console.log('Secret used for signing: ', secret);
>>>>>>> main
    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    // console.log('SignToken: ', token);
    return token;
  },
};
