import { useEffect, useState, Suspense } from "react";
import { Col, Row } from "react-bootstrap";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "../../../components/GenericComponents";
import ExploreMoreModal from "./ExploreMoreModal";
import { PATH } from "../../../config";
import IMAGES from "../../../assets/images";
import { LoaderCenter } from "../../../assets/Loader";
import SearchForm from "./SearchForm";

const Hero = () => {
  const [exploreModalState, setExploreModalState] = useState(false);
  const [listings, setListings] = useState([]);
  const [groupedListings, setGroupedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exploreModalItems, setExploreModalItems] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/archive/${item.slug}`, { state: { selectedItem: item } });
  };

  const OpenModal = (heading, items) => {
    setExploreModalState(true);
    setExploreModalItems({ heading, items });
  };

  const CloseModal = () => {
    setExploreModalState(false);
  };

  useEffect(() => {
    const fetchPosts = async (perPage) => {
      let url = `https://jsappone.demowp.io/wp-json/wp/v2/service?per_page=${perPage}`;
      try {
        const response = await axios.get(url);
        const data = response.data.map((item) => ({
          ...item,
          name: item.name.replace(/&amp;/g, "&"),
        }));
        setListings(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(100);
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      const headings = listings.filter((item) => item.parent === 0);
      const grouped = headings.map((heading) => ({
        heading,
        items: listings.filter((item) => item.parent === heading.id),
      }));
      setGroupedListings(grouped);
    }
  }, [listings]);

  const renderItemsInColumns = (items) => {
    const columns = [[], [], [], []];
    items.forEach((item, index) => {
      columns[index % 4].push(item);
    });
    return columns;
  };

  const order = [
    { name: "HEALTH INSURANCE", icon: IMAGES.CATEGORY_ICON_1 },
    { name: "GOVERNMENT RESOURCES", icon: IMAGES.PRODUCTS_SERVICES_ICON },
    { name: "Providers", icon: IMAGES.CATEGORY_ICON_7 },
    { name: "MENTAL HEALTH", icon: IMAGES.CATEGORY_ICON_6 },
    { name: "PCA REHAB AND LEGAL", icon: IMAGES.CATEGORY_ICON_5 },
    { name: "FACILITIES AND TESTING", icon: IMAGES.CATEGORY_ICON_3 },
    { name: "PRODUCTS AND SERVICES", icon: IMAGES.PRODUCTS_SERVICES_ICON },
    { name: "FITNESS AND SELF CARE", icon: IMAGES.CATEGORY_ICON_7 },
    { name: "Dentist", icon: IMAGES.CATEGORY_ICON_7 },
  ];

  const sortGroupedListings = (groupedListings) => {
    return groupedListings.sort((a, b) => {
      const indexA = order.findIndex((o) => o.name === a.heading.name);
      const indexB = order.findIndex((o) => o.name === b.heading.name);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  };

  return (
    <div className="position-relative">
      <div className="hero">
        <Box className="hero-content d-flex flex-column align-items-center h-100 w-100 py-5 px-lg-0 px-3">
          <div className="py-sm-5 mt-md-5">
            <div className="mx-auto">
              <div>
                <Typography
                  lineHeight="55px"
                  align="center"
                  className="mt-3 mb-0"
                  as="h1"
                  weight="800"
                  color="#fff"
                  size="40px"
                >
                  Your One Stop Resource Directory of Healthcare
                </Typography>
                <Typography
                  lineHeight="55px"
                  align="center"
                  className=""
                  as="h1"
                  weight="500"
                  color="#fff"
                  size="40px"
                >
                  Information & Services in The United States
                </Typography>
              </div>

              {/* Search bar */}
              <SearchForm />

              <Row className="mt-3">
                <Col className="mx-auto" md={6}>
                  <Box padding="12px" className="bg-white rounded-5 w-100">
                    <Typography
                      lineHeight="21px"
                      align="center"
                      className="mb-0"
                      as="p"
                      color="#23262F"
                      size="14px"
                    >
                      <span className="fw-bold">Over 2.5 million</span>{" "}
                      healthcare providers and services. . & growing
                    </Typography>
                  </Box>
                </Col>
              </Row>
            </div>
          </div>
        </Box>
      </div>

      <div
        id="service-section"
        className="service-section container-xl mt-xxl-0 mt-xl-5 mt-0 container-fluid pt-5"
      >
        <Box
          width="100"
          className="custom-shadow-services mobile-padding bg-white position-relative mt-5"
          padding="30px 25px"
          radius="24px"
        >
          <Suspense fallback={<LoaderCenter />}>
            {loading ? (
              <LoaderCenter />
            ) : (
              <div className="service-grid w-100">
                {sortGroupedListings(groupedListings).map(
                  (group, groupIndex) => {
                    const IconComponent = order.find(
                      (o) => o.name === group.heading.name
                    )?.icon;
                    return (
                      <Box
                        key={groupIndex}
                        style={{minHeight: "270px"}}
                        width="100"
                        className="service-box transition-2 rounded-3"
                        border="1px solid #99B8B6"
                        padding="25px 20px 25px 25px"
                      >
                        <div className="d-flex align-items-center gap-2">
                          {IconComponent && (
                            <img
                              width={27}
                              src={IconComponent}
                              alt={`${group.heading.name} icon`}
                            />
                          )}
                          <Typography
                            className="mb-0 text-nowrap text-uppercase"
                            align="center"
                            as="h3"
                            weight="700"
                            size="16px"
                            color="#333333"
                          >
                            {group.heading.name}
                          </Typography>
                        </div>

                        <div className="columns-container mt-2">
                          {renderItemsInColumns(group.items.slice(0, 4)).map(
                            (column, columnIndex) => (
                              <ul className="list-unstyled" key={columnIndex}>
                                {column.map((item, itemIndex) => (
                                  <li className="mb-2" key={itemIndex}>
                                    <span
                                      className="text-decoration-none service-item transition-2"
                                      onClick={() => handleNavigate(item)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {item.name}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )
                          )}
                        </div>

                        {group.items.length > 4 && (
                          <Link
                            onClick={() =>
                              OpenModal(group.heading, group.items)
                            }
                            className="service-link"
                          >
                            Explore More{" "}
                            <FiChevronRight
                              className="transition-2"
                              size={18}
                              color="#6BE2C4"
                            />
                          </Link>
                        )}
                      </Box>
                    );
                  }
                )}
              </div>
            )}
          </Suspense>
          <Box
            style={{ top: "-35px" }}
            className="bg-white mx-auto px-3 position-absolute start-0 end-0"
            radius="16px 16px 0px 0px"
            height="40px"
          >
            <Typography
              className="mb-0 pt-1"
              align="center"
              as="h2"
              weight="600"
              size="24px"
              color="#23262F"
              lineHeight="36px"
            >
              Find All Services
            </Typography>
          </Box>
        </Box>
      </div>

      {exploreModalState && (
        <ExploreMoreModal
          show={exploreModalState}
          onHide={CloseModal}
          title="All Doctors"
          exploreModalItems={exploreModalItems}
        />
      )}
    </div>
  );
};

export default Hero;
