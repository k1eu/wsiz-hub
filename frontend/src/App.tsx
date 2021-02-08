import React from 'react';
import './App.css';
import Post from './components/Post/Post'
import axios from 'axios'
import {AppState} from './interfaces/interfaces'


class App extends React.Component<{},AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      postValue: "",
      posts: [],
      userID: 2
    }
    this.handlePostInputChange = this.handlePostInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  
  componentDidMount() {
    this.fetchPosts()
  }
  componentDidUpdate() {
    
  }

  fetchPosts() {
    axios.get('http://localhost:8080/posts')
      .then((res => {
        console.log(res)
        this.setState({
          posts: res.data.reverse()
        })
      }))
      .catch((err) => {
        console.log(err)
      })
  }

  addPost() {
    axios.post('http://localhost:8080/add-post', {
      author_id: this.state.userID,
      post_text: this.state.postValue
    })
      .then((res) => {
        console.log(res)
        this.fetchPosts()
      })
      .catch((err) => {
        console.error(err)
      })
      
  }

  handlePostInputChange(e: any) {
    this.setState({postValue : e.target.value});
  }
  handleSubmit(e: any) {
    this.addPost()
    alert('sent')
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Starter Project
        </header>
        <form onSubmit={this.handleSubmit} className="post-form">
          <textarea placeholder="You can write something here..." value={this.state.postValue} onChange={this.handlePostInputChange} className="post-text"/>
          <input type="submit" value="Submit!" className="post-submit"/>
        </form>
        <ul className="posts-view-wrapper">
          {this.state.posts.map((post) => (
            <Post author_id={post.author_id} author_name={post.author_name} creation_time={post.creation_time} postValue={post.post_text}></Post>
          ))}
        </ul>
      </div>
    );
  }

}

export default App;
