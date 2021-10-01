
export default interface IQrCodeGeneratorService {
    generate(content: string) : Promise<Buffer>
}