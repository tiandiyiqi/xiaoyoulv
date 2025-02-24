// 用户列表
export const users = [
  {
    id: "1",
    username: "zhangsan",
    nickname: "张三",
    avatar: "/static/avatar/default.png",
    phone: "13800138000",
    email: "zhangsan@example.com",
    realName: "张三",
    gender: 1,
    region: ["广东省", "深圳市", "南山区"],
    education: [
      {
        school: "深圳大学",
        major: "计算机科学与技术",
        degree: "本科",
        startYear: "2016",
        endYear: "2020",
      },
    ],
    work: [
      {
        company: "腾讯科技",
        position: "前端工程师",
        startDate: "2020-07",
        endDate: "2024-02",
        description: "负责公司核心产品的前端开发工作",
      },
    ],
  },
  {
    id: "2",
    username: "lisi",
    nickname: "李四",
    avatar: "/static/avatar/default.png",
    phone: "13800138001",
    email: "lisi@example.com",
    realName: "李四",
    gender: 1,
    region: ["广东省", "深圳市", "福田区"],
    education: [
      {
        school: "华南理工大学",
        major: "软件工程",
        degree: "本科",
        startYear: "2016",
        endYear: "2020",
      },
    ],
    work: [
      {
        company: "阿里巴巴",
        position: "后端工程师",
        startDate: "2020-07",
        endDate: "2024-02",
        description: "负责公司核心系统的后端开发工作",
      },
    ],
  },
];

// 登录
export const login = (username, password) => {
  const user = users.find((u) => u.username === username);
  if (user) {
    return {
      token: "mock_token",
      userInfo: user,
    };
  }
  return null;
};

// 注册
export const register = (data) => {
  const newUser = {
    id: String(users.length + 1),
    ...data,
    avatar: "/static/avatar/default.png",
  };
  users.push(newUser);
  return {
    token: "mock_token",
    userInfo: newUser,
  };
};
