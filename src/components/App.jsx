import React, { Component } from "react";
import { apiSearch } from './services/API';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';


export class App extends Component {

  state = {
    searchValue: '',
    id: '',
    webformatURL: '',
    largeImageURL: '',
    pictures: [],
  }

  picturesForRender = async (searchValue) => {
    try {
      const pictures = await apiSearch(searchValue);
      this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures.hits]
        }))
        // console.log(pictures);      
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
        <ImageGallery items={this.state.pictures} />
      </div>
    )
  }

}

