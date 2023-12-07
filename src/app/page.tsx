'use client';
import Image from 'next/image'
import { useState } from 'react'
import styles from './page.module.css'


export default function Home() {
  
  const [inputValue, setInputValue] = useState<string>('');
  

  const handleSubmit =async () => {
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

    console.log(response)
  
  }
  
  return (
    <main className={styles.main}>
        
        enter message here: 
        <input type="text" onChange={e => setInputValue(e?.target?.value)} />
        <button type='submit' disabled={inputValue.length === 0} onClick={handleSubmit}>
          send message to slack
        </button>
         
    </main>
  )
}
