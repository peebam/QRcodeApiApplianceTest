import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatOk, formatError } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import qrCode from "@services/qrcodes";
import s3 from "@services/s3";
 
import schema from './schema';
const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {
    event;
    
    let buffer : Buffer = await qrCode.generate("testestt");
    
    await s3.upload("test", buffer);

    return formatOk({
        message: "ok",
    });
  }
  catch(e)
  {
    return formatError({
        message : e.message,
        exception : e
    })
  }
}

export const main = middyfy(hello);