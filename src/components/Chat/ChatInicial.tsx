import React, { useState } from "react";
import useInterval from "@use-it/interval";
import { motion } from "framer-motion";
import Image from 'next/image';
import IconMycon from '../../assets/images/ico-mycon-chat.png';
import "../../styles/chat.css";



const messages = [
  { text: "Enquanto <b>busco pelos melhores planos</b> para você, vamos nos conhecer?" },
  { text: "Preencha os campos abaixo com seus dados:" },
];

const Fragment = React.Fragment;

function H2({texto}:any){
  return(<p dangerouslySetInnerHTML={{ __html: texto }}></p>)
}


export default function App() {
  const [messageToshow, setMessageToShow] = useState(0);
  
  useInterval(() => {
    setMessageToShow((messageToshow) => messageToshow + 1);
  }, 2000);

  


  return (
    <div className="app">
      <div className="walkthrough">
        {messages.map((message, index) => {
           const even = index % 2 === 0;
           
          if (messageToshow + 1 === index) {
            return <Typing key={index} even={even} />;
            
          }

          // are we supposed to show this message?
          if (index > messageToshow) return <div key={index} />;

          return <Message key={index} message={message} />;
        })}
      </div>
    </div>
  );
}

function Message({ message }:any) {



  return (
    <motion.div
      className="message"
      initial={{ rotate: -5, scale: 0.2 }}
      animate={{ rotate: 0, scale: 1 }}
      // transition={{ duration: 0.5 }}
      >
       
        <div className="avatar" >   
        
        <Image alt="Mycon" src={IconMycon} /> 
          
        </div>
        <div className="text"><Fragment><H2 texto={message.text}></H2></Fragment></div>
    </motion.div>
  );
}

function Typing({ even }:any) {
  return (
    <motion.div
      className={`typing`}
      initial={{ rotate: 10, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
    >
      <div className="dots">
        <div />
        <div />
        <div />
      </div>
    </motion.div>
  );
}
