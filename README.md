# Purpose

This is an AWS Lambda function that can be used to monitor the availability of a single website by its URL and notify of any downtime to a Telegram channel via a Telegram Bot.

A [CloudWatch event](https://egghead.io/lessons/aws-use-cloudwatch-event-to-execute-an-aws-lambda-function-with-a-fixed-interval) with a rate expression of 1 minute can be set up to run this function on a time interval.

## Environment variables

- `URL`
  The URL the function should periodically monitor for outages.

- `TELEGRAM_CHAT_ID`
  The unique ID of the Telegram Bot.

- `TELEGRAM_TOKEN`
  The authentication token to access the Telegram Bot that will be posting downtime notifications to the channel.

- `EXPECTED_TOKEN`
  If set, the function will check the presence of the value within the page's HTML.
  
