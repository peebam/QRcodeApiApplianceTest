import { toBuffer, QRCodeToBufferOptions } from "qrcode";

import Jimp from 'jimp/es';

import type IQrCodesService from "./type";

const fontPath : string = "./assets/open-sans-32-black.fnt"
const defaultWitdh : number = 530;

async function addLabel(qrcode : Buffer, label: string) : Promise<Buffer>
{
    let font = await Jimp.loadFont(fontPath);
    let image = await Jimp.read(qrcode);
    
    const imageWidth = image.getWidth();
    const imageHeight = image.getHeight();

    const bottomMargin = 10;
    
    const textWidth =  Jimp.measureText(font, label);
    const textHeight =  Jimp.measureTextHeight(font, label, 100);
    
    await new Promise<void>((resolve, reject) => {
        
        let x = (imageWidth - textWidth) / 2
        let y = imageHeight - textHeight - bottomMargin;

        image.print(font, x, y, { text: label }, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    return await image.getBufferAsync(Jimp.MIME_PNG);
}

class QrCodesService implements IQrCodesService 
{
    async generate(content: string, label: string) : Promise<Buffer>
    {
        let options : QRCodeToBufferOptions = {
            width: defaultWitdh
        }
        
        let qrcode : Buffer = await toBuffer(content, options);

        if (!label) 
            return qrcode;
        
        let qrCodeWithLabel : Buffer = await addLabel(qrcode, label);
        return qrCodeWithLabel;
    }
}

export default new QrCodesService();