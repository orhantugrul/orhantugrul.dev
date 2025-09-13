export type Feed = {
  title: string;
  link: string;
  posts: Post[];
};

export type Post = {
  title: string;
  link: string;
  author: string;
  published: string;
  content: string;
  categories: string[];
};
