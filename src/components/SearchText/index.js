import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

const SearchText = ({ search='', updateSearch }) => {
  return (
    <div>
      <InputGroup>
        <Input type='text' value={search} onChange={(e) => updateSearch(e.target.value)} placeholder='Search' />
        <InputGroupAddon addonType='append'>
          <Button color='primary'>
            <FontAwesomeIcon icon={faSearch} className='mr-2' /> Search
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SearchText;
