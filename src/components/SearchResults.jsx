import React from "react";

const SearchResults = (props) => {
  console.log(props);
  function renderList() {
    return props.results.map((item) => {
      return <li key={item.id}>{item.name}</li>;
    });
  }

  return <ul>{renderList()}</ul>;
};

export default SearchResults;
