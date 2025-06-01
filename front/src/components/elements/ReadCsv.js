import React from 'react'
import Papa from 'papaparse'
import ReactFileReader from 'react-file-reader'
import Button from '@mui/material/Button'

export const ReadCsv = ({ handleDataChange }) => {
  const uploadFile = (files) => {
    const file = files[0]
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log(results.data)
        handleDataChange(results.data)
      },
      error: (error) => {
        console.error("Error parsing CSV:", error)
      }
    })
  }

  return (
    <>
      <ReactFileReader handleFiles={uploadFile} fileTypes={[".csv"]}>
        <Button variant="contained" component="span">
          CSVファイルを選択
        </Button> 
      </ReactFileReader>
      <p>CSVファイルを選択して、データベースに格納します。</p>
    </>
  )
}
