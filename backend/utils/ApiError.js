class ApiError {
  constructor(statusCode, message = "An error occurred", errors = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors; // You can pass additional error details if needed
  }
}

export { ApiError };
