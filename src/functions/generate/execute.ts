import qrCode from "@services/qrcodes";
import S3 from "@services/s3";
import { customAlphabet } from "nanoid";

const bucket : string = "br-bucket-dev";
const region : string = "us-east-2";
const s3 : S3 = new S3(bucket, region);

const s3Root = "qrcodes"
const idAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789"

const buildS3DocumentPath = (id: string) : string => `${s3Root}/${id}`;

const generateId : () => string = customAlphabet(idAlphabet, 7);

const generateContent = (id: string, prefix  : string) : string => `${prefix || ""}${id}`;

async function generateQrcode(id : string, prefix : string, addLabel : boolean) : Promise<string>
{
    let content = generateContent(id, prefix);

    let label = (addLabel ? id : "");
    let qrcode : Buffer = await qrCode.generate(content, label);

    let path : string = buildS3DocumentPath(id);
    let metadata : Record<string, string> = {
        "id": id,
        "prefix" : prefix
    };
    
    return await s3.upload(path, qrcode, "png", metadata);
}

async function generateQrcodes(quantity: number, prefix : string, addLabel : boolean) : Promise<Record<string, string>>
{
    let locations = {};
    
    for(let i = 0; i < quantity; i++)
    {
        let id = generateId();

        let location = await generateQrcode(id, prefix, addLabel);
        locations[id] = location;
    }

    return locations;
};

export default generateQrcodes;