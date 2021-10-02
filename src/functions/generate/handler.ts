import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { sendCreated, sendInternalError, sendBadRequest } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import execute from './execute';
import schema from './schema';

const quantityGreaterThan100Error = "Le nombre de qrcodes doit être raisonnablement inférieur à 100";
const quantityLesserThan1Error = "Le nombre de qrcodes doit être au moins de 1";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {
    
    let quantity : number = event.body.quantity;
    if (quantity > 100)
        return sendBadRequest({message : quantityGreaterThan100Error});
    
    if (quantity < 1)
        return sendBadRequest({message : quantityLesserThan1Error});
    
    let prefix : string = event.body.prefix; 
    let addLabel : boolean = event.body.addLabel || false;

    let response = await execute(quantity, prefix, addLabel);

    return sendCreated(response);
  }
  catch(e)
  {
    return sendInternalError({ message : e.message });
  }
}

export const main = middyfy(hello);