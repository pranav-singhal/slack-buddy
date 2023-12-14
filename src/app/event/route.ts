import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from '../../../node_modules/next/server';
import { io } from "socket.io-client";



// 1. /event -> registered
// 2. // event/route.ts is listetning to /event
// 3.


export async function POST(request: Request) {

    // initialise the socker connection to post messages received from slack to.
    const socket = io('http://localhost:3001');
    const body = await request.json();

    if (body?.type === 'url_verification') {
        return Response.json({challenge: body.challenge})
    }

    // the second check is to prevent messages sent from next app getting relayed back to the channel
    if (body?.type === 'event_callback' && body?.event?.subtype !== 'bot_message') {

        // sending id so it can be used on the front-end for react.map
        socket.emit('slack-message-recieved', {message: body?.event?.text, id: body?.event?.client_msg_id});
    }



    return Response.json({message: "ok"});

    
  }