import { resourceApi } from '@/mock';

export interface Resource {
  id: string;
  nickname: string;
  avatar: string;
  createTime: string;
  type: 'job' | 'project' | 'experience' | 'document';
  title: string;
  description: string;
  requirement?: string;
  budget?: string;
  file?: string;
  fileName?: string;
  fileSize?: string;
  tags: string[];
  contact: string;
  viewCount: number;
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
  }[];
}

export interface ResourceParams {
  keyword?: string;
  type?: Resource['type'] | 'all';
}

export const getResources = (params?: ResourceParams) => {
  return resourceApi.getResources(params);
};

export const getResourceById = (id: string) => {
  return resourceApi.getResourceById(id);
};

export const createResource = (data: Partial<Resource>) => {
  return resourceApi.createResource(data);
};

export const likeResource = (resourceId: string) => {
  return resourceApi.likeResource(resourceId);
};

export const commentResource = (resourceId: string, user: { nickname: string; avatar: string }, content: string) => {
  return resourceApi.commentResource(resourceId, user, content);
}; 