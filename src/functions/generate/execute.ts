import qrCode from "@services/qrcodes";
import S3 from "@services/s3";
import { customAlphabet } from "nanoid";
// import * as fs from "@libs/filesys"
const bucket : string = "br-bucket-dev";
const region : string = "us-east-2";
const s3 : S3 = new S3(bucket, region);

const s3Root = "qrcodes"
const idAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789"

const buildS3DocumentPath = (id: string) : string => `${s3Root}/${id}`;

const generateId : () => string = customAlphabet(idAlphabet, 7);

const generateContent = (id: string, prefix?  : string) : string => `${prefix}${id}`;

async function generateQrcode(id : string, prefix? : string) : Promise<string>
{
    let content = generateContent(prefix);
    let qrcode : Buffer = await qrCode.generate(content, id);

    let path : string = buildS3DocumentPath(id);
    let metadata : Record<string, string> = {
        "id": id,
        "prefix" : prefix
    };
    
    // await fs.writeBufferToDiskAsync(`${id}.png`, qrcode);
    // return

    return await s3.upload(path, qrcode, "png", metadata);
}

export default async function (number: number, prefix? : string) : Promise<Record<string, string>>
{
    let locations = {};
    
    for(let i = 0; i < number; i++)
    {
        let id = generateId();

        let location = await generateQrcode(id, prefix);
        locations[id] = location;
    }

    return locations;
};