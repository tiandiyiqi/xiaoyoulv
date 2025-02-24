// 校友圈动态数据
const mockPosts = [
  {
    id: 1,
    userId: 1,
    content: "今天参加了校友会，收获满满！",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    createTime: "2023-10-01 10:00:00",
    likes: [2, 3],
    comments: [
      {
        userId: 2,
        content: "真不错！",
        createTime: "2023-10-01 10:05:00",
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    content: "最近在找工作，有推荐的吗？",
    images: [],
    createTime: "2023-10-02 11:00:00",
    likes: [1, 3],
    comments: [
      {
        userId: 1,
        content: "我们公司正在招聘，可以联系我",
        createTime: "2023-10-02 11:05:00",
      },
    ],
  },
  // ... 更多动态数据，总共20条
];

// 动态列表
export const posts = [
  {
    id: "1",
    nickname: "张三",
    avatar: "/static/avatar/avatar1.png",
    content: "今天是个好日子，和老同学聚会真开心！",
    images: ["/static/images/demo1.jpg", "/static/images/demo2.jpg"],
    location: "深圳市南山区",
    createTime: "2024-02-23 14:30",
    likeCount: 128,
    commentCount: 32,
    shareCount: 16,
    isLiked: false,
    comments: [
      {
        id: "1",
        nickname: "李四",
        avatar: "/static/avatar/avatar2.png",
        content: "看起来很开心啊！",
        createTime: "2024-02-23 14:35",
        likeCount: 8,
        isLiked: false,
        replyCount: 2,
        replies: [
          {
            id: "1-1",
            nickname: "王五",
            content: "是啊是啊",
            createTime: "2024-02-23 14:36",
            replyTo: "李四",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    nickname: "李四",
    avatar: "/static/avatar/avatar2.png",
    content: "分享一下最近的工作心得...",
    images: [],
    location: "",
    createTime: "2024-02-23 15:00",
    likeCount: 64,
    commentCount: 16,
    shareCount: 8,
    isLiked: false,
    comments: [],
  },
  {
    id: "3",
    nickname: "王五",
    avatar: "/static/avatar/avatar3.png",
    content:
      "分享一个求职经验：最近成功转行做了产品经理，和大家分享一下心得。1. 要提前做好相关技能储备，比如竞品分析、数据分析、原型设计等；2. 在找工作前要对目标行业有深入了解；3. 准备一个好的作品集很重要。",
    images: ["/static/images/demo3.jpg"],
    location: "广州市天河区",
    createTime: "2024-02-24 09:30",
    likeCount: 245,
    commentCount: 56,
    shareCount: 23,
    isLiked: false,
    comments: [
      {
        id: "3-1",
        nickname: "小明",
        avatar: "/static/avatar/avatar4.png",
        content: "非常实用的经验分享！",
        createTime: "2024-02-24 09:35",
        likeCount: 12,
        isLiked: false,
        replyCount: 1,
        replies: [],
      },
    ],
  },
  {
    id: "4",
    nickname: "小红",
    avatar: "/static/avatar/avatar4.png",
    content:
      "今天参加了校友企业参观活动，参观了几家优秀校友创办的科技公司，收获满满！特别是对人工智能应用领域有了更深的认识。",
    images: ["/static/images/demo4.jpg", "/static/images/demo5.jpg"],
    location: "深圳市南山区科技园",
    createTime: "2024-02-24 14:20",
    likeCount: 189,
    commentCount: 42,
    shareCount: 15,
    isLiked: false,
    comments: [],
  },
  {
    id: "5",
    nickname: "老王",
    avatar: "/static/avatar/avatar5.png",
    content:
      "作为一名在互联网行业打拼多年的老校友，想和学弟学妹们分享几点职业发展建议：1.技术始终是根本，要持续学习；2.培养商业思维和产品意识；3.重视沟通能力的提升；4.建立良好的职业人脉网络。",
    images: [],
    location: "北京市朝阳区",
    createTime: "2024-02-24 16:45",
    likeCount: 367,
    commentCount: 89,
    shareCount: 45,
    isLiked: false,
    comments: [
      {
        id: "5-1",
        nickname: "小李",
        avatar: "/static/avatar/avatar1.png",
        content: "感谢老师分享的经验！",
        createTime: "2024-02-24 16:50",
        likeCount: 15,
        isLiked: false,
        replyCount: 0,
        replies: [],
      },
    ],
  },
];

// 获取动态列表
export const getPosts = (params = {}) => {
  const { keyword } = params;
  let result = [...posts];

  if (keyword) {
    result = result.filter(
      (post) =>
        post.content.includes(keyword) || post.location?.includes(keyword)
    );
  }

  return result;
};

// 获取动态详情
export const getPostById = (id) => {
  return posts.find((post) => post.id === id);
};

// 创建动态
export const createPost = (data) => {
  const newPost = {
    id: String(posts.length + 1),
    ...data,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isLiked: false,
    comments: [],
  };
  posts.push(newPost);
  return newPost;
};

// 点赞动态
export const likePost = (postId) => {
  const post = posts.find((post) => post.id === postId);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likeCount += post.isLiked ? 1 : -1;
    return true;
  }
  return false;
};

// 评论动态
export const commentPost = (postId, user, content) => {
  const post = posts.find((post) => post.id === postId);
  if (post) {
    const comment = {
      id: String(post.comments.length + 1),
      nickname: user.nickname,
      avatar: user.avatar,
      content,
      createTime: new Date().toLocaleString(),
      likeCount: 0,
      isLiked: false,
      replyCount: 0,
      replies: [],
    };
    post.comments.unshift(comment);
    post.commentCount++;
    return comment;
  }
  return null;
};

// 回复评论
export const replyComment = (postId, commentId, user, content, replyTo) => {
  const post = posts.find((post) => post.id === postId);
  if (post) {
    const comment = post.comments.find((comment) => comment.id === commentId);
    if (comment) {
      const reply = {
        id: `${commentId}-${comment.replies.length + 1}`,
        nickname: user.nickname,
        content,
        createTime: new Date().toLocaleString(),
        replyTo,
      };
      comment.replies.push(reply);
      comment.replyCount++;
      return reply;
    }
  }
  return null;
};
