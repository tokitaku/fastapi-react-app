import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import AspectRatio from "@mui/joy/AspectRatio";
import { Grid } from "@mui/material";

ChartJS.register(...registerables);

export const BarChart = ({ data }) => {
  if (data === undefined || data.length === 0) {
    return <p>データがありません</p>;
  }
  const obj = {};
  for (let i = 0; i < data.length; i++) {
    obj[data[i][0]] = data[i].slice(1);
  }
  console.log(obj);

  // 1列目: 年、2列目: 売上
  const labels = obj[Object.keys(obj)[0]]; // 部署
  const year = obj[Object.keys(obj)[1]][0]; // 年
  const sales = obj[Object.keys(obj)[2]]; // 売上

  const datasets = [
    {
      label: year,
      data: sales,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const chartData = {
    labels,
    datasets,
  };

  return (
    <>
      <h3>部署別売上</h3>
      <Grid container justifyContent={"center"} sx={{ mb: 2 }}>
        <AspectRatio
          ratio="2/1"
          sx={{ width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" } }}
          variant="plain"
        >
          <Bar data={chartData} />
        </AspectRatio>
      </Grid>
    </>
  );
};
