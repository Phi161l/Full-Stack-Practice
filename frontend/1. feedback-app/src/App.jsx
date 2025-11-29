import React, { useState } from 'react'
import Header from './components/Header'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import { feedbackData } from './data/feedbackData'

function App() {
  const [feedbacks, setFeedbacks] = useState(feedbackData)

  const addFeedback = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks])
  }

  return (
    <div className="container">
      <Header />
      <FeedbackForm onAdd={addFeedback} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  )
}

export default App
