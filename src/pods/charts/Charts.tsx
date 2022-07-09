import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ResultModel from "../models/ResultModel";
import { getLast10days } from "../../utils/helpers";

const Charts = () => {
  const [aprData, setAprData] = useState<ResultModel>(new ResultModel());
  const [aprGrowthData, setAprGrowthData] = useState<number[]>([]);
  const [tvlGrowthData, setTvlGrowthData] = useState<number[]>([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        color: "#FFFFFF",
      },
    },
  };

  const labels = getLast10days();

  const dataApr = {
    labels,
    datasets: [
      {
        label: "APR (y)",
        data: aprGrowthData,
        borderColor: "#9A0680",
        backgroundColor: "#9A0680",
        fill: {
          target: "origin",
          above: "#4c0070bf",
          below: "#4c0070bf",
        },
      },
    ],
  };

  const dataTvl = {
    labels,
    datasets: [
      {
        label: "APR (y)",
        data: tvlGrowthData,
        borderColor: "#9A0680",
        backgroundColor: "#9A0680",
        fill: {
          target: "origin",
          above: "#4c0070bf",
          below: "#4c0070bf",
        },
      },
    ],
  };

  function toDecimal(percent: string) {
    return parseFloat(percent) / 100;
  }

  const getData = async () => {
    const response = await axios.get(
      "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000"
    );

    setAprData(
      response.data.data.filter((i: any) => i.assetId === "ETH_Lido__ETH")[0]
    );

    let startValueApr = response.data.data.filter(
      (i: any) => i.assetId === "ETH_Lido__ETH"
    )[0].aprDaily;

    let startValueTvl = response.data.data.filter(
      (i: any) => i.assetId === "ETH_Lido__ETH"
    )[0].tvlStaked;

    for (let i = 0; i < 10; i++) {
      let resultApr = startValueApr + startValueApr * toDecimal("5%");
      setAprGrowthData((aprGrowthData) => [...aprGrowthData, resultApr]);
      startValueApr = resultApr;

      let resultTvl = startValueTvl + startValueTvl * toDecimal("5%");
      setTvlGrowthData((tvlGrowthData) => [...tvlGrowthData, resultTvl]);
      startValueTvl = resultTvl;
    }
  };

  console.log(aprData);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chart-one">
      <div>
        {aprData && <h4>{aprData.asset} APR (y)</h4>}
        {aprGrowthData.length > 0 && <Line data={dataApr} options={options} />}

        {aprData && <h4 style={{ marginTop: "100px" }}>{aprData.asset} TVL</h4>}
        {tvlGrowthData.length > 0 && <Line data={dataTvl} options={options} />}
      </div>
    </div>
  );
};

export default Charts;
