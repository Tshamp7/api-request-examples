// fetch data using hooks and useEffect

import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/posts/",
      }).then((response) => {
        setData(response.data);
      });
    } catch (err) {
      setError(err.message);
    }
  }

  function renderList() {
    return data.map((item) => {
      return <li key={item.id}>{item.title}</li>;
    });
  }

  return (
    <div className="ui container">
      <h1 className="ui header">My posts: </h1>
      <div className="ui content">
        {data ? <ul>{renderList()}</ul> : <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Home;
