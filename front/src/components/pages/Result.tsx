import { useLocation } from "react-router-dom";
import { useState } from "react";

export interface ResultState {
  name: string;
  age: string;
  gender: string;
  comment: string;
}

export const Result: React.FC = () => {
  const location = useLocation();
  const [result] = useState<ResultState>(location.state as ResultState);
    
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
