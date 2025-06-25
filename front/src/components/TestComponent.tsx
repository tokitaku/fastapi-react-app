import { useState} from 'react'

export const TestComponent = () => {
    const [count, setCount] = useState(0)
    const onClickChange = () => {
        setCount((prevCount) => prevCount + 1)
    }

  return (
    <div>
      <p>TestComponent</p>
      <p>Count: {count}</p>
      <button onClick={onClickChange}>Increment</button>
    </div>
  )
}
