import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";

const URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc&page=2";

import { GET } from "./api";
import axios from "axios";
export const Cards = () => {
  const [movieData, setMovieData] = useState([]);
  const [filter, setFiltered] = useState(movieData);

  useEffect(async () => {
    var data = await GET(URL);
    console.log(data?.data?.results);
    setMovieData(data?.data?.results);
    setFiltered(data?.data?.results);
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = movieData.filter((data) => {
      return data.title.search(value) != -1  ;
    });
    console.log(result)
    setFiltered(result);
  };
  const fetchData = async () => {
    var data = await GET(
      `https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc&page=${2}`
    );
    setMovieData(data?.data?.results);
    setFiltered(data?.data?.results);
  };

  return (
    <>
      <Container>
        <div>
          Search :<br />{" "}
          <Input
            bsSize="sm"
            style={{ width: "40%" }}
            onChange={(e) => handleSearch(e)}
            placeHolder="enter the movie name"
          ></Input>
        </div>
        <InfiniteScroll
          dataLength={filter.length}
          next={console.log}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <Row xs={3}>
            {filter &&
              filter.map((e) => {
                let url = `https://image.tmdb.org/t/p/original/${e.backdrop_path}`;
                return (
                  <Col sm={6} md={4} className="mt-3">
                    <Card>
                      <CardBody>
                        <CardImg top width="100%" src={url} alt="Card image cap" />
                        <CardTitle tag="h5">{e.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          <div>
                            <span>Movie Rating</span> : {e?.vote_average}
                            <br />
                            <span>Rating Count</span> : {e?.vote_count}
                            <br />
                            <span>Release Date</span> : {e?.release_date}
                            <br />
                          </div>
                        </CardSubtitle>
                        <CardText></CardText>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </InfiniteScroll>
      </Container>
    </>
  );
};
