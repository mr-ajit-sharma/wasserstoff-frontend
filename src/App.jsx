import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./components/ChartComponent";
import D3Chart from "./components/D3Chart";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    topics: "",
    sector: "",
    region: "",
    source: "",
    swot: "",
    country: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8001")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const uniqueOptions = (field) => {
    return [...new Set(data.map((d) => d[field]).filter(Boolean))];
  };

  const filteredData = data.filter((item) => {
    return (
      (!filters.year || item.Year === filters.year) &&
      (!filters.topics || item.Topics.includes(filters.topics)) &&
      (!filters.sector || item.Sector === filters.sector) &&
      (!filters.region || item.Region === filters.region) &&
      (!filters.source || item.Source === filters.source) &&
      (!filters.swot || item.SWOT === filters.swot) &&
      (!filters.country || item.Country === filters.country)
    );
  });

  return (
    <div className="App">
      <h1>Data Visualization Dashboard</h1>
      <div className="filters">
        <select name="year" onChange={handleFilterChange} value={filters.year}>
          <option value="">Select Year</option>
          {uniqueOptions("Year").map((year, index) => (
            <option key={`year-${index}-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select name="topics" onChange={handleFilterChange} value={filters.topics}>
          <option value="">Select Topic</option>
          {uniqueOptions("Topics").map((topic, index) => (
            <option key={`topic-${index}-${topic}`} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <select name="sector" onChange={handleFilterChange} value={filters.sector}>
          <option value="">Select Sector</option>
          {uniqueOptions("Sector").map((sector, index) => (
            <option key={`sector-${index}-${sector}`} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <select name="region" onChange={handleFilterChange} value={filters.region}>
          <option value="">Select Region</option>
          {uniqueOptions("Region").map((region, index) => (
            <option key={`region-${index}-${region}`} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select name="source" onChange={handleFilterChange} value={filters.source}>
          <option value="">Select Source</option>
          {uniqueOptions("Source").map((source, index) => (
            <option key={`source-${index}-${source}`} value={source}>
              {source}
            </option>
          ))}
        </select>

        <select name="swot" onChange={handleFilterChange} value={filters.swot}>
          <option value="">Select SWOT</option>
          {uniqueOptions("SWOT").map((swot, index) => (
            <option key={`swot-${index}-${swot}`} value={swot}>
              {swot}
            </option>
          ))}
        </select>

        <select name="country" onChange={handleFilterChange} value={filters.country}>
          <option value="">Select Country</option>
          {uniqueOptions("Country").map((country, index) => (
            <option key={`country-${index}-${country}`} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <ChartComponent data={filteredData} />
      <D3Chart data={filteredData} />
    </div>
  );
};

export default App;
