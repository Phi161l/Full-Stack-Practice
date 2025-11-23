import React from 'react'

function FeedbackItem({ feedback }) {
  return (
    <div className="feedback-item">
      <p>{feedback.text}</p>
    </div>
  )
}

export default FeedbackItem
