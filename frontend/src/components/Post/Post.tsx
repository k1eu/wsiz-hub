import React from 'react';
import './Post.css';

interface PostProps {
    author: number,
    creation_time: string
    postValue: string
  }

class Post extends React.Component<PostProps, {}> {
constructor(props: PostProps) {
    super(props);
};
render(){
    return(
    <li className="post-wrap">
        <div className="top-row">
        <div>{this.props.author}</div>
        <div>{this.props.creation_time}</div>
        </div>
        <div className="middle-row-post">
        {this.props.postValue}
        </div>
        <div className="bottom-row">
        Tu będą komentarze kiedyś
        </div>
    </li>
    )
}
}

export default Post