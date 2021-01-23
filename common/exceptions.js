class HttpError extends Error {
  constructor(message, status, displayMessage = '') {
    super(message);
    this.status = status;
    this.displayMessage = displayMessage;
  }
}

export const displayMessages = {
  operational_error:
    'A server error has occurred. Please refresh and try again',
  client_error:
    'Something went wrong. Please refresh and try again.',
};

export default HttpError;