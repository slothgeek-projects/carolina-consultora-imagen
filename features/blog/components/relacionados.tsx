import type { Post } from "@/lib/definitions";
import PostCard from "@/features/blog/components/postCard";

export default function Relacionados({ posts }: { posts: Array<Post> }) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="relacionados"
      className="border-t border-edge mt-16 md:mt-20 pt-12 md:pt-16"
    >
      <h2
        id="relacionados"
        className="font-heading text-[24px] md:text-[30px] font-normal text-ink mb-10"
      >
        Seguí leyendo
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
