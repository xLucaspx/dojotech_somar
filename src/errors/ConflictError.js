class ConflictError extends Error {
  constructor(message, status = 409) {
    super(message);
    this.status = status;
  }
}

module.exports = ConflictError;
