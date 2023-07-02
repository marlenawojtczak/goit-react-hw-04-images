import React, { Component } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './Services/api';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    selectedImage: null,
    isLoading: false,
  };

  fetchImagesWithQuery = async (query, page) => {
    this.setState({ isLoading: true });

    try {
      const newImages = await fetchImages(query, page);
      if (newImages.length === 0) {
        Notiflix.Notify.info('No more images to load.');
        this.setState({ isLoading: false });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          page: page,
        }));
      }
    } catch (error) {
      console.log('Error fetching images:', error);
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({ searchQuery: query, page: 1, images: [] }, () => {
      this.fetchImagesWithQuery(query, 1);
    });
  };

  loadMoreImages = () => {
    const { searchQuery, page } = this.state;
    const nextPage = page + 1;
    this.fetchImagesWithQuery(searchQuery, nextPage);
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.handleCloseModal();
    }
  };

  render() {
    const { images, selectedImage, isLoading } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onLoadMore={this.loadMoreImages} />}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.handleCloseModal} />
        )}
      </Container>
    );
  }
}
