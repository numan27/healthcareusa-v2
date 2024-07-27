import { useState, useEffect } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import {
  Box,
  GenericButton,
  GenericInput,
  GenericSelect,
  Typography,
} from "../../components/GenericComponents";
import { LoaderCenter } from "../../assets";
import { toast } from "react-toastify";
import axios from "axios";
import FormHeader from "../../components/Layout/FormLayout/FormHeader";

const initialFormState = {
  featuredImage: null,
  title: "",
  category: "",
  articleDesc: "",
  tags: [],
};

const ArticleSubmission = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get(
          "https://jsappone.demowp.io/wp-json/wp/v2/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const tagsResponse = await axios.get(
          "https://jsappone.demowp.io/wp-json/wp/v2/tags"
        );
        setTags(tagsResponse.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "tags") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTagsChange = (tags) => {
    const availableTags = tags;

    const tagIds = tags
      .map((tag) => {
        const existingTag = availableTags.find((t) => t.name === tag);
        return existingTag ? existingTag.id : null;
      })
      .filter((tagId) => tagId !== null);

    setFormData({
      ...formData,
      tags: tagIds,
    });
  };

  const handleProfilePictureChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
    setProfilePictureUploaded(true);
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const credentials = btoa("numan27:findhealthcareusa");
      if (!formData.profilePicture) {
        throw new Error("Please upload Article Media");
      }

      const uploadFormData = new FormData();
      uploadFormData.append("file", formData.profilePicture);

      const uploadResponse = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/media",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
          },
          body: uploadFormData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload profile picture to WordPress");
      }

      const uploadData = await uploadResponse.json();
      const mediaId = uploadData.id;

      const selectedCategory = categories.find(
        (cat) => cat.slug === formData.category
      );

      const tagIds = tags
        .filter((tag) => formData.tags.includes(tag.name))
        .map((tag) => tag.id);

      const payload = {
        featured_media: mediaId,
        title: formData.title,
        content: formData.articleDesc,
        categories: [selectedCategory.id],
        tags: formData.tags,
        status: "publish",
      };

      // Log payload to check if featured_media is set
      console.log("Payload before submission:", payload);

      const response = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post on WordPress");
      }

      toast.success("Post created successfully!", {
        autoClose: 1000,
      });
      setFormData(initialFormState);
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("formData post", formData);

  return (
    <div>
      <FormHeader />
      <Box background="#F3F4F6" className="w-100 mt-4">
        <Container className="w-100 mx-auto py-5">
          <Row>
            <Col className="mx-auto" md={10}>
              <Card className="border-0 py-2 px-4 mb-2 custom-shadow-2">
                <Typography
                  color="#111827"
                  weight="500"
                  size="23px"
                  lineHeight="36px"
                  as="h2"
                  className="mb-0"
                >
                  Creating New Article
                </Typography>
              </Card>

              <Card className="border-0 custom-shadow-2">
                <Form className="px-4 py-2" onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} className="mb-2">
                      <GenericInput
                        type="file"
                        name="profilePicture"
                        onFileChange={handleProfilePictureChange}
                        // key={`${formKey}-profilePicture`}
                      />
                      {!profilePictureUploaded && (
                        <small className="text-danger" size="14px">
                          Profile picture required
                        </small>
                      )}
                    </Col>
                    <Col xs={12} className="mb-2">
                      <GenericInput
                        labelWeight={600}
                        type="text"
                        background="#fff"
                        borderColor="#CFD9E0"
                        name="title"
                        label="Title of Your Article"
                        height="40px"
                        placeholder="Enter Article Name"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={12} className="mb-3">
                      <Form.Label className="form_label_bold">
                        Select Category*
                      </Form.Label>
                      <GenericSelect
                        minWidth="120px"
                        minheight="40px"
                        borderColor="#CFD9E0"
                        borderRadius="4px"
                        bgcolor="#fff"
                        placeholder="Select Category"
                        placeholderColor="#333333"
                        iconColor="#06312E"
                        menuPlacement="auto"
                        options={categories.map((category) => ({
                          id: category.id,
                          label: category.name,
                          value: category.slug,
                        }))}
                        onChange={handleCategoryChange}
                      />
                    </Col>
                    <Col xs={12} className="mb-2">
                      <GenericInput
                        labelWeight={600}
                        className="rounded-3"
                        as="textarea"
                        rows="15"
                        background="#fff"
                        borderColor="#CFD9E0"
                        label="Body of Your Article"
                        name="articleDesc"
                        placeholder="Enter here"
                        value={formData.articleDesc}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={12} className="mb-2">
                      <GenericInput
                        enableSmallText
                        enableTagInput
                        smallText="Enter at least 5 tags separated by commas."
                        labelWeight={600}
                        type="text"
                        background="#fff"
                        borderColor="#CFD9E0"
                        name="tags"
                        label="Keyword Tags"
                        height="40px"
                        placeholder="Enter Tags"
                        onTagsChange={handleTagsChange} // Call handleTagsChange on change
                      />
                    </Col>
                  </Row>
                  <Box
                    background="#F9FAFB"
                    className="w-100 d-flex justify-content-end py-2 rounded-bottom-2 px-3"
                  >
                    <GenericButton
                      height="40px"
                      width="115px"
                      className=""
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <LoaderCenter /> : "Post Now"}
                    </GenericButton>
                  </Box>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};

export default ArticleSubmission;
