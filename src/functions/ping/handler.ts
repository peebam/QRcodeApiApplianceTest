import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const ping: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  debugger;
  return formatJSONResponse({
    message: `pong`,
    event,
  });
}

export const main = middyfy(ping);
