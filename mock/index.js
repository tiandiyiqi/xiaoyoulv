import * as users from "./users";
import * as events from "./events";
import * as resources from "./resources";
import * as posts from "./posts";

// 模拟延迟
const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// 模拟接口响应
const response = (data, code = 0, message = "success") => ({
  code,
  message,
  data,
});

// 用户相关接口
export const userApi = {
  // 登录
  login: async (username, password) => {
    await delay();
    const result = users.login(username, password);
    return response(result);
  },

  // 注册
  register: async (data) => {
    await delay();
    const result = users.register(data);
    return response(result);
  },
};

// 活动相关接口
export const eventApi = {
  // 获取活动列表
  getEvents: async (params) => {
    await delay();
    const result = events.getEvents(params);
    return response(result);
  },

  // 获取活动详情
  getEventById: async (id) => {
    await delay();
    const result = events.getEventById(id);
    return response(result);
  },

  // 创建活动
  createEvent: async (data) => {
    await delay();
    const result = events.createEvent(data);
    return response(result);
  },

  // 报名活动
  joinEvent: async (eventId, user) => {
    await delay();
    const result = events.joinEvent(eventId, user);
    return response(result);
  },

  // 评论活动
  commentEvent: async (eventId, user, content) => {
    await delay();
    const result = events.commentEvent(eventId, user, content);
    return response(result);
  },
};

// 资源相关接口
export const resourceApi = {
  // 获取资源列表
  getResources: async (params) => {
    await delay();
    const result = resources.getResources(params);
    return response(result);
  },

  // 获取资源详情
  getResourceById: async (id) => {
    await delay();
    const result = resources.getResourceById(id);
    return response(result);
  },

  // 创建资源
  createResource: async (data) => {
    await delay();
    const result = resources.createResource(data);
    return response(result);
  },

  // 点赞资源
  likeResource: async (resourceId) => {
    await delay();
    const result = resources.likeResource(resourceId);
    return response(result);
  },

  // 评论资源
  commentResource: async (resourceId, user, content) => {
    await delay();
    const result = resources.commentResource(resourceId, user, content);
    return response(result);
  },
};

// 动态相关接口
export const postApi = {
  // 获取动态列表
  getPosts: async (params) => {
    await delay();
    const result = posts.getPosts(params);
    return response(result);
  },

  // 获取动态详情
  getPostById: async (id) => {
    await delay();
    const result = posts.getPostById(id);
    return response(result);
  },

  // 创建动态
  createPost: async (data) => {
    await delay();
    const result = posts.createPost(data);
    return response(result);
  },

  // 点赞动态
  likePost: async (postId) => {
    await delay();
    const result = posts.likePost(postId);
    return response(result);
  },

  // 评论动态
  commentPost: async (postId, user, content) => {
    await delay();
    const result = posts.commentPost(postId, user, content);
    return response(result);
  },

  // 回复评论
  replyComment: async (postId, commentId, user, content, replyTo) => {
    await delay();
    const result = posts.replyComment(
      postId,
      commentId,
      user,
      content,
      replyTo
    );
    return response(result);
  },
};
