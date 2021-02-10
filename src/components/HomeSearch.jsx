import axios from "axios";
import React, { useState } from "react";
import SearchResults from "./SearchResults";

const HomeSearch = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const REQUEST_URL = process.env.REACT_APP_REQUEST_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    await axios({
      method: "get",
      url: `${REQUEST_URL}${search}`,
    }).then((res) => {
      setResults(res.data);
      setLoading(false);
    });
  }

  function renderResults() {
    // if there are no results, and the axios request is not loading a response, show default prompt text.
    if (!loading && !results) {
      return (
        <div className="ui container">
          <div className="ui segment" style={{ height: "auto" }}>
            Type in something and hit enter to search!
          </div>
        </div>
      );
    }
    //if loading, show loading spinner.

    if (loading) {
      return (
        <div className="ui segment" style={{ height: "100px" }}>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      );
    }
    // render results via SearchResults.jsx if available

    if (results) {
      return (
        <div className="ui segment" style={{ height: "auto" }}>
          <SearchResults results={results} />
        </div>
      );
    }
  }

  return (
    <div className="ui container">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </form>
      {renderResults()}
    </div>
  );
};

export default HomeSearch;
