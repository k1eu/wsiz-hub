export interface AppState {
    postValue: string
    posts: Array<Posts>
    userID: number
  }
  
export interface Posts {
    post_id: number,
    author_id: number,
    author_name: string,
    creation_time: string,
    post_text: string,
    comments: Array<any>
  }

export interface PostProps {
    author_id: number,
    author_name: string,
    creation_time: string
    postValue: string
}