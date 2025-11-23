import React, { useState } from 'react'

function FeedbackForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === '') return
    
    const newFeedback = {
      id: Date.now(),
      text,
    }
    onAdd(newFeedback)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write your feedback"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default FeedbackForm
