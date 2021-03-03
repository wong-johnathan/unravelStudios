import Inputs from "components/Inputs";
import SearchText from "components/SearchText";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "store/actions/category";
import { fetchPublicProducts } from "store/actions/product";
import Pagination from "./Pagination";

const Search = ({ history, location }) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState();
  const [search, setSearch] = useState();
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [limit, setLimit] = useState(3);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [page, setPage] = useState(1);

  const categories = useSelector(({ category }) => category);
  const { count } = useSelector(({ product }) => product);

  useEffect(() => categories.length === 0 && dispatch(fetchCategories()), [dispatch,categories]);
  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true, charset: "utf-8", decoder: (c) => c });
    const { sortBy, search, category, order, minPrice, maxPrice, page } = query;
    setSortBy(sortBy === "latest" ? "latest" : order);
    setSearch(search);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setCheckedCategory(category ? category.split(",") : []);
    setLimit(limit);
    if (page) setPage(page);
  }, [location.search,limit]);

  useEffect(() => {
    let query = [];
    if (sortBy === "latest") query.push(`sortBy=latest`);
    else if (sortBy === "asc" || sortBy === "desc") query = [...query, "sortBy=price", `order=${sortBy}`];
    if (search) query.push(`search=${search}`);
    if (checkedCategory.length > 0) query.push(`category=${checkedCategory.join(",")}`);
    if (minPrice) query.push(`minPrice=${minPrice}`);
    if (maxPrice) query.push(`maxPrice=${maxPrice}`);
    if (limit) query.push(`limit=${limit}`);
    if (page > 1) query.push(`page=${page}`);
    if (query.length > 0) history.push(`?${query.join("&")}`);
    dispatch(fetchPublicProducts(query.length > 0 ? `${query.join("&")}` : ""));
  }, [sortBy, search, checkedCategory, minPrice, maxPrice, limit, page,dispatch,history]);

  const onSetPage = (set) => {
    if (set === -1 && page > 1) setPage(page - 1);
    else if (set === 1 && page < Math.ceil(count / limit)) setPage(page + 1);
  };

  // const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true, charset: "utf-8", decoder: (c) => c });
  return (
    <>
      <Row>
        <Col xs='auto' className='align-self-center mb-2'>
          Sort By
        </Col>
        <Col xs='12' md='auto' className='mb-2'>
          <Button outline={sortBy !== "latest"} block color='primary' onClick={() => setSortBy("latest")}>
            Latest
          </Button>
        </Col>
        <Col xs='12' md='auto' className='mb-2'>
          <Button outline={sortBy !== "asc"} block color='primary' onClick={() => setSortBy("asc")}>
            Price: Low to High
          </Button>
        </Col>
        <Col xs='12' md='auto' className='mb-2'>
          <Button outline={sortBy !== "desc"} block color='primary' onClick={() => setSortBy("desc")}>
            Price: High to Low
          </Button>
        </Col>
        <Col className='mb-2'>
          <SearchText search={search} updateSearch={setSearch} />
        </Col>
      </Row>
      <Row>
        <Col xs='3'>
          <Inputs type='number' value={minPrice} label='Min Price' updateState={(e) => setMinPrice(e.target.value)} />
        </Col>
        <Col xs='3'>
          <Inputs type='text' value={maxPrice} label='Max Price' updateState={(e) => setMaxPrice(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Inputs
            type='checkbox'
            value={checkedCategory}
            updateState={(e) => setCheckedCategory(e.target.value)}
            label='Categories'
            options={categories.map(({ _id, name }) => ({ id: _id, text: `${name}` }))}
          />
        </Col>
        <Col className='ml-auto align-self-end' xs='12' md='3'>
          <Pagination setLimit={setLimit} limit={limit} count={count} page={page} setPage={onSetPage} />
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Search);
