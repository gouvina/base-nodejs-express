const errors = {
    e400: {
      status: 400,
      message: 'BAD REQUEST',
    },
    e401: {
      status: 401,
      message: 'UNAUTHORIZED',
    },
    e403: {
      status: 403,
      message: 'FORBIDDEN',
    },
    e404: {
      status: 404,
      message: 'NOT FOUND',
    },
    e500: {
      status: 500,
      message: 'INTERNAL SERVER ERROR',
    },
  };
  
  module.exports = errors;
  