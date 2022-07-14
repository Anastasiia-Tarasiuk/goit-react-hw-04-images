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
    isLoading: false,
    page: 1,
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({
        isLoading: true,
        pictures: [],
        page: 1,
      });
      this.apiResponse(this.state.page);
    }

    if (prevState.page !== this.state.page) {
      this.setState({
        isLoading: true,
      });
      this.apiResponse(this.state.page);
    }
  }

  apiResponse = async (page) => {
    try {
        const pictures = await apiSearch(this.state.searchValue, page);
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures.hits],
          isLoading: false,  
        }))      
      } catch (error) {
        console.log(error);   
      }
  }

  getItems = (searchValue) => {
    this.setState({
      searchValue,
    });
  }

  handleLoadMore = () => {
    this.setState( prevState => ({
      page: prevState.page + 1,
    }))
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
        <Searchbar onSubmit={this.getItems} />
        <ImageGallery items={this.state.pictures} />
        {this.state.isLoading &&
          < Loader />}
        {this.state.pictures.length > 0 &&
          <Button onClick={this.handleLoadMore} />}        
      </div>
    )
  }

}

