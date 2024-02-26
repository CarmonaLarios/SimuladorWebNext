import React, { useContext, useState } from "react";
import useInterval from "@use-it/interval";
import { motion } from "framer-motion";
import Image from 'next/image';
import IconMycon from '../../assets/images/ico-mycon-chat.png';
import "../../styles/chat.css";
import { useDadosUsuario } from "@/app/hooks/dadosUsuario";


const Fragment = React.Fragment;

function H2({texto}:any){
  return(<p dangerouslySetInnerHTML={{ __html: texto }}></p>)
}

export default function App() {
  const [messageToshow, setMessageToShow] = useState(0);
  const {dadosUsuario} = useDadosUsuario()

  const messages = [
    { text: `Obrigado, ${dadosUsuario?.nome}!` },
    { text: "Antes de continuar, dá uma olhada nesse recado:" },
    { video: "https://player.vimeo.com/progressive_redirect/playback/855393314/rendition/240p/file.mp4?loc=external&signature=d0b7d0673b6058ffb2e15b62c07212fdce2fc41a7046ffab1f02323e69907ff1" },
    { text: "Qual plano você prefere?" },
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

function Message({ message }: any) {
  return (
    <div className="message">
      <div className="avatar">
        <Image alt="Mycon" src={IconMycon} />
      </div>
      <div className="text">
        {message.text ? <H2 texto={message.text} /> : <video width='100%' controls><source src={message.video} type='video/mp4'/></video>}
      </div>
    </div>
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
