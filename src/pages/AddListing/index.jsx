import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const PaginatedListings = () => {
  const [fetchedListings, setFetchedListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchListings = async () => {
      const url =
        "https://jsappone.demowp.io/wp-json/wp/v2/listing?per_page=100";
      try {
        const response = await axios.get(url);
        const profileData = response.data;

        // Fetch media URLs
        const mediaIds = profileData
          .map((post) => post.featured_media)
          .filter((id) => id);
        const mediaResponses = await Promise.all(
          mediaIds.map((id) =>
            axios.get(`https://jsappone.demowp.io/wp-json/wp/v2/media/${id}`)
          )
        );
        const mediaData = mediaResponses.reduce((acc, media) => {
          acc[media.data.id] = media.data.source_url;
          return acc;
        }, {});

        // Transform profile data to match the expected structure
        const transformedProfileData = profileData.map((profile) => ({
          id: profile.id,
          profileImg: mediaData[profile.featured_media] || "default_image_url",
          title: profile.title.rendered,
          designation:
            profile.cubewp_post_meta["cwp_field_40228862441"]?.meta_value ||
            "N/A",
          languages:
            profile.cubewp_post_meta["fc-languages"]?.meta_value.split(", ") ||
            [],
          specialization:
            profile.cubewp_post_meta[
              "cwp_field_136461069401"
            ]?.meta_value.split(", ") || [],
          qualifications:
            profile.cubewp_post_meta[
              "cwp_field_930729608352"
            ]?.meta_value.split(", ") || [],
          gender:
            profile.cubewp_post_meta["cwp_field_224925973684"]?.meta_value ||
            "N/A",
          doctorPackage:
            profile.cubewp_post_meta[
              "cwp_field_631649982329"
            ]?.meta_value.split(", ") || [],
          address:
            profile.cubewp_post_meta["fc-google-address"]?.meta_value.address ||
            "N/A",
          phone: profile.cubewp_post_meta["fc-phone"]?.meta_value || "N/A",
          comment_status: profile.comment_status || "N/A",
          status: profile.status || "N/A",
        }));

        setFetchedListings(transformedProfileData);
      } catch (error) {
        console.error("Error fetching posts or media:", error);
      }
    };

    fetchListings();
  }, []);

  // Calculate the data to be displayed on the current page
  const offset = currentPage * itemsPerPage;
  const currentPageData = fetchedListings.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(fetchedListings.length / itemsPerPage);

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <h1>Paginated Listings</h1>
      <ul>
        {currentPageData.map((item) => (
          <li key={item.id}>
            <img
              src={item.profileImg}
              alt={item.title}
              width={50}
              height={50}
            />
            <div>
              <h2>{item.title}</h2>
              <p>{item.designation}</p>
              <p>{item.address}</p>
              <p>{item.phone}</p>
              {/* Add more fields as needed */}
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PaginatedListings;
