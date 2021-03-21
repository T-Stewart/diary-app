import React from 'react';
import axios from 'axios';
export default class Edit extends React.Component {

    constructor(){
        super()
        this.state = {
            updateTitle: '',
            updateEntry: ''
        }
    }

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
              this.getBlogPost();
          })
          .catch(() => {
              console.log('Error')
          });
      };

      handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };

      resetUserInputs = () => {
    this.setState({
       title: '',
       entry: ''
     });
   };

    render () {
        return (
            <div>
               <div className="edit-container" id="edit-posts">
                        <h4 className="opinion-header"> Edit your post below... </h4>
                        <form className="form-area" onSubmit={this.save}>        
                            <input id="edit-thought" className="edit-opinion-area" type="text" value={this.state.updateTitle} onChange={this.handleChange} name="updateThought"/>
                            <textarea
                            name="updateOpinion"
                            placeholder="Change Your mind"
                            className="edit-opinion-area"
                            maxLength="150"
                            value={this.state.updateEntry}
                            onChange={this.handleChange}>
                            </textarea>
                            <div className="return-btns">
                                <input  className="submit-btn" type="submit" value="Submit"/> 
                                <input className="cancel-btn" type="submit" value="Cancel" onSubmit={this.cancelUpdate}></input>   
                            </div>          
                        </form>
                </div>     
            </div>
        )
    }
}