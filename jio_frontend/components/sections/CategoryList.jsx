// This is your CategoryList component
"use client";
import { useEffect, useState } from "react";
import { media } from "../../lib/api";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { cn, getWatchUrl } from "../../lib/utils";
import { InboxIcon } from "lucide-react";

// Export CategoryList and CategoryListFallback (if this is your intent)
const CategoryList = ({ fetcher, className }) => {
  const [categoryPost, setCategoryPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher()
      .then((data) => setCategoryPost(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetcher]);

  if (loading) return <CategoryListFallback />;

  if (!categoryPost || categoryPost.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[80vh] py-12">
        <InboxIcon className="w-32 h-32 text-slate-400 mb-10" strokeWidth={1.2} />
        <p className="text-lg text-gray-500">No items found.</p>
      </div>
    );
  }

  return (
    <ul className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide", className)}>
      {categoryPost.map((post, index) => (
        <Link key={index} href={getWatchUrl(post.id, post.media_type)}>
          <Image
            src={media(post?.poster_path)}
            alt=""
            width={200}
            height={300}
            className="min-w-[200px] h-[300px] rounded-lg object-cover"
            quality={30}
          />
        </Link>
      ))}
    </ul>
  );
};

// Named export
export const CategoryListFallback = () => {
  return <div>Loading...</div>;
};

// Default export
export default CategoryList;
