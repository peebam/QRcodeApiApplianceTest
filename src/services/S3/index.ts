import AWS from "aws-sdk";
import cleanDeep from "clean-deep";

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});

import type IS3Service from "./type";

class S3Service implements IS3Service 
{
    _bucket : string
    _s3 : AWS.S3

    constructor(bucket: string, region: string) {
        
        AWS.config.update({region: region});
        AWS.config.credentials = credentials;
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