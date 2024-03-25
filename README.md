# MotionTest

After some initial back and forth with facebook I was able to create the required app.

It requests data via the provided curl request every 2 seconds unless rate limited.

## Setup

Install node modules
` npm i`

Optional: Create a .env file and copy this over and replace with your token
```
ACCESS_TOKEN=YOUR_TOKEN_HERE
TIME_OUT=60000
```

Standard start if using .env file
` npm run start `

Passing the access token via command line as the first argv. In the same way a timeout can be passed as the second argv, the timeout does not need to be provided and will default to 60000

` npm run start ACCESS_TOKEN TIMEOUT`

## Assumptions

When rate limited I have assumed it is no longer desired to request every 2 seconds as that is just digging a deeper hole in the facebook rate limit.

a 2 second request rate totaling 1800/hr with a limit of 200/hr means the rate limit is expected to be hit quickly. I can see the count slowly decreases over time so I have set it to wait a minute before retrying when rate limited.

This is on the assumption the application wont be run in multiple instances without additional rate limit increases.

the wait time is configurable and set to 1 minute for ease of testing. 1-2 calls will be freed up if not over the limit in a minutes time.

