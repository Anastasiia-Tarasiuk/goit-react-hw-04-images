import React, { Component } from "react";
import { apiSearch } from './services/API';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';
import { Modal } from "./Modal/Modal";
import { ErrorMsg } from "./Error/Error";

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
    error: null,
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
      console.log(this.state.searchValue)

      const msgForWrongSearch = `There is no match for "${this.state.searchValue}".`
      
      if (pictures.totalHits === 0) {
        this.setState({ error: msgForWrongSearch });
      } else {
        this.setState({ error: null });
      }
        
      if ((pictures.totalHits - this.state.pictures.length) > pictures.hits.length) {
        this.setState({ loadMore: true })
      } else {
        this.setState({ loadMore: false })
      }
        
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures.hits],
      }))    
      
    } catch (error) {
      const msgForApiBadRespond = "Something went wrong."
      this.setState({ error: msgForApiBadRespond });
      console.log(error);   

    } finally {
      this.setState({isLoading: false });
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
    const { isLoading, error, loadMore, showModal, alt, largeImg, pictures } = this.state;

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
        {error && <ErrorMsg msg={error} />}
        <ImageGallery items={pictures} onClick={this.toggleModal} />
        {isLoading &&
          < Loader />}
        {loadMore &&
          <Button onClick={this.handleLoadMore} />}  
        {showModal &&
          <Modal onClose={this.toggleModal} largeImg={largeImg} alt={alt}/>        
        }
      </div>
    )
  }

}

