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
      userID: 5,
      image: '',
      imgBase64: '',
      imgHiddenPreview: true
    }
    // Binding
    this.handlePostInputChange = this.handlePostInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this)
    this.deletePost = this.deletePost.bind(this)
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

  deletePost(post_id: number) {
    axios.delete('http://localhost:8080/delete-post', {
        data: {
            post_id: post_id
        }
    })
    .then((res) => {
        console.log(res)
        this.fetchPosts()
    })
    .catch((err) => {
        console.log(err)
    })
}

  handlePostInputChange(e: any) {
    this.setState({postValue : e.target.value});
  }
  handleSubmit(e: any) {
    this.addPost()
    alert('sent')
  }

  onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]){
      this.setState({
        image: URL.createObjectURL(event.target.files[0]),
        imgHiddenPreview: false
      })
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Starter Project
        </header>
        <form onSubmit={this.handleSubmit} className="post-form">
          <div className="post-and-img">
            <textarea placeholder="You can write something here..." value={this.state.postValue} onChange={this.handlePostInputChange} className={this.state.imgHiddenPreview ? 'post-text-full' : 'post-text'} />
            <img className="add-img-preview" src={this.state.image} hidden={this.state.imgHiddenPreview}/>
          </div>
          <div className="buttons-post">
            <input accept="image/*,.png,.jpg,.jpeg,.svg" type="submit" value="Submit!" className="post-submit"/>
            <input type="file" onChange={this.onImageChange} name="filename" id="file"/>
          </div>
        </form>
        <ul className="posts-view-wrapper">
          {this.state.posts.map((post) => (
            <Post post_id={post.post_id} author_id={post.author_id} author_name={post.author_name} creation_time={post.creation_time} postValue={post.post_text} deletePostFunction={this.deletePost}></Post>
          ))}
        </ul>
      </div>
    );
  }

}

export default App;
