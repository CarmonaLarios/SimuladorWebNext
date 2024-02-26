import React, { useContext, useState } from "react";
import useInterval from "@use-it/interval";
import { motion } from "framer-motion";
import Image from 'next/image';
import IconMycon from '../../assets/images/ico-mycon-chat.png';
import "../../styles/chat.css";

const Fragment = React.Fragment;

function H2({texto}:any){
  return(<p dangerouslySetInnerHTML={{ __html: texto }}></p>)
}


export function ChatSemPlanos() {
  const [messageToshow, setMessageToShow] = useState(0);

  const messages = [
    { text: `Que pena!` },
    { text: `Nesse momento não encontramos planos para você.` },
    { text: `Nossa recomendação é de que a sua parcela não comprometa <b>mais do que 30% da sua renda mensal.</b>`}
  ];
  
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
