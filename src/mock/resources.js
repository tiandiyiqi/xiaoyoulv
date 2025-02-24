// 资源列表
export const resources = [
  {
    id: "1",
    nickname: "陈明宇",
    avatar: "/static/avatar/avatar1.png",
    createTime: "2024-02-23 14:30",
    type: "job",
    title: "前端开发工程师",
    description:
      "我们正在寻找一位优秀的前端开发工程师加入我们的团队，负责公司核心产品的前端开发工作。",
    requirement:
      "1. 熟练掌握 HTML、CSS、JavaScript\n2. 熟悉 Vue3、TypeScript\n3. 有小程序开发经验\n4. 有良好的团队协作能力",
    tags: ["前端开发", "Vue3", "TypeScript"],
    contact: "13800138000",
    viewCount: 256,
    likeCount: 32,
    commentCount: 8,
    shareCount: 16,
    isLiked: false,
    comments: [
      {
        id: "1",
        nickname: "林思远",
        avatar: "/static/avatar/avatar2.png",
        content: "这个机会不错，请问可以远程工作吗？",
        createTime: "2024-02-23 14:35",
      },
    ],
  },
  {
    id: "2",
    nickname: "王浩然",
    avatar: "/static/avatar/avatar2.png",
    createTime: "2024-02-23 15:00",
    type: "project",
    title: "校友社交平台开发",
    description:
      "正在组建一个团队开发校友社交平台，寻找对此感兴趣的技术合作伙伴。",
    budget: "50000",
    tags: ["Vue3", "Node.js", "微信小程序"],
    contact: "13800138001",
    viewCount: 128,
    likeCount: 16,
    commentCount: 4,
    shareCount: 8,
    isLiked: false,
    comments: [],
  },
  {
    id: "3",
    nickname: "刘子涵",
    avatar: "/static/avatar/avatar3.png",
    createTime: "2024-02-24 09:00",
    type: "job",
    title: "产品经理（AI方向）",
    description: "知名AI公司招聘产品经理，负责AI产品的规划和设计。",
    requirement:
      "1. 3年以上产品经理经验\n2. 对AI领域有深入了解\n3. 有良好的沟通能力和项目管理能力",
    tags: ["产品经理", "AI", "机器学习"],
    contact: "13800138002",
    viewCount: 320,
    likeCount: 45,
    commentCount: 12,
    shareCount: 20,
    isLiked: false,
    comments: [
      {
        id: "2",
        nickname: "张雨晨",
        avatar: "/static/avatar/avatar4.png",
        content: "薪资范围是多少？",
        createTime: "2024-02-24 09:15",
      },
    ],
  },
  {
    id: "4",
    nickname: "周梓萱",
    avatar: "/static/avatar/avatar4.png",
    createTime: "2024-02-24 10:30",
    type: "project",
    title: "AI教育平台项目",
    description: "正在开发一个基于AI的个性化教育平台，寻找技术合伙人。",
    budget: "100000",
    tags: ["教育科技", "人工智能", "Python"],
    contact: "13800138003",
    viewCount: 245,
    likeCount: 28,
    commentCount: 6,
    shareCount: 12,
    isLiked: false,
    comments: [],
  },
  {
    id: "5",
    nickname: "黄俊杰",
    avatar: "/static/avatar/avatar5.png",
    createTime: "2024-02-24 11:00",
    type: "job",
    title: "高级算法工程师",
    description: "知名互联网公司招聘算法工程师，负责推荐系统的开发和优化。",
    requirement:
      "1. 计算机相关专业硕士及以上学历\n2. 精通机器学习算法\n3. 有推荐系统开发经验",
    tags: ["算法", "机器学习", "推荐系统"],
    contact: "13800138004",
    viewCount: 420,
    likeCount: 56,
    commentCount: 15,
    shareCount: 25,
    isLiked: false,
    comments: [],
  },
  {
    id: "6",
    nickname: "吴云飞",
    avatar: "/static/avatar/avatar1.png",
    createTime: "2024-02-24 14:00",
    type: "project",
    title: "区块链金融项目",
    description:
      "正在开发一个基于区块链的金融服务平台，寻找对区块链感兴趣的开发者。",
    budget: "80000",
    tags: ["区块链", "金融科技", "智能合约"],
    contact: "13800138005",
    viewCount: 180,
    likeCount: 22,
    commentCount: 5,
    shareCount: 10,
    isLiked: false,
    comments: [],
  },
  {
    id: "7",
    nickname: "杨晓峰",
    avatar: "/static/avatar/avatar2.png",
    createTime: "2024-02-25 09:00",
    type: "experience",
    title: "从校园到硅谷：我的技术创业之路",
    description:
      "分享我从大学毕业后到硅谷创业的经历，包括如何获得融资、组建团队、产品开发等方面的经验。",
    tags: ["创业经验", "技术创新", "团队管理"],
    contact: "13800138006",
    viewCount: 520,
    likeCount: 89,
    commentCount: 23,
    shareCount: 45,
    isLiked: false,
    comments: [],
  },
  {
    id: "8",
    nickname: "赵雪莹",
    avatar: "/static/avatar/avatar3.png",
    createTime: "2024-02-25 10:30",
    type: "experience",
    title: "AI产品经理成长之路",
    description:
      "分享我在AI领域做产品经理的心得体会，包括如何理解用户需求、把握产品方向、协调研发团队等实战经验。",
    tags: ["产品经理", "AI产品", "职业发展"],
    contact: "13800138007",
    viewCount: 430,
    likeCount: 67,
    commentCount: 18,
    shareCount: 34,
    isLiked: false,
    comments: [],
  },
  {
    id: "9",
    nickname: "孙志远",
    avatar: "/static/avatar/avatar4.png",
    createTime: "2024-02-25 14:00",
    type: "experience",
    title: "海外求职经验分享",
    description:
      "分享我在英国、新加坡等地求职的经历，包括简历准备、面试技巧、工作签证办理等实用信息。",
    tags: ["海外求职", "面试技巧", "职业规划"],
    contact: "13800138008",
    viewCount: 380,
    likeCount: 56,
    commentCount: 15,
    shareCount: 28,
    isLiked: false,
    comments: [],
  },
  {
    id: "10",
    nickname: "郭明阳",
    avatar: "/static/avatar/avatar5.png",
    createTime: "2024-02-25 16:30",
    type: "experience",
    title: "从传统行业到互联网：我的转型之路",
    description:
      "分享我从传统制造业转型到互联网行业的经历，包括技能提升、思维转变、机会把握等方面的经验。",
    tags: ["职业转型", "自我提升", "经验分享"],
    contact: "13800138009",
    viewCount: 290,
    likeCount: 45,
    commentCount: 12,
    shareCount: 23,
    isLiked: false,
    comments: [],
  },
  {
    id: "11",
    nickname: "李婉婷",
    avatar: "/static/avatar/avatar1.png",
    createTime: "2024-02-25 18:00",
    type: "experience",
    title: "女性工程师的职场成长",
    description:
      "分享作为女性工程师在技术领域的成长经历，包括技术学习、团队协作、平衡工作与生活等方面的心得。",
    tags: ["女性工程师", "职业发展", "工作生活平衡"],
    contact: "13800138010",
    viewCount: 460,
    likeCount: 78,
    commentCount: 25,
    shareCount: 39,
    isLiked: false,
    comments: [],
  },
];

// 获取资源列表
export const getResources = (params = {}) => {
  const { keyword, type } = params;
  let result = [...resources];

  if (keyword) {
    result = result.filter(
      (resource) =>
        resource.title.includes(keyword) ||
        resource.description.includes(keyword)
    );
  }

  if (type && type !== "all") {
    result = result.filter((resource) => resource.type === type);
  }

  return result;
};

// 获取资源详情
export const getResourceById = (id) => {
  return resources.find((resource) => resource.id === id);
};

// 创建资源
export const createResource = (data) => {
  const newResource = {
    id: String(resources.length + 1),
    ...data,
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isLiked: false,
    comments: [],
  };
  resources.push(newResource);
  return newResource;
};

// 点赞资源
export const likeResource = (resourceId) => {
  const resource = resources.find((resource) => resource.id === resourceId);
  if (resource) {
    resource.isLiked = !resource.isLiked;
    resource.likeCount += resource.isLiked ? 1 : -1;
    return true;
  }
  return false;
};

// 评论资源
export const commentResource = (resourceId, user, content) => {
  const resource = resources.find((resource) => resource.id === resourceId);
  if (resource) {
    const comment = {
      id: String(resource.comments.length + 1),
      nickname: user.nickname,
      avatar: user.avatar,
      content,
      createTime: new Date().toLocaleString(),
    };
    resource.comments.unshift(comment);
    resource.commentCount++;
    return comment;
  }
  return null;
};
