// The SEO Agent blog (/blog, /en/blog) is not in the admin's menus, so the header,
// the footer's "Компания" column and the mobile menu add it after the admin's items.
export const BLOG_PATH = "/blog";
export const blogLabel = (locale: string) => (locale === "en" ? "Blog" : "Блог");
