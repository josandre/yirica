import React from 'react'
import { Route, Routes, } from 'react-router-dom';
import Conversation from './Conversation';

const ConversationEmpty = () => (
  <div className="chat-content-empty">
    <div className="text-center">
      <img src="/assets/others/img-11.png" alt="People want your responses" />
      <h1 className="font-weight-light">See what people is talking about</h1>
    </div>
  </div>
)

const ChatContent = () => {
  return (
    <Routes>
      <Route path={`:id`} element={<Conversation />} />
      <Route path={`/`} element={<ConversationEmpty />} />
    </Routes>
  )
}

export default ChatContent
