import { Storage } from 'aws-amplify'

export async function s3Upload(fileName, file) {
    // const stored = await Storage.vault.put(filename, file, {
    //     contentType: file.contentType
    // })

    const stored = await Storage.put(fileName, file, {
        contentType: file.contentType
    })
    
    return stored.key
}