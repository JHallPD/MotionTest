export function parseCurlHeader(headersString: string, headerString:string){
        // grab the app usage data
        console.log(headersString)
        return JSON.parse(headersString.split('\r\n').find(header => header.startsWith(headerString)).split(': ')[1]);
         
}