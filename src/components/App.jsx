import React, { Component } from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { apiSearch } from './services/API';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';

export class App extends Component {

  state = {
    searchValue: '',
    pictures: [],
    isLoading: false,
  }

  picturesForRender = async (searchValue) => {
    this.setState({ isLoading: true });
    try {
      const pictures = await apiSearch(searchValue);
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures.hits],
        isLoading: false,  
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
        {this.state.isLoading && < Loader />}
        <ImageGallery items={this.state.pictures} />
        {this.state.pictures.length > 0 &&
          <Button onClick={this.picturesForRender} />}
        
      </div>
    )
  }

}

