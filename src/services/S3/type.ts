
export default interface IS3Service {
    upload(path: string, content: Buffer) : Promise<any>
}