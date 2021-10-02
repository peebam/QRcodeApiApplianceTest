import qrCode from "@services/qrcodes";
import S3 from "@services/s3";

const bucket : string = "br-bucket-dev";
const region : string = "us-east-2";
const s3 : S3 = new S3(bucket, region);

function buildS3DocumentPath(id : string, prefix?  : string)
{
    
}

function generateContent(prefix?  : string) : string
{
    return "content";
}

async function generateQrcode(id : string, prefix? : string) : Promise<string>
{
    let content = generateContent(prefix);
    let buffer : Buffer = await qrCode.generate(content);
    return await s3.upload("test", buffer, "png");
}

export default async function (number: number, prefix? : string) : Promise<Record<string, string>>
{
    let locations = {};

    let id = "zozo";
    let location = await generateQrcode(id, prefix);

    locations[id] = location;
    return locations;
};