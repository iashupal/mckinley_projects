import React, { Component, Fragment } from "react";

import HeaderContext from "./../../context/HeaderContext";
import IllustrationMenu from "./IllustrationMenu";
import { Row, Col, Empty, Button } from "antd";
import IllustrationColumn from "./IllustrationColumn";
import "./Illustration.css";
import illustration from "../../utils/dummy/illustration";
import { illustrationAPI } from "../../services/ApiService";
import { USD } from "../../exchange";
import { Link } from "react-router-dom";
import Loader from "../../screens/Loader";

class Illustration extends Component {
  state = {
    data: [],
    loading: false
  };
  static contextType = HeaderContext;

  async componentDidMount() {
    this.context.headerNameHandler("Brandio");
    this.setState({ loading: true });
    const response = await illustrationAPI.userIllustration();
    if (response.status === 200) {
      this.setState({
        data: response.data.Data.illustProduct,
        loading: false
      });
    }
  }
  chunk(a, l) {
    return new Array(Math.ceil(a.length / l))
      .fill(0)
      .map((_, n) => a.slice(n * l, n * l + l));
  }

  render() {
    const { lng, i18n } = this.context;
    const illustrationsData = this.chunk(this.state.data, 4);
    return (
      <div className="div__sub div__sub__illustration_1">
        <div className="div__menu__product illustaration__main__list">
          <div className="illustaration__list">
            <div className="div__illustration__title">
              {i18n.t("brandioIllustration.illustrationList", {
                lng
              })}
            </div>
            <div>
              {this.state.loading ? (
                <Fragment>
                  <Loader />
                </Fragment>
              ) : (
                <Fragment>
                  {this.state.data.length > 0 ? (
                    <Fragment>
                      {illustrationsData.map(
                        (chunkedData, chunkedDataIndex) => {
                          return (
                            <Row
                              key={`chunkedData-${chunkedDataIndex}`}
                              gutter={48}
                              className="illustation__div"
                            >
                              {chunkedData.map(
                                (illustrationData, illustrationDataIndex) => {
                                  return (
                                    <Col
                                      key={`illustratipn-${chunkedDataIndex}-${illustrationDataIndex}`}
                                      lg={6}
                                      md={8}
                                      sm={12}
                                      xs={24}
                                    >
                                      <IllustrationColumn
                                        image={illustrationData.image}
                                        name={illustrationData.product_name}
                                        won={illustrationData.price}
                                        cumulativeSales={
                                          illustrationData.cumulative_sales
                                        }
                                        id={illustrationData.id}
                                      />
                                    </Col>
                                  );
                                }
                              )}
                            </Row>
                          );
                        }
                      )}
                    </Fragment>
                  ) : (
                    <div>
                      <Empty
                        style={{
                          width: "100%",
                          marginTop: "100px"
                        }}
                        description="You have not uploaded any artwork yet"
                      >
                        <Link to="/illustrations/new">
                          <Button
                            style={{
                              backgroundColor: "var(--han-purple)",
                              color: "white",
                              border: "none"
                            }}
                          >
                            Upload Illustration
                          </Button>
                        </Link>
                      </Empty>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Illustration;
