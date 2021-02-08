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

    if (loading && !results) {
      return <div className="ui container">Loading...</div>;
    }

    if (results) {
      return (
        <div className="ui container">
          <SearchResults results={results} />
        </div>
      );
    }
  }

  return (
    <div className="ui container">
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
        </label>
      </form>
      {renderResults()}
    </div>
  );
};

export default HomeSearch;
