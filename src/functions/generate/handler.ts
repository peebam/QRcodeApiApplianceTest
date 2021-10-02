import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { sendOk, sendInternalError } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import execute from './execute';
import schema from './schema';


const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {
   
    let number : number = event.body.number;
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