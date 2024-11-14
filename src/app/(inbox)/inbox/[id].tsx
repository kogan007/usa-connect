import { Chat, type MessageType } from '@flyerhq/react-native-chat-ui'
import { useEffect, useState } from 'react'
import { type DefaultEventsMap } from 'socket.io/dist'
import { type Socket } from 'socket.io-client'

import { connect } from '@/core'


export default function Inbox() {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  const [messages, setMessages] = useState<MessageType.Any[]>([])
  const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

  useEffect(() => {
    const connection = connect()
    setSocket(connection)
    return () => {
      connection.close()
    }
  }, [])

  useEffect(() => {
    if (!socket) return;
    socket.on("test", (data: any) => {
      console.log(data);
    });
  }, [socket]);


  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages])
  }

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: "djsakdjskadjksajdsa",
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }

  return (
    <Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
      />
  )
}