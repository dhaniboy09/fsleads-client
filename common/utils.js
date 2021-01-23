import HttpError, {displayMessages} from "./exceptions";
import {StatusCodes} from "http-status-codes";
import merge from 'lodash.merge';
import appConstants from "./appConstants";

const handleErrorResponse = async (response) => {
  let errorJson = {};
  let message = response.statusText;
  try {
    errorJson = await response.json();
    message = errorJson.error_message || message;
  } catch (e) {
    // Log error
  }
  const { display_message: displayMessage } = errorJson || {};
  throw new HttpError(message, response.status, displayMessage);
};

const handleSuccessResponse = (response) => {
  return response.status === StatusCodes.NO_CONTENT ? null : response.json();
};

export const fetchWrapper = async (url, options = {}) => {
  const defaultHeaders = { headers: appConstants.DEFAULT_HEADERS };
  return fetch(url, merge(options, defaultHeaders))
    .catch((operationalError) => {
      // Log Error
      throw new HttpError(
        operationalError.message,
        null,
        displayMessages.operational_error,
      );
    })
    .then((response) => {
      return response.ok
        ? handleSuccessResponse(response)
        : handleErrorResponse(response);
    });
};