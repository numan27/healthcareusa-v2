import { FaArrowRight } from "react-icons/fa6";
import { Card, Container } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci"
import { Box, GenericBadge, GenericButton, Typography } from "../../../components/GenericComponents"
import IMAGES from "../../../assets/images"

const Blogs = () => {

    const blogsData = [
        {
            blogImg: IMAGES.BLOG_IMG,
            title: "Cards on the table: 3 ways to spot a transparent company",
            author: "Avitex",
            days: "2 days ago"
        },
        {
            blogImg: IMAGES.BLOG_IMG,
            title: "Cards on the table: 3 ways to spot a transparent company",
            author: "Avitex",
            days: "2 days ago"
        },
        {
            blogImg: IMAGES.BLOG_IMG,
            title: "Cards on the table: 3 ways to spot a transparent company",
            author: "Avitex",
            days: "2 days ago"
        },
    ]

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
                    {blogsData.map((items, index) => (
                        <Card className="custom-shadow border-0">
                            <Card.Img variant="top" src={items.blogImg} />
                            <Box className="" padding="30px 35px">
                                <GenericBadge text="Business" />
                                <div className="my-2 py-1">
                                    <Typography className="mb-0" as="h4" color="#121212" weight="700" size="26x" lineHeight="30px">
                                       {items.title}
                                    </Typography>
                                </div>

                                <div className="d-flex align-items-center gap-4">
                                    <Typography className="mb-0" as="p" color="#122A41" weight="400" size="16px" lineHeight="26px">
                                        <span style={{ color: '#BBB6B6' }}>by</span> {items.author}
                                    </Typography>

                                    <div className="d-flex align-items-center gap-2">
                                        <CiCalendar color="#122A41" size={23} />
                                        <Typography className="mb-0" as="p" color="#122A41" weight="400" size="16px" lineHeight="26px">
                                            {items.days}
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

export default Blogs