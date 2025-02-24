import { postApi } from 'mock';

export interface Post {
  id: string;
  nickname: string;
  avatar: string;
  content: string;
  images: string[];
  location?: string;
  createTime: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isLiked: boolean;
  comments: {
    id: string;
    nickname: string;
    avatar: string;
    content: string;
    createTime: string;
    likeCount: number;
    isLiked: boolean;
    replyCount: number;
    replies: {
      id: string;
      nickname: string;
      content: string;
      createTime: string;
      replyTo: string;
    }[];
  }[];
}

export interface PostParams {
  keyword?: string;
}

export const getPosts = (params?: PostParams) => {
  return postApi.getPosts(params);
};

export const getPostById = (id: string) => {
  return postApi.getPostById(id);
};

export const createPost = (data: Partial<Post>) => {
  return postApi.createPost(data);
};

export const likePost = (postId: string) => {
  return postApi.likePost(postId);
};

export const commentPost = (postId: string, user: { nickname: string; avatar: string }, content: string) => {
  return postApi.commentPost(postId, user, content);
};

export const replyComment = (postId: string, commentId: string, user: { nickname: string }, content: string, replyTo: string) => {
  return postApi.replyComment(postId, commentId, user, content, replyTo);
}; 