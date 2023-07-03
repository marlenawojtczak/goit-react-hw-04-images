import React, { useState } from 'react';

import {
  SearchBar,
  Form,
  Button,
  Input,
  ButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('')

const handleChange = e => {
  setQuery(e.target.value)
}
 
const handleSubmit = e => {
  e.preventDefault();
  onSubmit(query);
  setQuery('')
}

    return (
      <SearchBar>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <ButtonLabel></ButtonLabel>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </Form>
      </SearchBar>
    );
  }