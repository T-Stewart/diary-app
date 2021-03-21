import React from 'react';
import axios from 'axios';
import Edit from '../Edit/Edit';
import './Post.css'

export default class Post extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            entry: '',
            posts: [],
            id: '',
            singlePost: [],
            updateTitle: '',
            updateEntry: '',
            expandTitle:'',
            expandEntry:'',
            isInEditMode: false,
            showing: false
        }
    };

    componentDidMount = () => {
        this.getPost();
    };

    getPost = () => {
        axios.get('/api/posts')
        .then((response) => {
            const data = response.data
            this.setState({posts: data})
        })
        .catch(() => {
            console.log('error')
        })
    };

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };

    submit = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.title,
            entry: this.state.entry
        };

        axios ({
            url: '/api/posts',
            method: 'POST',
            data: post
        })
        .then (() => {
            console.log('Data has been sent to the server')
        })
        .finally(() => {
            this.resetUserInputs();
            this.getPost();
            this.displayPosts(this.state.posts);
        })
        .catch(() => {
            console.log('Error')
        });
    };

    delete = (e) => {
          e.preventDefault()
          const post_id = {
              id: e.target.dataset.id
          }
          axios({
              url: '/api/posts/delete',
              method: 'POST',
              data: post_id
          })
          .then(() => {
              console.log('Data has been deleted')
          })
          .finally(() => {
              this.getPost();
              this.displayPosts(this.state.posts)
          })
          .catch(() => {
              console.log('Error')
          });
    };

    update = (e) => {
        e.preventDefault();
        this.setState({isInEditMode: true})
        const post_id = {
            id: e.target.dataset.id
        } 
        axios ({
            url: '/api/posts/retrieve',
            method:'POST',
            data: post_id
        }) 
        .then((response) => {
            this.setState({updateTitle: response.data.title, updateEntry: response.data.entry, updateID: response.data._id})
        })
        .catch(() => {
            console.log('Error')
        });
    };

    save = (e) => {
          e.preventDefault();
          this.setState({isInEditMode: false})
          const post = {
              title: this.state.updateTitle,
              entry: this.state.updateEntry,
              
            }
          axios({
              url: '/api/posts/update',
              method: 'POST',
              data: post
          })
          .then((response) =>{
              console.log(response.data)
          })
          .finally(() => {
              this.resetUserInputs();
              this.getPost();
          })
          .catch(() => {
              console.log('Error')
          });
    };

    cancelUpdate = (e) => {
        e.preventDefault();
        this.setState({isInEditMode: false})
    };

    expand = (e) => {
        e.preventDefault();
        this.setState({isInEditMode: true})
        const post_id = {
            id: e.target.dataset.id
        } 
        axios ({
            url: '/api/posts/retrieve',
            method:'POST',
            data: post_id
        }) 
        .then((response) => {
            this.setState({showing: true, expandTitle: response.data.title, expandEntry: response.data.entry})
            this.fullPost()
        })
        .catch(() => {
            console.log('Error')
        });
      };

    resetUserInputs = () => {
    this.setState({
       title: '',
       entry: ''
     });
   };

   displayPosts =(posts) => {      
       if (!posts.length) return 
       return posts.map((post, index) => (
           <div>
            <div key={post._id} className="post">
                    <h4 className="post-return" id="thought">{post.title}</h4>
                    <p className="post-return">{post.entry.substring(0,30) + ' ...'}</p>    
                </div>
                <div key={post._id+1} className="return-btns">
                    <form data-id={post._id} onSubmit={ this.delete }>
                        <input className="delete-btn" type="submit" value="Delete"/>
                    </form>
                    <form data-id={post._id} onSubmit={ this.update}>
                        <input className="edit-btn" type="submit" value="Edit"/>
                    </form>
                    <form data-id={post._id} onSubmit={ this.expand}>
                        <input className="expand-btn" type="submit" value="Expand"/>
                    </form>
                    </div>  
            </div>
       ));
   };


    fullPost = () => {
        if (this.state.showing === true){
        return (
            <div>
                <div  className="post-full">
                        <h4 className="post-return" id="thought">{this.state.expandTitle}</h4>
                        <p className="post-return">{this.state.expandEntry}</p>    
                    </div>
                    <div className="return-btns">
                    <span className="close" onClick={() => this.setState({showing: false})}>&times;</span>
                        </div>  
                </div>
            )
        };
    };



    render() {
        return (
            <div className="post-page" data-testid="post-page-test">  
                <div className="container">
                    <form className="form-area" onSubmit={this.submit}>
                        <input type="text" name="title" value={this.state.title}
                        onChange={this.handleChange} placeholder="title"/>
                    <textarea
                        className="opinion-area"
                        name="entry"
                        placeholder="What do you have to say for yourself"
                        cols="30"
                        rows="3"
                        value={this.state.entry}
                        onChange={this.handleChange}>
                    </textarea>                     
                    <input className="submit-btn" type= "submit" value="Submit"/>
                    </form>
                </div>
                { this.state.isInEditMode === false || this.state.showing === true ? null   : 
                        <div className="edit-container" id="edit-posts">
                            <h4 className="opinion-header"> Edit your post below... </h4>
                            <form className="form-area" onSubmit={this.save}>        
                                <input id="edit-thought" className="edit-opinion-area" type="text" value={this.state.updateTitle} onChange={this.handleChange} name="updateTitle"/>
                                <textarea
                                name="updateEntry"
                                placeholder="Change Your mind"
                                className="edit-opinion-area"
                                value={this.state.updateEntry}
                                onChange={this.handleChange}>
                                </textarea>
                                <div className="return-btns">
                                    <input  className="submit-btn" type="submit" value="Submit"/> 
                                    <input className="cancel-btn" type="submit" value="Cancel" onSubmit={this.cancelUpdate}></input>   
                                </div>          
                            </form>
                        </div> 
                        } 
                <div className="post-wrapper">
                    {this.state.showing === true ? this.fullPost(this.state.posts) : this.displayPosts(this.state.posts)}     
                    </div>
            </div>
        )
    }
}