import { toBuffer, QRCodeToBufferOptions } from "qrcode";

import type IQrCodesService from "./type";

const defaultWitdh : number = 530;

class QrCodesService implements IQrCodesService 
{
    async generate(content: string) : Promise<Buffer>
    {
        let options : QRCodeToBufferOptions = {
            width: defaultWitdh
        }
        
        let buffer = await toBuffer(content, options);
        return buffer;
    }
}

export default new QrCodesService();