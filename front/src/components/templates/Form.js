import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        comment: '',

    })
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const navigate = useNavigate()

    const goToResult = (formData) => {
        navigate('/result', { state: formData })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (formData.name && formData.age && formData.gender && formData.comment) {
            goToResult(formData)
        }
    }

  return (
      <>
          <label htmlFor="name">
              名前
              <input type="text" id='name' name='name' value={formData.name} onChange={handleInputChange} />
          </label>
          <br />
          <label htmlFor="age">
              年齢
              <select id='age' name='age' value={formData.age} onChange={handleInputChange}>
                  <option value="">選択してください</option>
                  <option value="10">10歳</option>
                  <option value="20">20歳</option>
                  <option value="30">30歳</option>
              </select>
          </label>
          <br />
          <label htmlFor="gender">
              性別
              <select id='gender' name='gender' value={formData.gender} onChange={handleInputChange}>
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
              </select>
          </label>
          <br />
          <label htmlFor="comment">
              コメント
              <textarea id='comment' name='comment' value={formData.comment} onChange={handleInputChange} />
          </label>
          <button onClick={handleSubmit}>送信</button>
      </>
  )
}
