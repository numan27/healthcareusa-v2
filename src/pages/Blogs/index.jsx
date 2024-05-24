import AppLayout from '../../components/Layout/AppLayout'
import BlogsSection from "../Home/components/Blogs"

const Blogs = () => {
  return (
    <div>
      <AppLayout>
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <BlogsSection
            postNumber={5}
            onHomePage={false}
            centeredTitle
          />
        </div>
      </AppLayout>
    </div>
  )
}

export default Blogs
