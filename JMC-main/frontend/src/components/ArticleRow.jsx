import { Link } from 'react-router-dom';
import { formatPostDate, localizePost } from '../data/blogPosts';
import { Reveal } from '../lib/motion';

const pad = (n) => String(n).padStart(2, '0');

const Meta = ({ index, category, date }) => (
  <div className="label-caps flex items-baseline justify-between gap-6 border-b border-ink pb-3 text-ink">
    <span>
      <span className="mr-3 tabular-nums">{pad(index)}</span>
      {category}
    </span>
    <span className="flex-none text-muted">{date}</span>
  </div>
);

export const ArticleRow = ({ post, index, lang, large = false }) => {
  const p = localizePost(post, lang);
  return (
    <Reveal as="article">
      <Meta
        index={index}
        category={p.category}
        date={<time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>}
      />
      <h3
        className={`mt-5 font-serif leading-[1.18] text-ink ${
          large ? 'text-[28px] md:text-[36px]' : 'text-[26px] md:text-[30px]'
        }`}
      >
        <Link to={`/insights/${post.slug}`} className="transition-colors duration-200 hover:text-accent">
          {p.title}
        </Link>
      </h3>
      <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-muted">{p.excerpt}</p>
    </Reveal>
  );
};
