import React, { Component } from 'react';
import Unsplash , {toJson} from 'unsplash-js';
import './css/style.css';
import './css/style_1000.css';
import './css/style_800.css';
import './css/style_600.css';
import './css/style_400.css';
import REACT_UNSPLASH_API_KEY from './api_key.js';
import REACT_UNSPLASH_API_SECRET from './api_secret.js';

const unsplash = new Unsplash({
  applicationId: REACT_UNSPLASH_API_KEY,
  secret: REACT_UNSPLASH_API_SECRET
});

class App extends Component {

  constructor(){
    super();
    this.state={
      searchValue: '',
      loading:false,
      error:false,
      images: [],
      selectedImage: ''
    };
  }

  valueChanged(event){
    this.setState({
      searchValue: event.target.value
    })
  }

  searchValueApplied(event){
    event.preventDefault();
    this.setState({
      loading:true,
      error:false,
      images:[],
      selectedImage:''
    });
    unsplash.search.photos( this.state.searchValue, 1, 100)
      .then(toJson)
      .then(json => {
          this.setState({
            loading:false,
            images:json.results,
            selectedImage: ( <img id="images" 
          alt={json.results[0].description} 
          src={json.results[0].urls.regular} 
          key={json.results[0].id}/>)
          })
      })
      .catch(err => {
          this.setState({
            loading:false,
            error:true
          })
      });
  }

  changeMainImage = img => {
      this.setState({
        selectedImage: (<img id="images" 
          alt={img.target.alt} 
          src={img.target.src} 
          key={img.target.id}/>)
      });
  }

  render() {
    const imgs = [];
    const {searchValue, loading, error, images, selectedImage} = this.state;

    this.state.images.forEach(img=>{
      imgs.push(
          <img id="images" 
          alt={img.description} 
          src={img.urls.regular} 
          key={img.id}
          onClick={this.changeMainImage}/>
          )
    })

    return (
      <div className = "wrapper">
        <div className = "inputField">
          <form onSubmit={(event) => this.searchValueApplied(event)}>
            <input 
            onChange={(event)=>this.valueChanged(event)}
            value = {searchValue}
            type="text" 
            name="Search"
            placeholder="Input search term..."/>
          <button
            id="button" 
            type="submit" 
            value="submit">Search</button>
          </form>
        </div>
        <div className="imageGrid">
            {loading ? <img id="loading" alt="Loading..." src="https://www.zaggle.in/images/loading-951c2859d33608ef454e3bcb3e0d50b2.gif"/> : ""}
            {error ? <h2>No Images Were Found</h2> : ""}
            {images.length > 0 ?  
              <div>
                <div className="picture-Big">
                  <div id="picture-holder">
                  {selectedImage}
                  </div>
                </div>
                <ul className="bottom-grid">
                  <div id="slider">
                    {imgs}
                  </div>
                </ul>
              </div> : ""}
        </div>
        <div className="queries">
        </div>
      </div>
    );
  }
}

export default App;
