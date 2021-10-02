
import fs from "fs";

async function writeBufferToDiskAsync(path : string, buffer: Buffer) : Promise<void>
{
    await new Promise<void>((resolve, reject) => {
        fs.writeFile(path, buffer, (err) => {
            if (err) reject(err);
            else resolve();
        })
    })
}
    
export { writeBufferToDiskAsync };