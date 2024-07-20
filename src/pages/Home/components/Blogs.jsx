import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { Card, Container } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import {
  Box,
  GenericBadge,
  GenericButton,
  Typography,
} from "../../../components/GenericComponents";
import IMAGES from "../../../assets/images";
import { PATH } from "../../../config";
import { LoaderCenter } from "../../../assets/Loader";

const Blogs = ({
  postNumber,
  onHomePage,
  centeredTitle,
  onDetailPage,
  isTitleBlack,
}) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postUrl = "https://jsappone.demowp.io/wp-json/wp/v2/posts?_embed";
      const tagsUrl = "https://jsappone.demowp.io/wp-json/wp/v2/tags";

      try {
        const [postsResponse, tagsResponse] = await Promise.all([
          axios.get(postUrl),
          axios.get(tagsUrl),
        ]);

        const posts = postsResponse.data.map((post) => {
          const tags = post.tags.map((tagId) => {
            const tag = tagsResponse.data.find((tag) => tag.id === tagId);
            return tag ? tag.name : "";
          });

          return {
            id: post.id,
            blogImg:
              (post._embedded &&
                post._embedded["wp:featuredmedia"] &&
                post._embedded["wp:featuredmedia"][0].source_url) ||
              IMAGES.RELATED_BLOG_IMG,
            tagText: tags.join(", "),
            blogTitle: post.title.rendered,
            authorImg: IMAGES.RELATED_BLOG_PROFILE,
            authorName: post.author,
            date: new Date(post.date).toDateString(),
            lastSeen: "6 min read",
          };
        });

        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNavigateBlogs = () => {
    navigate(PATH.BLOGS);
  };

  const handleNavigate = (id) => {
    navigate(`${PATH.BLOGS}/${id}`);
  };

  return (
    <Suspense fallback={<LoaderCenter />}>
      {loading ? (
        <LoaderCenter />
      ) : (
        <Box
          background={onDetailPage ? "" : "#00C1B6"}
          className="w-100 py-5 blogs-box"
        >
          <Container className="pt-2">
            <div
              className={`d-flex flex-md-row flex-column align-items-center justify-content-${
                centeredTitle ? "center" : "between"
              } mb-md-0 mb-4`}
            >
              <Typography
                className="mobile-text-center"
                as="h3"
                size="32px"
                color={isTitleBlack ? "#000" : "#fff"}
                lineHeight="48px"
                weight="700"
              >
                Trending Topics in Healthcare
              </Typography>

              {onHomePage && (
                <GenericButton
                  onClick={handleNavigateBlogs}
                  className="blogs-cta transition-2"
                  color="#fff"
                  size="16px"
                  weight="700"
                  hoverBgColor="transparent"
                  hoverColor="#122A41"
                >
                  See All Articles{" "}
                  <FaArrowRight
                    className="blogs-arrow transition-2"
                    color="#fff"
                  />
                </GenericButton>
              )}
            </div>

            <div className="blogs-grid pb-4 mt-2 pt-2">
              {posts.slice(0, postNumber).map((post) => (
                <Card
                  onClick={() => handleNavigate(post.id)}
                  className="custom-shadow border-0 cursor-pointer blog-card"
                  key={post.id}
                >
                  <Card.Img
                    className="max-h-75 h-50"
                    variant="top"
                    src={post.blogImg}
                  />
                  <Box
                    className="d-flex flex-column justify-content-between w-100 h-100"
                    padding="30px 35px"
                  >
                    <div>
                      <GenericBadge text={post.tagText} />
                    </div>
                    <div className="my-2 py-1">
                      <Typography
                        className="mb-0"
                        as="h4"
                        color="#121212"
                        weight="700"
                        size="26x"
                        lineHeight="30px"
                      >
                        {post.blogTitle}
                      </Typography>
                    </div>

                    <div className="d-flex align-items-center gap-4">
                      <Typography
                        className="mb-0"
                        as="p"
                        color="#122A41"
                        weight="400"
                        size="16px"
                        lineHeight="26px"
                      >
                        <span style={{ color: "#BBB6B6" }}>by</span>{" "}
                        {post.author}
                      </Typography>

                      <div className="d-flex align-items-center gap-2">
                        <CiCalendar color="#122A41" size={23} />
                        <Typography
                          className="mb-0"
                          as="p"
                          color="#122A41"
                          weight="400"
                          size="16px"
                          lineHeight="26px"
                        >
                          {new Date(post.date).toDateString()}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </Card>
              ))}
            </div>
          </Container>
        </Box>
      )}
    </Suspense>
  );
};

Blogs.propTypes = {
  postNumber: PropTypes.number,
  onHomePage: PropTypes.bool,
  onDetailPage: PropTypes.bool,
  centeredTitle: PropTypes.bool,
  isTitleBlack: PropTypes.bool,
};

Blogs.defaultProps = {
  postNumber: 3,
  onHomePage: true,
  centeredTitle: false,
  onDetailPage: false,
  isTitleBlack: false,
};

export default Blogs;
