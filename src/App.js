import React, { useState } from "react";
import "./App.scss";
import Error from "./components/Error";
import JSONtree from "./components/JSONtree/JSONtree";
import Loading from "./components/Loading";
import URLinput from "./components/URLinput/URLinput";

const App = () => {
  const [status, setStatus] = useState("idle"); // "idle", "fetching", "error"
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    try {
      setStatus("fetching");

      const response = await fetch(url);
      const json = await response.json();

      setData(json);
      setStatus("idle");
    } catch (error) {
      // console.error(error);
      setStatus("error");
      setError(error);
    }
  };

  const renderJSONtree = () => {
    if (status === "error") {
      return <Error error={error} />;
    } else if (status === "fetching") {
      return <Loading />;
    } else {
      return <JSONtree data={data} />;
    }
  };

  return (
    <div className="app-wrap">
      <URLinput
        callback={fetchData}
        examples={[
          "https://www.breakingbadapi.com/api/characters",
          "https://swapi.dev/api/planets/1/",
          "https://official-joke-api.appspot.com/jokes/programming/random",
        ]}
      />
      {renderJSONtree()}
    </div>
  );
};

export default App;
