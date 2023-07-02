import React, { Component } from 'react';

import {
  SearchBar,
  Form,
  Button,
  Input,
  ButtonLabel,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel></ButtonLabel>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </Form>
      </SearchBar>
    );
  }
}

export default Searchbar;
