import React from 'react';
import './Post.css';
import axios from 'axios'

interface PostProps {
    post_id: number,
    author_id: number,
    author_name: string,
    creation_time: string
    postValue: string
    deletePostFunction: (post_id:number) => void
  }

class Post extends React.Component<PostProps, {}> {
    constructor(props: PostProps) {
        super(props);
    };

    

    render(){
        return(
        <li className="post-wrap">
            <div className="top-row">
                <div>{this.props.author_name}</div>
                <div>{this.props.creation_time}</div>
                <div>
                    <button>Edit</button>
                    <button onClick={()=>this.props.deletePostFunction(this.props.post_id)}>X</button>
                </div>
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