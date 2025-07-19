import Papa from "papaparse";
import ReactFileReader from "react-file-reader";
import Button from "@mui/material/Button";
import { useCreateSales } from "../hooks/useCreateSales";

export const ReadCsv = ({ handleDataChange }) => {
  const { onClickCreateSales } = useCreateSales();

  const uploadFile = (files) => {
    const file = files[0];
    Papa.parse(file, {
      header: false, // ヘッダーとして解析せず、配列の配列として取得
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Raw CSV data:", results.data);
        onClickCreateSales(results.data);
        handleDataChange(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  return (
    <>
      <ReactFileReader handleFiles={uploadFile} fileTypes={[".csv"]}>
        <Button variant="contained" component="span">
          CSVファイルを選択
        </Button>
      </ReactFileReader>
      <p>CSVファイルを選択して、データベースに格納します。</p>
    </>
  );
};
