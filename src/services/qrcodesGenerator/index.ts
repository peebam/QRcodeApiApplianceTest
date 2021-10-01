import { toBuffer, QRCodeToBufferOptions } from "qrcode";

import type IQrCodeGeneratorService from "./type";

class QrCodeService implements IQrCodeGeneratorService 
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

export default new QrCodeService();