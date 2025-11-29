import React from 'react'
import FeedbackItem from './FeedbackItem'

function FeedbackList({ feedbacks }) {
  if (feedbacks.length === 0) return <p>No feedback yet!</p>

  return (
    <div className="feedback-list">
      {feedbacks.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  )
}

export default FeedbackList
