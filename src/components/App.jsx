import { useState, useEffect } from "react";
import { apiSearch, initials } from './services/API';
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
      const msgForEmptySearch = "Type something.";
      setError(msgForEmptySearch);
      setLoadMore(false);
      return;
    }
    
    setError(null);
    setIsLoading(true);

    apiSearch(searchValue, page)
      .then(picturesFromApi => {
        const msgForWrongSearch = `There is no match for "${searchValue}".`
        
        if (picturesFromApi.totalHits === 0) {
          setError(msgForWrongSearch);
        } else {
          setError(null);
        }
        
        if (picturesFromApi.totalHits - initials.PER_PAGE*(page - 1) > initials.PER_PAGE) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }

        setPictures(prevPictures => [...prevPictures, ...picturesFromApi.hits]); 
      })
      .catch(error => {
        const msgForApiBadRespond = "Something went wrong.";
        setError(msgForApiBadRespond);
        console.log(error); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  
  }, [searchValue, page]);
  
  const toggleModal = (img, title) => {
    setShowModal(!showModal);
    setLargeImg(img);
    setAlt(title);
  }

  const getItems = (query) => {
    if (searchValue !== query) {
      setPictures([]);
      setPage(1);
      setSearchValue(query);
    }
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


