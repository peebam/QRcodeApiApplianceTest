import { toBuffer, QRCodeToBufferOptions } from "qrcode";

import type IQrCodesService from "./type";

class QrCodesService implements IQrCodesService 
{
    async generate(content: string) : Promise<Buffer>
    {
        let options : QRCodeToBufferOptions = {
            width: 530
        }
        
        let buffer = await toBuffer(content, options);
        return buffer;
    }
}

export default new QrCodesService();