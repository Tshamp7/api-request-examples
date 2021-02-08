import axios from "axios";
import React, { useState } from "react";
import SearchResults from "./SearchResults";

const HomeSearch = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    await axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/users?id=${search}`,
    }).then((res) => {
      setResults(res.data);
      setLoading(false);
      setSearch("");
    });
  }

  function renderResults() {
    if (!loading && !results) {
      return (
        <div className="ui container">
          Type in something and hit enter to search!
        </div>
      );
    }

    if (loading) {
      return (
        <div className="ui segment" style={{ height: "100px" }}>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      );
    }

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
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
          </label>
        </div>
      </form>

      {renderResults()}
    </div>
  );
};

export default HomeSearch;
