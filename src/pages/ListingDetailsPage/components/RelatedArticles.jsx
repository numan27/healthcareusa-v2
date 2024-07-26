import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";
import {
  Box,
  GenericBadge,
  Typography,
} from "../../../components/GenericComponents";
import IMAGES from "../../../assets/images";
import { LoaderCenter } from "../../../assets/Loader";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../config";

const RelatedArticles = ({ postNumber }) => {
  const [relatedBlogsData, setRelatedBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

        setRelatedBlogsData(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNavigate = (id) => {
    navigate(`${PATH.BLOGS}/${id}`);
  };

  return (
    <div>
      <div className="my-5">
        <Typography
          as="h1"
          className="mb-0"
          color="#23262F"
          size="24px"
          lineHeight="36px"
          weight="700"
        >
          Related articles
        </Typography>

        <Suspense fallback={<LoaderCenter />}>
          {loading ? (
            <LoaderCenter />
          ) : (
            <>
              {relatedBlogsData.slice(0, postNumber).map((items, index) => (
                // {relatedBlogsData.map((items, index) => (
                <Box
                  onClick={() => handleNavigate(items.id)}
                  key={index}
                  className="blog-shadow mt-4 cursor-pointer w-100"
                  radius="8px"
                  // maxHeight="290px"
                >
                  <Row className="d-flex">
                    <Col
                      style={{ maxHeight: "290px" }}
                      md={5}
                      className="position-relative h-100"
                    >
                      <img
                        style={{
                          maxHeight: "100%",
                          objectFit: "cover",
                          height: "290px",
                        }}
                        className="img-fluid related-blog-img w-100"
                        src={items.blogImg}
                        alt=""
                      />
                      <span
                        className="position-absolute"
                        style={{ left: "40px", top: "25px" }}
                      >
                        <GenericBadge
                          className="text-capitalize"
                          text={items.tagText}
                          background="#b6b6b6"
                          color="#fff"
                          weight="500"
                          size="16px"
                          borderColor="transparent"
                        />
                      </span>
                    </Col>

                    <Col
                      md={7}
                      className="d-flex flex-column justify-content-around ps-4 py-3"
                    >
                      <Typography
                        as="h2"
                        className="mb-0"
                        color="#23262F"
                        size="20px"
                        lineHeight="28px"
                        weight="700"
                      >
                        {items.blogTitle}
                      </Typography>

                      <div className="d-flex align-items-center gap-2 mt-3 mt-xxl-0">
                        <img
                          width={65}
                          height={65}
                          src={items.authorImg}
                          alt=""
                        />
                        <div>
                          <Typography
                            as="h4"
                            className="mb-0"
                            color="#23262F"
                            size="16px"
                            lineHeight="28.8px"
                            weight="600"
                          >
                            {items.authorName}
                          </Typography>
                          <Typography
                            as="h4"
                            className="mb-0"
                            color="#64666C"
                            size="14px"
                            lineHeight="25.2px"
                            weight="600"
                          >
                            {items.date} <GoDotFill size={10} color="#64666C" />{" "}
                            {items.lastSeen}
                          </Typography>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Box>
              ))}
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default RelatedArticles;
