import '../assets/css/article.css';
import type { article } from '../models/article';

export default function Article({ content }: article) {
  return (
    <div className="p-5">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}