import { useLocation } from "react-router-dom"
import { useState } from "react"

export const Result = () => {
  const location = useLocation()
    const [result, setResult] = useState(location.state)
    
  return (
    <>
      <h2>入力内容</h2>
      <p>Name: {result.name}</p>
      <p>Age: {result.age}</p>
      <p>Gender: {result.gender}</p>
      <p>Comment: {result.comment}</p>
    </>
  )
}
