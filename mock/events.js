// 活动列表
export const events = [
  {
    id: "1",
    title: "2024届校友聚会",
    cover: "/static/images/activity1.jpg",
    time: "2024-03-01 14:00",
    location: "深圳市南山区",
    participantCount: 128,
    maxParticipants: 200,
    interestedCount: 256,
    fee: 0,
    deadline: "2024-02-28",
    contact: "13800138000",
    description:
      "这是一场专属于2024届校友的聚会活动，让我们相聚在这里，分享各自的故事，畅谈未来的发展。",
    notice:
      "1. 请准时到场\n2. 请带好身份证\n3. 请遵守活动规则\n4. 如有特殊情况请提前联系主办方",
    status: "upcoming",
    participants: [
      {
        id: "1",
        nickname: "张三",
        avatar: "/static/avatar/avatar1.png",
      },
    ],
    comments: [
      {
        id: "1",
        nickname: "李四",
        avatar: "/static/avatar/avatar2.png",
        content: "期待参加这次活动！",
        createTime: "2024-02-23 14:30",
      },
    ],
  },
  {
    id: "2",
    title: "校友企业参观交流",
    cover: "/static/images/activity2.jpg",
    time: "2024-03-15 10:00",
    location: "深圳市南山区科技园",
    participantCount: 50,
    maxParticipants: 100,
    interestedCount: 128,
    fee: 0,
    deadline: "2024-03-10",
    contact: "13800138001",
    description: "组织校友参观优秀校友企业，交流经验，探讨合作机会。",
    notice:
      "1. 请准时到达指定集合地点\n2. 请携带好个人身份证件\n3. 参观过程中请遵守秩序",
    status: "upcoming",
    participants: [],
    comments: [],
  },
  {
    id: "3",
    title: "校友创业分享会",
    cover: "/static/images/activity3.jpg",
    time: "2024-03-20 19:00",
    location: "线上会议",
    participantCount: 200,
    maxParticipants: 500,
    interestedCount: 356,
    fee: 0,
    deadline: "2024-03-19",
    contact: "13800138002",
    description: "邀请成功创业的校友分享创业经验，探讨创业过程中的机遇与挑战。",
    notice:
      "1. 请提前安装好会议软件\n2. 会议期间请保持安静\n3. 问答环节有序提问",
    status: "upcoming",
    participants: [
      {
        id: "2",
        nickname: "王五",
        avatar: "/static/avatar/avatar3.png",
      },
    ],
    comments: [
      {
        id: "2",
        nickname: "小明",
        avatar: "/static/avatar/avatar4.png",
        content: "正好想了解创业相关的经验！",
        createTime: "2024-02-24 10:30",
      },
    ],
  },
  {
    id: "4",
    title: "校友足球联赛",
    cover: "/static/images/activity4.jpg",
    time: "2024-04-01 09:00",
    location: "深圳市福田区体育中心",
    participantCount: 80,
    maxParticipants: 120,
    interestedCount: 168,
    fee: 50,
    deadline: "2024-03-25",
    contact: "13800138003",
    description: "组织校友足球联赛，增进友谊，强健体魄。",
    notice: "1. 请自备运动装备\n2. 请提前热身\n3. 注意安全",
    status: "upcoming",
    participants: [],
    comments: [],
  },
  {
    id: "5",
    title: "校友读书会",
    cover: "/static/images/activity5.jpg",
    time: "2024-03-30 14:30",
    location: "深圳市南山区图书馆",
    participantCount: 30,
    maxParticipants: 50,
    interestedCount: 89,
    fee: 0,
    deadline: "2024-03-29",
    contact: "13800138004",
    description: "本期读书会主题：《未来简史》，探讨人工智能时代的机遇与挑战。",
    notice: "1. 请提前阅读指定书籍\n2. 请准备好分享内容\n3. 遵守图书馆规则",
    status: "upcoming",
    participants: [],
    comments: [],
  },
  {
    id: "6",
    title: "校友摄影展",
    cover: "/static/images/activity6.jpg",
    time: "2024-04-15 10:00",
    location: "深圳市福田区文化馆",
    participantCount: 40,
    maxParticipants: 80,
    interestedCount: 145,
    fee: 0,
    deadline: "2024-04-10",
    contact: "13800138005",
    description: "展出校友摄影作品，分享摄影技巧和心得。",
    notice: "1. 参展作品需提前报名\n2. 作品需注明作者信息\n3. 遵守展览规则",
    status: "upcoming",
    participants: [],
    comments: [],
  },
];

// 获取活动列表
export const getEvents = (params = {}) => {
  const { keyword, status } = params;
  let result = [...events];

  if (keyword) {
    result = result.filter(
      (event) =>
        event.title.includes(keyword) || event.description.includes(keyword)
    );
  }

  if (status) {
    result = result.filter((event) => event.status === status);
  }

  return result;
};

// 获取活动详情
export const getEventById = (id) => {
  return events.find((event) => event.id === id);
};

// 创建活动
export const createEvent = (data) => {
  const newEvent = {
    id: String(events.length + 1),
    ...data,
    participantCount: 0,
    interestedCount: 0,
    status: "upcoming",
    participants: [],
    comments: [],
  };
  events.push(newEvent);
  return newEvent;
};

// 报名活动
export const joinEvent = (eventId, user) => {
  const event = events.find((event) => event.id === eventId);
  if (event) {
    event.participants.push({
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
    });
    event.participantCount++;
    return true;
  }
  return false;
};

// 评论活动
export const commentEvent = (eventId, user, content) => {
  const event = events.find((event) => event.id === eventId);
  if (event) {
    const comment = {
      id: String(event.comments.length + 1),
      nickname: user.nickname,
      avatar: user.avatar,
      content,
      createTime: new Date().toLocaleString(),
    };
    event.comments.unshift(comment);
    return comment;
  }
  return null;
};
