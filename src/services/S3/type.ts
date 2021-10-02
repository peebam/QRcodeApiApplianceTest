
export default interface IS3Service {
    upload(path: string, content: Buffer, type: string, metadata? : AWS.S3.Metadata) : Promise<any>
}