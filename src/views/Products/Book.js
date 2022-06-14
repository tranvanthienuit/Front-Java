import React, { Component } from "react";
import "./Book.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
import HomeHeader from "../Homepage/HomeHeader";
import {
  fetchDataFilter,
  getBookFilter,
  getCateBook,
} from "../../services/BookService";
import Footer from "../Homepage/Footer";
import Fade from "react-reveal/Fade";
import { formatPrice } from "../../constants/format";
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentPage: 0,
      numOfPage: 0,
      numofBooks: 0,
      allPrice: [],
      allAuthor: [],
      allPublish: [],
      selectedAuthor: "",
      selectedYearPublish: "",
      filterIns: true,
      windowWidth: window.innerWidth,
    };
  }
  checkScreen = () => {
    // this.setState({
    //   windowWidth: window.innerWidth,
    // });
    if (this.state.windowWidth > 768) {
      return true;
    } else {
      return false;
    }
  };
  getAllBooksByCate = async (categoryId, page) => {
    try {
      let res = await getCateBook(categoryId, page);
      //console.log(res);
      if (res) {
        let numOfPage = 0;
        if (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT === 0) {
          numOfPage = res.count / process.env.REACT_APP_PAGING_LIMIT_PRODUCT;
        } else {
          numOfPage =
            (res.count -
              (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT)) /
              process.env.REACT_APP_PAGING_LIMIT_PRODUCT +
            1;
        }
        this.setState({
          allBooks: res.bookList,
          numOfPage: numOfPage,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getAllBooksByCate(this.props.match.params.cateId, 0);
    this.getDataFilter();
  }
  componentDidUpdate(preProps) {
    if (preProps.match.params !== this.props.match.params) {
      this.getAllBooksByCate(this.props.match.params.cateId, 0);
    }
  }
  handleAddToCart = item => {
    this.props.addToCart(item);
  };
  handleChangePage = item => {
    this.getAllBooksByCate(this.props.match.params.cateId, item);
    this.setState({
      currentPage: item,
    });
  };
  getDataFilter = async () => {
    try {
      let res = await fetchDataFilter();
      this.setState({
        allPrice: res.gia,
        allAuthor: this.setSelectedAuthor(res.tacgia),
        allPublish: this.setSelectedAuthor(res.namsb),
      });
    } catch (e) {
      console.log(e);
    }
  };
  setSelectedAuthor = allAuthor => {
    let arrAuthor = [];
    for (let i = 0; i < allAuthor.length; i++) {
      let objectAuthor = {};
      objectAuthor.label = allAuthor[i];
      objectAuthor.value = allAuthor[i];
      arrAuthor.push(objectAuthor);
    }
    return arrAuthor;
  };
  handleDetailBook = item => {
    this.props.history.push(`/book/${item.bookId}`);
  };
  handleOnchangeSelectAuthor = async event => {
    let selectedAuthor = event.target.value;
    this.setState({
      selectedAuthor: selectedAuthor,
    });
    let data = {
      tacgia: selectedAuthor,
      namsb: this.state.selectedYearPublish,
      giathap: "",
      giacao: "",
      ma: this.state.filterIns,
    };
    console.log(data);
    try {
      let res = await getBookFilter(data, 0);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  handleOnchangeSelectYearchPublish = async event => {
    let selectedYearPublish = event.target.value;
    this.setState({
      selectedYearPublish: selectedYearPublish,
    });
    let data = {
      tacgia: this.state.selectedAuthor,
      namsb: selectedYearPublish,
      giathap: "",
      giacao: "",
      ma: this.state.filterIns,
    };
    console.log(data);
    try {
      let res = await getBookFilter(data, 0);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  handlefilterPriceIns = () => {
    this.setState({
      filterIns: true,
    });
  };
  handlefilterPriceDsc = () => {
    this.setState({
      filterIns: false,
    });
  };
  render() {
    let { numOfPage, currentPage, allBooks, allAuthor, allPublish } =
      this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    //console.log(this.state);
    return (
      <div className="product-container">
        <HomeHeader></HomeHeader>
        <div className="row">
          <div className="filter-container col-2 mt-3">
            <p style={{ textAlign: "center", fontSize: "20px" }}>
              Lọc sản phẩm
            </p>

            <div className="filter">
              <div className="all-availble-price mb-2">
                <div className="title-select">Giá: </div>
                <select
                  className="select-price mt-2"
                  // onChange={(event) =>
                  //   this.handleOnchangeSelect(event, "selectedPrice")
                  // }
                >
                  <option>giá</option>
                  <option>giá</option>
                  <option>giá</option>
                </select>
              </div>
              <hr className="my-4" />
              <div className="all-availble-price mb-2">
                <div className="title-select">Tác giả: </div>
                <select
                  className="select-price mt-2"
                  onChange={event => this.handleOnchangeSelectAuthor(event)}
                >
                  {allAuthor &&
                    allAuthor.length > 0 &&
                    allAuthor.map((item, index) => {
                      return (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
              <hr className="my-4" />

              <div className="all-availble-price mb-2">
                <div className="title-select">Năm xuất bản: </div>
                <select
                  className="select-price mt-2"
                  onChange={event =>
                    this.handleOnchangeSelectYearchPublish(event)
                  }
                >
                  {allPublish &&
                    allPublish.length > 0 &&
                    allPublish.map((item, index) => {
                      return (
                        <option value={item.value} key={index + 200}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
              <hr className="my-4" />
              <button
                className="btn btn-primary"
                onClick={() => this.handlefilterPriceIns()}
              >
                Giá tăng
              </button>
              <button
                className="btn btn-primary"
                onClick={() => this.handlefilterPriceDsc()}
              >
                Giá giảm
              </button>
            </div>
          </div>
          <div className="container d-flex justify-content-center mt-3 mb-3 col-9">
            <div className="row">
              {allBooks &&
                allBooks.length > 0 &&
                allBooks.map((item, index) => {
                  return (
                    <div className="col-md-4 mt-2" key={index}>
                      <Fade bottom delay={150}>
                        <div className="card" style={{ height: "500px" }}>
                          <div onClick={() => this.handleDetailBook(item)}>
                            <div className="card-body">
                              <div className="card-img-actions">
                                <img
                                  src={item.image}
                                  className="card-img img-fluid"
                                  width="96"
                                  height="200"
                                  alt="item.nameBook"
                                />
                              </div>
                            </div>
                            <div className="card-body bg-light text-center">
                              <div className="mb-2">
                                <a
                                  href="#"
                                  className="text-muted name"
                                  data-abc="true"
                                >
                                  {item.nameBook}
                                </a>
                              </div>
                              <div className="show">
                                {item.rating === 1 && (
                                  <div>
                                    <i className="fa fa-star star"></i>
                                  </div>
                                )}
                                {item.rating === 2 && (
                                  <div>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                  </div>
                                )}
                                {item.rating === 3 && (
                                  <div>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                  </div>
                                )}
                                {item.rating === 4 && (
                                  <div>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                  </div>
                                )}
                                {item.rating === 5 && (
                                  <div>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                    <i className="fa fa-star star"></i>
                                  </div>
                                )}
                                <div className="text-muted mb-3">
                                  {item.cmt} đánh giá
                                </div>
                              </div>
                            </div>
                          </div>
                          <Fade top delay={-200}>
                            <h3
                              className={
                                this.checkScreen()
                                  ? "hide price mb-0 font-weight-semibold"
                                  : "price mb-0 font-weight-semibold"
                              }
                            >
                              {formatPrice(item.price)}
                            </h3>
                            <button
                              type="button"
                              className={
                                this.checkScreen()
                                  ? "hide btn-add btn bg-cart"
                                  : "btn-add btn bg-cart"
                              }
                              onClick={() => this.handleAddToCart(item)}
                            >
                              <i className="fa fa-cart-plus mr-2"></i> Add to
                              cart
                            </button>
                          </Fade>
                        </div>
                      </Fade>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="pagination">
          <p>&laquo;</p>
          {arr &&
            arr.length &&
            arr.map((item, index) => {
              return (
                <p
                  onClick={() => this.handleChangePage(item)}
                  className={currentPage === item ? "active" : ""}
                  key={index}
                >
                  {item}
                </p>
              );
            })}
          <p>&raquo;</p>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => dispatch(addToCart(item)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Book));
