import { useState, useEffect } from "react";
import { apiSearch } from './services/API';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';
import { Modal } from "./Modal/Modal";
import { ErrorMsg } from "./Error/Error";

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [alt, setAlt] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => { 
    
    if (searchValue === "") {
      return;
    }
    
    setIsLoading(true);
    apiResponse();

  
  }, [searchValue, page, apiResponse]);
  

  async function apiResponse() {
    try {
      if (searchValue !== "") {
        
        const picturesFromApi = await apiSearch(searchValue, page);
  
        const msgForWrongSearch = `There is no match for "${searchValue}".`
        
        if (picturesFromApi.totalHits === 0) {
          setError(msgForWrongSearch);
        } else {
          setError(null);
        }
          
        if ((picturesFromApi.totalHits - pictures.length) > picturesFromApi.hits.length) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }

        setPictures([...pictures, ...picturesFromApi.hits]);
        
      }
    } catch (error) {
      const msgForApiBadRespond = "Something went wrong.";
      setError(msgForApiBadRespond);
      console.log(error);   

    } finally {
      setIsLoading(false);
    }     
  }

  const toggleModal = (img, title) => {
    setShowModal(!showModal);
    setLargeImg(img);
    setAlt(title);
  }

  const getItems = (searchValue) => {
    setPictures([]);
    setPage(1);
    setSearchValue(searchValue);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
  }

  return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={getItems} />
        {error && <ErrorMsg msg={error} />}
        <ImageGallery items={pictures} onClick={toggleModal} />
        {isLoading &&
          < Loader />}
        {loadMore &&
          <Button onClick={handleLoadMore} />}  
        {showModal &&
          <Modal onClose={toggleModal} largeImg={largeImg} alt={alt}/>        
        }
      </div>
    )
  }


