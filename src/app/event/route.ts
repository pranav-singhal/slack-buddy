import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from '../../../node_modules/next/server';





export async function POST(request: Request) {

    const body = await request.json();
    
    console.log("body: ", body)

    if (body?.type === 'url_verification') {
        return Response.json({challenge: body.challenge})
    }

    return Response.json({message: "ok"});

    
  }