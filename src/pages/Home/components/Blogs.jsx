import { useState, useEffect } from "react";
// import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { Card, Container } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci"
import { Box, GenericBadge, GenericButton, Typography } from "../../../components/GenericComponents"
import IMAGES from "../../../assets/images"
import axios from "axios";

const Blogs = () => {

    const [wpPosts, setWpPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const url = 'https://jsappone.demowp.io/wp-json/wp/v2/posts?_embed';
            try {
                const response = await axios.get(url);
                const posts = response.data.map(post => ({
                    id: post.id,
                    blogImg: post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url ||
                        IMAGES.RELATED_BLOG_IMG,
                    tagText: "Design",
                    blogTitle: post.title.rendered,
                    authorImg: IMAGES.RELATED_BLOG_PROFILE,
                    authorName: post.author,
                    date: new Date(post.date).toDateString(),
                    lastSeen: "6 min read",
                }));
                setWpPosts(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    console.warn("wpPosts", wpPosts);

    return (
        <Box background="#00C1B6" className="w-100 py-5">
            <Container className="pt-2">
                <div className="d-flex flex-md-row flex-column align-items-center justify-content-between mb-md-0 mb-4">
                    <Typography className="mobile-text-center" as="h3" size="32px" color="#fff" lineHeight="48px" weight="700">
                        Trending Topics in Healthcare
                    </Typography>

                    <GenericButton className="blogs-cta transition-2" color="#fff" size="16px" weight="700" hoverBgColor="transparent" hoverColor="#122A41">
                        See All Articles <FaArrowRight className="blogs-arrow transition-2" color="#fff" />
                    </GenericButton>
                </div>

                <div className="blogs-grid pb-4 mt-2 pt-2">
                    {wpPosts.map((post) => (
                        <Card className="custom-shadow border-0" key={post.id}>
                            <Card.Img className="" variant="top" src={post.blogImg} />
                            <Box className="d-flex flex-column justify-content-between w-100 h-100" padding="30px 35px">
                                <div>
                                    <GenericBadge text="Business" />
                                </div>
                                <div className="my-2 py-1">
                                    <Typography className="mb-0" as="h4" color="#121212" weight="700" size="26x" lineHeight="30px">
                                        {post.blogTitle}
                                    </Typography>
                                </div>

                                <div className="d-flex align-items-center gap-4">
                                    <Typography className="mb-0" as="p" color="#122A41" weight="400" size="16px" lineHeight="26px">
                                        <span style={{ color: '#BBB6B6' }}>by</span> {post.author}
                                    </Typography>

                                    <div className="d-flex align-items-center gap-2">
                                        <CiCalendar color="#122A41" size={23} />
                                        <Typography className="mb-0" as="p" color="#122A41" weight="400" size="16px" lineHeight="26px">
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
    )
}

export default Blogs;
