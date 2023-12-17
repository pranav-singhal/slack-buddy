import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from '../../../node_modules/next/server';


const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;


export async function POST(request: Request) {

    // if slack Webhook URL is not available, throw;
    if (!slackWebhookURL) {
        throw new Error('invalid slack url')
    }
    const body = await request.json();

    const text = body?.text;

    // return 400 incase body does not contain text
    if (!text) {
        return NextResponse.json({ error: 'text cannot be empty' }, { status: 400 })

    }

    // generate request options
    const _headers = new Headers();
    _headers.append("accept", "application/json");
    _headers.append("content-type", "application/json");

      const requestOptions = {
        method: 'POST',
        headers: _headers,
        body: JSON.stringify({ text }),
        redirect: 'follow'
      };

    try {
        // @ts-ignore
        await fetch(slackWebhookURL, requestOptions);    
        return Response.json({message: "success"});
    } catch (error) {
        console.log(error)
        return Response.json({error});
    }
 
  }