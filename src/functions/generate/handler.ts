import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { sendOk, sendInternalError, sendBadRequest } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import execute from './execute';
import schema from './schema';

const numberGreaterThan100Error = "Le nombre de qrcodes doit être raisonnablement inférieur à 100";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {
    
    let number : number = event.body.number;
    if (number > 100)
        return sendBadRequest({message : numberGreaterThan100Error});

    let prefix : string = event.body.prefix; 

    let response = await execute(number, prefix);

    return sendOk(response);
  }
  catch(e)
  {
    return sendInternalError({ message : e.message });
  }
}

export const main = middyfy(hello);