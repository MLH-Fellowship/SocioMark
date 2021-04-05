import React, { Component } from "react";
import "./Post.css";
    class Post extends Component {
        constructor(props) {
            super(props);
        }
      render() {
          const nickname = this.props.nickname;
          const avatar = this.props.avatar;
          const image = this.props.image;
          const comments = this.props.comments;
          const comm = comments.map((comment) =>
            <li>{comment}</li>
          );
          const numLikes = this.props.numLikes;
        return (
        <article className="Post" ref="Post">
            <header>
              <div className="Post-user">
                <div className="Post-user-avatar">
                  <img src={avatar} alt={nickname} />
                </div>
                <div className="Post-user-nickname">
                  <span>{nickname}</span>
                </div>
                <div className="heart"><span><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg></button></span></div>
                <div className="likes"><span>{numLikes} likes</span></div>
                <div className="flag"><button><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
</svg></span></button></div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
                <img alt="img" src={image} />
              </div>
            </div>
            <div className="Post-caption">
              <ul>{comm}</ul>
            </div>
          </article>
        );
        }
    }
    export default Post;