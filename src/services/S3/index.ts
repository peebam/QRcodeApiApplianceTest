import AWS from "aws-sdk";
import cleanDeep from "clean-deep";

import type IS3Service from "./type";

class S3Service implements IS3Service 
{
    _bucket : string
    _s3 : AWS.S3

    constructor(bucket: string, region: string) 
    {
        // Dirty : if the credentials environment variables are not provided (lambda aws environment), 
        // try to access a local credential file (local node environment)
        if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY)
        {
            var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
            AWS.config.credentials = credentials;
        }

        AWS.config.update({region: region});
        this._s3 = new AWS.S3();
        this._bucket = bucket;
    }
    
    /**
     * @returns URL to get the content
     */
    async upload(path: string, content: Buffer, type: string, metadata? : Record<string, string>) : Promise<string>
    {
        return new Promise<string>((resolve, reject) => {
            var uploadParams : AWS.S3.PutObjectRequest = {
                ACL : "public-read",
                Bucket: this._bucket, 
                Key: path, 
                Body: content,
                ContentType : type,
                Metadata : cleanDeep(metadata)
            };
        
            this._s3.upload (uploadParams, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data.Location);
            });
        });
    }
}

export default S3Service