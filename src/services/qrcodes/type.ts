
export default interface IQrCodesService {
    generate(content: string, label: string) : Promise<Buffer>
}