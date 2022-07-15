import React, { Component } from "react";
import { apiSearch } from './services/API';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';
import { Modal } from "./Modal/Modal";

export class App extends Component {

  state = {
    searchValue: '',
    pictures: [],
    isLoading: false,
    page: 1,
    showModal: false,
    loadMore: false,
    largeImg: '',
    alt: '',
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({
        isLoading: true,
        pictures: [],
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

      if ((pictures.totalHits - this.state.pictures.length) > pictures.hits.length) {
        this.setState({ loadMore: true })
      } else {
        this.setState({ loadMore: false })
      }
        
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures.hits],
        isLoading: false,  
      }))      
    } catch (error) {
      console.log(error);   
    }     
  }

  toggleModal = (img, title) => {
      this.setState({      
        showModal: !this.state.showModal,
        largeImg: img,
        alt: title,
      })
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
        <ImageGallery items={this.state.pictures} onClick={this.toggleModal} />
        {this.state.isLoading &&
          < Loader />}
        {this.state.loadMore &&
          <Button onClick={this.handleLoadMore} />}  
        {this.state.showModal &&
          <Modal onClose={this.toggleModal} largeImg={this.state.largeImg} alt={this.state.alt}/>        
        }
      </div>
    )
  }

}

