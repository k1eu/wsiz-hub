import React from 'react';
import './App.css';
import Post from './components/Post/Post'
interface AppState {
  postValue: string
}

class App extends React.Component<{},AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      postValue: "this is a post people can write here"
    }
    this.handlePostInputChange = this.handlePostInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

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
          <Post author="Typowy Uczeń" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
          <Post author="Typowy Uczeń 2" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
          <Post author="Typowy Uczeń 3" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
          <Post author="Typowy Uczeń 3" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
          <Post author="Typowy Uczeń 3" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
          <Post author="Typowy Uczeń 3" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
          <Post author="Typowy Uczeń 3" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
          <Post author="Typowy Uczeń 3" creation_time="11:33" postValue="No testujemy sobie tutaj posty zeby dzialy hehehehe XDDDD"></Post>
        </ul>
      </div>
    );
  }

}

export default App;
