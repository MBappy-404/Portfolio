"use client";

import { use } from "react";
import BlogDetail from "@/components/Blog/BlogDetails/BlogDetails";

// It is good practice to type this, but 'any' works if you prefer
type Props = {
  params: Promise<{ id: string }>;
};

const BlogDetails = ({ params }: Props) => {
  // Unwrap the params promise using React.use()
  const { id } = use(params);

  return (
    <div>
      <BlogDetail id={id} />
    </div>
  );
};

export default BlogDetails;