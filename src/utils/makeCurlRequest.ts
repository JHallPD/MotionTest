import { exec } from 'child_process';
require('dotenv').config();



// Execute the cURL command
export function makeCurlRequest() {
    const TOKEN = process.argv[2]?process.argv[2]:process.env.ACCESS_TOKEN;
    const test:number = process.argv[3]?parseInt(process.argv[3]):parseInt(process.env.TIME_OUT);
    // url construction
    const curlCommand = `curl -i -X GET \\ "https://graph.facebook.com/v19.0/me?fields=id%2Cname%2Clast_name&access_token=${TOKEN}"`;

    // exec is used to preserve the curl command: <> removed from url
	exec(curlCommand, (error, stdout, stderr) => {
        const currentTime = new Date();

        // check for errors log them then set a 2 second timer for the next attempt
        if(error){
            console.error(`Error: ${stderr}`);
            setTimeout(function(){
                    makeCurlRequest();
            }, 2000);
        }

        // Split the response into headers and JSON data, 
        const [headersString, jsonString] = stdout.split('\r\n\r\n');

        // grab the app usage data
        const appData = JSON.parse(headersString.split('\r\n').find(header => header.startsWith('x-app-usage:')).split(': ')[1]);

        // Check if call_count is equal to 100% or if there is a rate limit error in the json
        if(appData.call_count !== null && appData.call_count >= 100) {
            

            // alert in console that due to rate limiting the application will wait for 1-2 minutes before trying again
            // 1-2 minute waits allow for faster testing.
            console.log(`Rate limit reached (${appData.call_count}/100%). Waiting for ${test/60000} minute. Resuming at ${new Date(currentTime.getTime() + test)}`);
            setTimeout(function(){
                makeCurlRequest();
            }, test);

        } else {

            
            // format JSON data for logging
            const jsonData = JSON.parse(jsonString)

            // Log the recieved data.
            console.log(`**********************
            \r Id: ${jsonData.id}
            \r Name: ${jsonData.name}
            \r Last Name: ${jsonData.last_name}
            \r Current Rate ${appData.call_count}/100%
            \r**********************\n`)
            // contains connection info
            //console.error(`${stderr}`);
            setTimeout(function(){
                    makeCurlRequest();
            }, 2000);

        }

        
    });
};