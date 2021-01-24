import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import appConstants from '../../common/appConstants';
import { displayMessages } from '../../common/exceptions';

const { DEFAULT_HEADERS, X_API_KEY } = appConstants;
const HEADERS = {
  ...DEFAULT_HEADERS,
  [X_API_KEY]: process.env.LEADS_API_KEY,
};

export default async (req, res) => {
  const { url } = req.query;
  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: HEADERS,
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      return res.status(response.status).json({
        error_message: errorMessage,
        display_message: displayMessages.client_error,
      });
    }

    const responseJson = await response.json();
    return res.status(StatusCodes.OK).json(responseJson);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error_message: error.message,
      display_message: displayMessages.operational_error,
    });
  }
};
