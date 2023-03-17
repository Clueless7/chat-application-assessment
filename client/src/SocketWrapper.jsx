import { useState } from 'react'
import { AppContext, socket } from './contexts/appContext'

function SocketWrapper({ children }) {
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState([])
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([])
  const [privateMemberMsg, setPrivateMemberMsg] = useState({})
  const [newMessages, setNewMessages] = useState({})

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default SocketWrapper
