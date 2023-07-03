import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './Services/api';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImagesWithQuery = async (query, page) => {
    setIsLoading(true);

    try {
      const newImages = await fetchImages(query, page);
      if (newImages.length === 0) {
        Notiflix.Notify.info('No more images to load.');
        setIsLoading(false);
      } else {
        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
        setPage(page);
      }
    } catch (error) {
      console.log('Error fetching images:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    fetchImagesWithQuery(query, 1);
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    fetchImagesWithQuery(searchQuery, nextPage);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        handleCloseModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && <Button onLoadMore={loadMoreImages} />}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </Container>
  );
};
