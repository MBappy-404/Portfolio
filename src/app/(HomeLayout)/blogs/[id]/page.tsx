"use client";
import BlogDetail from "@/components/Blog/BlogDetails/BlogDetails";

const BlogDetails =  ({ params }: any) => {
  const { id } = params;
  

  return (
    <div>
       <BlogDetail id={id} />
    </div>
  );
};

export default BlogDetails;
