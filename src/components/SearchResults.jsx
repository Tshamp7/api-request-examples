import React from "react";

const SearchResults = (props) => {
  console.log(props);
  function renderList() {
    return props.results.map((item) => {
      return (
        <div className="item" key={item.id}>
          <div className="content">
            <div className="header">{item.name}</div>
            <div className="description">{item.website}</div>
          </div>
        </div>
      );
    });
  }

  return <div className="ui relaxed divided list">{renderList()}</div>;
};

export default SearchResults;
