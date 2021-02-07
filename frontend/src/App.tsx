import React from 'react';
import './App.css';
import Post from './components/Post/Post'
import axios from 'axios'

interface AppState {
  postValue: string
  posts: Array<Posts>
}

interface Posts {
  post_id: number,
  author_id: number,
  creation_time: string,
  post_text: string,
  comments: Array<any>
}

class App extends React.Component<{},AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      postValue: "this is a post people can write here",
      posts: []
    }
    this.handlePostInputChange = this.handlePostInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  
  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts() {
    axios.get('http://localhost:8080/posts')
      .then((res => {
        console.log(res)
        this.setState({
          posts: res.data
        })
      }))
      .catch((err) => {
        console.log(err)
      })
  }

  handlePostInputChange(e: any) {
    this.setState({postValue : e.target.value});
  }
  handleSubmit(e: any) {
    alert('sent')
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Starter Project
        </header>
        <form onSubmit={this.handleSubmit} className="post-form">
          <textarea value={this.state.postValue} onChange={this.handlePostInputChange} className="post-text"/>
          <input type="submit" value="Submit!" className="post-submit"/>
        </form>
        <ul className="posts-view-wrapper">
          {this.state.posts.map((post) => (
            <Post author={post.author_id} creation_time={post.creation_time} postValue={post.post_text}></Post>
          ))}
        </ul>
      </div>
    );
  }

}

export default App;
