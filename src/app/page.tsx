'use client';
import { useEffect, useState } from 'react'
import styles from './page.module.css'

import { io } from "socket.io-client";
import SlackMessages, { SlacKMessage } from './components/SlackMessages';

// initialise the socker connection to post messages received from slack to.
const socket = io('http://localhost:3001');

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [slackMessages, setSlackMessages] = useState<SlacKMessage[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  
  useEffect(() => {

    socket.on('slack-message-forwarded', (message) => {
    
      setSlackMessages((previousMessages: SlacKMessage[]) => [...previousMessages, message])
    })
    
  }, [])
  

  const handleSubmit =async () => {
    setIsSendingMessage(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    const raw = JSON.stringify({
      text: inputValue
    });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

    
    let response = await fetch('/message', requestOptions)
    response = await response.json();

    setIsSendingMessage(false);
    setInputValue('');
    alert('message sent!')
  
  }
  
  return (
    <main className={styles.main}>

      <div>
      
        <input value={inputValue} type="text" onChange={e => setInputValue(e?.target?.value)} />
        <button className={styles.button} type='submit' disabled={(inputValue.length === 0) || isSendingMessage} onClick={handleSubmit}>
          {
            isSendingMessage? 'sending...': 'send message to slack'
          }
        </button>
      </div>
        
      <div>
          messages from slack:

          <SlackMessages messages={slackMessages} />
        </div>
        
         
    </main>
  )
}
