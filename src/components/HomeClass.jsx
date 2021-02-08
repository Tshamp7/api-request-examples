// fetching posts with class component and componentDidMount

import axios from "axios";
import React, { Component } from "react";

class HomeClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    try {
      await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/posts/",
      }).then((response) => {
        this.setState({ data: response.data });
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  renderList = () => {
    const { data } = this.state;
    return data.map((post) => {
      return <li key={post.id}>{post.title}</li>;
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="ui container">
        <div className="ui header">My Posts:</div>
        {data ? <ul>{this.renderList()}</ul> : <div>Loading...</div>}
      </div>
    );
  }
}

export default HomeClass;
