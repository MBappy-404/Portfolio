"use client";
import {
  useAllBlogsQuery,
  useGetBlogsQuery,
} from "@/components/redux/features/blogs/blogsApi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock, FiTag } from "react-icons/fi";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { BlogDetailSkeleton } from "./BlogDetailsSpinner";
import parse from "html-react-parser";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const BlogDetail = ({ id }: { id: string }) => {
  // Like/Dislike state
  const [likes, setLikes] = useState(() =>
    parseInt(localStorage.getItem(`blog_like_${id}`) || "0", 10)
  );
  const [dislikes, setDislikes] = useState(() =>
    parseInt(localStorage.getItem(`blog_dislike_${id}`) || "0", 10)
  );
  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`blog_like_${id}`, newLikes.toString());
  };
  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    localStorage.setItem(`blog_dislike_${id}`, newDislikes.toString());
  };
  // View count using localStorage
  const [viewCount, setViewCount] = useState(0);
  useEffect(() => {
    const key = `blog_view_count_${id}`;
    let count = parseInt(localStorage.getItem(key) || "0", 10);
    count += 1;
    localStorage.setItem(key, count.toString());
    setViewCount(count);
  }, [id]);
  // View count logic

  useEffect(() => {
    // Replace with your API endpoint or function
    fetch(`/api/blogs/${id}/view`, { method: "POST" });
  }, [id]);

  // Comment section state
  type Comment = { name: string; text: string };
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy fetch comments (replace with real API)
  useEffect(() => {
    // Simulate fetch
    setComments([
      { name: "Saroar Jahan", text: "Great article!" },
      { name: "Bappy", text: "Very informative." },
    ]);
  }, []);

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setLoading(true);
    // Replace with your API call
    setTimeout(() => {
      setComments([{ name: "You", text: commentInput }, ...comments]);
      setCommentInput("");
      setLoading(false);
    }, 600);
  };
  const { data: blogData, isLoading: isBlogLoading } = useGetBlogsQuery(id);
  const { theme } = useTheme();
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

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-[#1A1A24] dark:text-white">
                {blog.title}
              </h1>

              {/* Image */}
              <div className="relative h-96 mt-5 rounded-2xl overflow-hidden mb-10">
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
            <div className="mb-12 p-3 md:p-6 rounded-xl bg-white dark:bg-[#1A1A24] flex items-center justify-between gap-2 md:gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10  md:w-12 md:h-12 rounded-full bg-gray-200 overflow-hidden" />
                <div>
                  <h3 className="font-medium text-[#1A1A24] dark:text-white">
                    {blog.author}
                  </h3>
                  <p className="text-sm text-[#6A6A7A] dark:text-[#A0A0B0]">
                    Published Author
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 ">
                <span className="px-3 py-1 capitalize rounded-full text-sm flex items-center gap-2 bg-[#6c2bd9]/10 text-[#6c2bd9] dark:bg-[#6c2bd9]/20 dark:text-[#B18AFF]">
                  <FiTag className=" text-sm" />
                  {blog.category}
                </span>
                <span className="flex text-xs md:text-sm items-center gap-2 text-[#6A6A7A] dark:text-[#A0A0B0]">
                  <FiCalendar className="text-sm" />
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="prose max-w-none leading-8 text-[#4A4A4A] dark:prose-invert dark:text-[#E0E0E0]">
              <div
                className={`blog-content text-gray-800 dark:text-gray-200 ${
                  theme === "dark" ? "text-white" : "text-[#1A1A24]"
                }`}
              >
                {parse(blog.description)}
              </div>
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
        {/* Reactions & Comment Section */}
        <div className="py-5 mt-3 flex justify-start">
          <div className="max-w-3xl w-full p-4 md:p-8 rounded-3xl  bg-white dark:bg-[#181825] border border-[#ececec] dark:border-[#232336]">
            {/* Reactions and Views */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className="flex cursor-pointer items-center gap-2 md:px-4 md:py-3 px-3 py-2 rounded-xl bg-[#e9d5ff] dark:bg-[#232336] text-[#6c2bd9] dark:text-[#B18AFF] font-bold shadow hover:bg-[#d1c4e9] transition-colors"
                >
                  <FiThumbsUp  className=" w-5 h-5" />
                  <span className="text-lg font-bold">{likes}</span>
                </button>
                <button
                  onClick={handleDislike}
                  className="flex cursor-pointer items-center gap-2 md:px-4 md:py-3 px-3 py-2 rounded-xl bg-[#ffe5e5] dark:bg-[#232336] text-[#d32f2f] font-bold shadow hover:bg-[#ffcdd2] transition-colors"
                >
                  <FiThumbsDown  className=" w-5 h-5" />
                  <span className="text-lg font-bold">{dislikes}</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6A6A7A] dark:text-[#A0A0B0]">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{viewCount} views </span>
              </div>
            </div>
            {/* Comment Box */}
            <h3 className="text-xl md:text-3xl font-bold mb-8 text-[#6c2bd9] dark:text-[#B18AFF] flex items-center gap-2">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="#6c2bd9"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Comments
            </h3>
            <form
              onSubmit={handleCommentSubmit}
              className="flex flex-col md:flex-row gap-4 mb-10"
            >
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add your comment..."
                className="flex-1 px-5 py-4 rounded-xl border border-[#e5e7eb] dark:border-[#232336] bg-gray-50 dark:bg-[#232336] text-base focus:outline-none focus:ring-2 focus:ring-[#6c2bd9] shadow"
                disabled={loading}
              />
              <button
                type="submit"
                className="px-8 py-4 cursor-pointer rounded-xl bg-[#6c2bd9] text-white font-bold shadow-lg hover:bg-[#8857dc] transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </form>
            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-start  gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-[#232336] border border-[#ececec] dark:border-[#232336] shadow"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#6c2bd9]/20 flex items-center justify-center font-bold text-xl text-[#6c2bd9] dark:text-[#B18AFF]">
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-[#1A1A24] dark:text-white">
                        {c.name}
                      </p>
                      <p className="text-base whitespace-break-spaces break-all text-[#6A6A7A] dark:text-[#A0A0B0] mt-1">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
            <span className="px-2 capitalize py-0.5 rounded-full bg-[#6c2bd9]/10 text-[#6c2bd9] dark:bg-[#6c2bd9]/20 dark:text-[#B18AFF] font-medium">
              {article.category}
            </span>
            <span className="text-[#6A6A7A] dark:text-[#A0A0B0] flex items-center gap-1">
              <FiClock className="text-sm" />
              {Math.ceil(article.description.length / 200)} min
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 leading-snug">
            {article.title}
          </h4>

          {/* Description */}
          <p className="text-xs mt-1  text-[#6A6A7A] dark:text-[#A0A0B0] line-clamp-2">
            {parse(article.description)}
          </p>
        </div>
      </article>
    </motion.a>
  </Link>
);
