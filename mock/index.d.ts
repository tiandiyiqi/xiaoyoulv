interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  phone?: string;
  email?: string;
  realName?: string;
  gender?: number;
  region?: string[];
  education?: {
    school: string;
    major: string;
    degree: string;
    startYear: string;
    endYear: string;
  }[];
  work?: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description?: string;
  }[];
}

interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

interface Event {
  id: string;
  title: string;
  cover: string;
  time: string;
  location: string;
  participantCount: number;
  maxParticipants: number;
  interestedCount: number;
  fee: number;
  deadline: string;
  contact: string;
  description: string;
  notice: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  participants: {
    id: string;
    nickname: string;
    avatar: string;
  }[];
  comments: {
    id: string;
    nickname: string;
    avatar: string;
    content: string;
    createTime: string;
  }[];
}

interface Resource {
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

interface Post {
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

export const userApi: {
  login: (username: string, password: string) => Promise<ApiResponse<LoginResult>>;
  register: (data: Partial<UserInfo>) => Promise<ApiResponse<LoginResult>>;
};

export const eventApi: {
  getEvents: (params?: { keyword?: string; status?: string }) => Promise<ApiResponse<Event[]>>;
  getEventById: (id: string) => Promise<ApiResponse<Event>>;
  createEvent: (data: Partial<Event>) => Promise<ApiResponse<Event>>;
  joinEvent: (eventId: string, user: { id: string; nickname: string; avatar: string }) => Promise<ApiResponse<boolean>>;
  commentEvent: (eventId: string, user: { nickname: string; avatar: string }, content: string) => Promise<ApiResponse<Event['comments'][0]>>;
};

export const resourceApi: {
  getResources: (params?: { keyword?: string; type?: string }) => Promise<ApiResponse<Resource[]>>;
  getResourceById: (id: string) => Promise<ApiResponse<Resource>>;
  createResource: (data: Partial<Resource>) => Promise<ApiResponse<Resource>>;
  likeResource: (resourceId: string) => Promise<ApiResponse<boolean>>;
  commentResource: (resourceId: string, user: { nickname: string; avatar: string }, content: string) => Promise<ApiResponse<Resource['comments'][0]>>;
};

export const postApi: {
  getPosts: (params?: { keyword?: string }) => Promise<ApiResponse<Post[]>>;
  getPostById: (id: string) => Promise<ApiResponse<Post>>;
  createPost: (data: Partial<Post>) => Promise<ApiResponse<Post>>;
  likePost: (postId: string) => Promise<ApiResponse<boolean>>;
  commentPost: (postId: string, user: { nickname: string; avatar: string }, content: string) => Promise<ApiResponse<Post['comments'][0]>>;
  replyComment: (postId: string, commentId: string, user: { nickname: string }, content: string, replyTo: string) => Promise<ApiResponse<Post['comments'][0]['replies'][0]>>;
}; 