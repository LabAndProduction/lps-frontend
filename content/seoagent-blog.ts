/* eslint-disable */
// SEO Agent: статьи блога внутри сборки сайта (для хостингов без файловой системы — Cloudflare Workers).
// Файл пересобирается сам при каждой сборке (next.config → seoBlogDataSync) — руками не править.
import { seoBlogFiles } from "@webnumseoagent/next/blog-files";

seoBlogFiles({
 "schema": "seoagent.blog-files/v1",
 "files": {},
 "features": [
  "author-pages"
 ]
});
