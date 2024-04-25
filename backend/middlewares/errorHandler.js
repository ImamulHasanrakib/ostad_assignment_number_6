class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    return res.status(err.status || 400).json({ message: err.message });
  } else {
    return res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  errorHandler,
  NotFoundError,
};
