import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CiCalendar } from 'react-icons/ci';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import IMAGES from '../../../assets/images';
import AppLayout from '../../../components/Layout/AppLayout';
import { Typography } from '../../../components/GenericComponents';
import { useParams, Link } from 'react-router-dom';
import { LoaderCenter } from '../../../assets/Loader';
import BlogsSection from "../../Home/components/Blogs"

const DetailedBlog = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postUrl = `https://jsappone.demowp.io/wp-json/wp/v2/posts?_embed`;
            const tagsUrl = 'https://jsappone.demowp.io/wp-json/wp/v2/tags';

            try {
                const [postsResponse, tagsResponse] = await Promise.all([
                    axios.get(postUrl),
                    axios.get(tagsUrl)
                ]);

                const allPosts = postsResponse.data.map(post => {
                    const tags = post.tags.map(tagId => {
                        const tag = tagsResponse.data.find(tag => tag.id === tagId);
                        return tag ? tag.name : '';
                    });

                    return {
                        id: post.id,
                        blogImg: (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) || IMAGES.RELATED_BLOG_IMG,
                        tagText: tags.join(', '),
                        blogTitle: post.title.rendered,
                        authorImg: IMAGES.RELATED_BLOG_PROFILE,
                        authorName: post.author,
                        date: new Date(post.date).toDateString(),
                        lastSeen: "6 min read",
                        excerpt: post.excerpt.rendered,
                    };
                });

                setPosts(allPosts);

                const currentPostIndex = allPosts.findIndex(post => post.id === parseInt(id));
                if (currentPostIndex !== -1) {
                    setPost(allPosts[currentPostIndex]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    const currentPostIndex = posts.findIndex(post => post.id === parseInt(id));
    const prevPostId = currentPostIndex === 0 ? posts[posts.length - 1]?.id : posts[currentPostIndex - 1]?.id;
    const nextPostId = currentPostIndex === posts.length - 1 ? posts[0]?.id : posts[currentPostIndex + 1]?.id;

    console.log("posts", posts)

    return (
        <>
            <Container className='mt-5 pb-4'>
                <Row>
                    {/* Left Content */}
                    <Col lg={9}>
                        <Suspense fallback={<LoaderCenter />}>
                            {loading ? (
                                <LoaderCenter />
                            ) : post ? (
                                <div className='mb-3'>
                                    <Card>
                                        <Card.Img variant="top" src={post.blogImg} />
                                        <Card.Body>
                                            <Card.Title className='fs-4'>{post.blogTitle}</Card.Title>
                                            <div as="div" dangerouslySetInnerHTML={{ __html: post.content }} />
                                            <div className="d-flex align-items-center gap-4 mt-3">
                                                <img src={post.authorImg} alt="Author" style={{ width: 52, height: 52, borderRadius: '50%' }} />
                                                <Typography as="span">
                                                    <span style={{ color: '#BBB6B6' }}>by</span> {post.authorName}
                                                </Typography>
                                                <div className="d-flex align-items-center gap-2">
                                                    <CiCalendar color="#122A41" size={23} />
                                                    <Typography className="mb-0" as="p">{post.date}</Typography>
                                                </div>
                                            </div>

                                            <div className='mt-4'>
                                                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <div className="d-flex justify-content-between mt-5">
                                        {prevPostId && <Link to={`/blogs/${prevPostId}`} className="btn primaryButton d-flex align-items-center gap-2">
                                            <FaArrowLeft size="18" /> Previous Post
                                        </Link>}
                                        {nextPostId && <Link to={`/blogs/${nextPostId}`} className="btn primaryButton d-flex align-items-center gap-2">
                                            Next Post <FaArrowRight size="18" />
                                        </Link>}
                                    </div>
                                </div>
                            ) : (
                                <Typography as="p">Post not found</Typography>
                            )}
                        </Suspense>
                    </Col>

                    {/* Sidebar */}
                    <Col
                        style={{
                            position: 'sticky',
                            top: '50px',
                            height: 'fit-content'
                        }}
                        lg={3} md={6} className='pb-4'>
                        <div>
                            <img src={IMAGES.ADS_VERTICAL_IMG} className='img-fluid' alt="ads" />
                        </div>
                    </Col>
                </Row>

                <BlogsSection
                    onDetailPage={true}
                    isTitleBlack={true}
                    onHomePage={false}
                    centeredTitle />
            </Container>
        </>
    );
};

export default DetailedBlog;
