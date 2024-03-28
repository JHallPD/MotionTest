export function parseCurlStdout(stdout:string){
        // parse the stdout into a headerstring and jsonstring
        const [headersString, jsonString] = stdout.split('\r\n\r\n');
        return {headersString, jsonString};
}