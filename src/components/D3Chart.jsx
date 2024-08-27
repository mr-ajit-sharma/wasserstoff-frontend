import React, { useEffect } from "react";
import * as d3 from "d3";

const D3Chart = ({ data }) => {
  useEffect(() => {
    const svg = d3.select("#d3-chart").attr("width", 500).attr("height", 300);

    svg.selectAll("*").remove();
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 50)
      .attr("y", (d) => 300 - d.Intensity * 2)
      .attr("width", 40)
      .attr("height", (d) => d.Intensity * 2)
      .attr("fill", "blue");
  }, [data]);

  return <svg id="d3-chart" />;
};

export default D3Chart;
