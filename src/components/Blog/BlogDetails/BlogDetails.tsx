"use client";
import {
  useAllBlogsQuery,
  useGetBlogsQuery,
} from "@/components/redux/features/blogs/blogsApi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock, FiTag } from "react-icons/fi";
import { BlogDetailSkeleton } from "./BlogDetailsSpinner";

const BlogDetail = ({ id }: { id: string }) => {
  const { data: blogData, isLoading: isBlogLoading } = useGetBlogsQuery(id);
  const { data: allBlogsData, isLoading: isAllBlogsLoading } = useAllBlogsQuery(
    []
  );

  const blog = blogData?.data;
  const allBlogs = allBlogsData?.data || [];

  // Filter out current blog for suggestions
  const suggestedBlogs = allBlogs.filter((b: any) => b._id !== id).slice(0, 3);

  if (isBlogLoading || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BlogDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-[#0F0F15]">
      <div className=" lg:container max-w-[800px] mx-auto px-4 pt-24 pb-16">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-[#6c2bd9] dark:text-[#B18AFF] hover:opacity-80 transition-opacity"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Back to Articles</span>
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Blog */}
          <div className="flex-1">
            {/* ... main blog content same as before ... */}
            <motion.header>
              {/* Category and Date */}
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2 bg-[#6c2bd9]/10 text-[#6c2bd9] dark:bg-[#6c2bd9]/20 dark:text-[#B18AFF]">
                  <FiTag className="text-sm" />
                  {blog.category}
                </span>
                <span className="flex items-center gap-2 text-[#6A6A7A] dark:text-[#A0A0B0]">
                  <FiCalendar className="text-sm" />
                  {blog.createdAt?.split("T")[0]}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#1A1A24] dark:text-white">
                {blog.title}
              </h1>

              {/* Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
                <Image
                  src={blog.blogImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30" />
              </div>
            </motion.header>

            {/* Author + Content */}
            <div className="mb-12 p-6 rounded-xl bg-white dark:bg-[#1A1A24] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden" />
              <div>
                <h3 className="font-medium text-[#1A1A24] dark:text-white">
                  {blog.author}
                </h3>
                <p className="text-sm text-[#6A6A7A] dark:text-[#A0A0B0]">
                  Published Author
                </p>
              </div>
            </div>
            <div className="prose max-w-none leading-8 text-[#4A4A4A] dark:prose-invert dark:text-[#E0E0E0]">
              {blog.description}
            </div>
          </div>

          {/* Suggested Blogs */}
          {suggestedBlogs.length > 0 && (
            <aside className="w-full md:w-[320px] lg:w-[360px] shrink-0">
              <h3 className="text-xl font-semibold mb-6 text-[#1A1A24] dark:text-white">
                Suggested Articles
              </h3>
              <div className="space-y-6">
                {suggestedBlogs.map((s: any) => (
                  <SuggestedArticleCard key={s._id} article={s} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

const SuggestedArticleCard = ({ article }: any) => (
  <Link href={`/blogs/${article._id}`}>
    <motion.a className="block group mt-3 border border-gray-200 rounded-xl dark:border-gray-700">
      <article className="flex items-start gap-4 rounded-xl p-3 bg-white dark:bg-[#1A1A24] hover:shadow-md transition-all">
        {/* Image - smaller and left aligned */}
        <div className="relative w-24 h-24 min-w-[6rem] rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={article.blogImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/40" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Category and Read Time */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="px-2 py-0.5 rounded-full bg-[#6c2bd9]/10 text-[#6c2bd9] dark:bg-[#6c2bd9]/20 dark:text-[#B18AFF] font-medium">
              {article.category}
            </span>
            <span className="text-[#6A6A7A] dark:text-[#A0A0B0] flex items-center gap-1">
              <FiClock className="text-sm" />
              {Math.ceil(article.description.length / 200)} min
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-[#1A1A24] dark:text-white line-clamp-2 leading-snug">
            {article.title}
          </h4>

          {/* Description */}
          <p className="text-xs mt-1  text-[#6A6A7A] dark:text-[#A0A0B0] line-clamp-2">
            {article.description}
          </p>
        </div>
      </article>
    </motion.a>
  </Link>
);
