export type Feed = {
  title: string;
  description: string;
  link: string;
  posts: Post[];
};

export type Post = {
  title: string;
  link: string;
  author: string;
  published: string;
  content?: Element[];
  categories: string[];
};

export type Element = {
  tag: string;
  attributes?: Attribute[];
  value?: string;
  children?: Element[];
};

export type Attribute = {
  name: string;
  value: string;
};
