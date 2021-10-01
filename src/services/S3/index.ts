import * as AWS from "aws-sdk";
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

    async upload(path: string, content: Buffer)
    {
        return new Promise<void>((resolve, reject) => {
            var uploadParams : AWS.S3.PutObjectRequest = {
                Bucket: this._bucket, 
                Key: path, 
                Body: content
            };
        
            this._s3.upload (uploadParams, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}

const bucket : string = "br-bucket-dev";
const region : string = "us-east-2";

export default new S3Service(bucket, region);