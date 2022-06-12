import React, { Component } from "react";
import "./Search.scss";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
import Fade from "react-reveal/Fade";
import Footer from "../Homepage/Footer";
import HomeHeader from "../Homepage/HomeHeader";
import { formatPrice } from "../../constants/format";
class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
    };
  }

  componentDidMount() {}
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  render() {
    let { searchBooks } = this.props;
    return (
      <div className="search container-fluid">
        <HomeHeader />
        <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
          Kết quả tìm kiếm
        </h2>
        <div className="container d-flex justify-content-center mt-3 mb-3">
          <div className="row">
            {searchBooks &&
              searchBooks.length > 0 &&
              searchBooks.map((item, index) => {
                return (
                  <div className="col-md-3 mt-2" key={index}>
                    <Fade bottom delay={150}>
                      <div className="card">
                        <div onClick={() => this.handleDetailBook(item)}>
                          <div className="card-body">
                            <div className="card-img-actions">
                              <img
                                src={item.image}
                                className="card-img img-fluid"
                                width="96"
                                height="350"
                                alt="item.nameBook"
                              />
                            </div>
                          </div>
                          <div className="card-body show bg-light text-center">
                            <div className="mb-2">
                              <a
                                href="#"
                                className="text-muted name"
                                data-abc="true"
                              >
                                {item.nameBook}
                              </a>
                            </div>

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
                        <Fade top delay={-200}>
                          <h3 className="hide mb-0 font-weight-semibold">
                            {formatPrice(item.price)}
                          </h3>
                          <button
                            type="button"
                            className="hide btn bg-cart"
                            onClick={() => this.handleAddToCart(item)}
                          >
                            <i className="fa fa-cart-plus mr-2"></i> Add to cart
                          </button>
                        </Fade>
                      </div>
                    </Fade>
                  </div>
                );
              })}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    searchBooks: state.books.searchBook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SectionProduct)
);