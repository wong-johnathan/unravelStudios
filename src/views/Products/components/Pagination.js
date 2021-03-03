import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Input } from "reactstrap";

const Pagination = ({ setLimit, limit, page, count, setPage }) => {
  return (
    <>
      <div className='d-flex flex-row align-items-center'>
        <span style={{ fontSize: "0.75rem", wordBreak: "keep-all" }} className='text-muted m-0 mr-2'>
          Rows Per Page:
        </span>
        <Input className='m-0 p-1 mr-2' type='select' value={limit} onChange={(e) => setLimit(e.target.value)} style={{ fontSize: "0.75rem", maxWidth: "40px" }}>
          <option id='3'>3</option>
          <option id='6'>6</option>
          <option id='9'>9</option>
        </Input>
        <span style={{ fontSize: "0.75rem", wordBreak: "keep-all" }} className='text-muted m-0 mr-2'>
          {(page - 1) * limit + 1} - {page * limit} of {count}
        </span>
        <FontAwesomeIcon icon={faAngleLeft} color='muted' size='sm' className='mr-4 pointer' onClick={() => setPage(-1)} />
        <FontAwesomeIcon icon={faAngleRight} color='muted' size='sm' className='pointer' onClick={() => setPage(1)} />
      </div>
    </>
  );
};

export default Pagination;
