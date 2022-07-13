import React, { Component } from "react";
import { apiSearch } from './services/API';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';


export class App extends Component {

  state = {
    searchValue: '',
    pictures: [],
  }

  picturesForRender = async (searchValue) => {
    try {
      const pictures = await apiSearch(searchValue);
      this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures.hits]
        }))      
    } catch (error) {
      console.log(error);   
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.picturesForRender} />
        <Loader/>
        <ImageGallery items={this.state.pictures} />
        {this.state.pictures.length > 0 &&
          <Button onClick={this.picturesForRender} />}
        
      </div>
    )
  }

}

