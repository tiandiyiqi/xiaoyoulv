import { eventApi } from 'mock';

export interface Event {
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

export interface EventParams {
  keyword?: string;
  status?: 'upcoming' | 'ongoing' | 'ended';
}

export const getEvents = (params?: EventParams) => {
  return eventApi.getEvents(params);
};

export const getEventById = (id: string) => {
  return eventApi.getEventById(id);
};

export const createEvent = (data: Partial<Event>) => {
  return eventApi.createEvent(data);
};

export const joinEvent = (eventId: string, user: { id: string; nickname: string; avatar: string }) => {
  return eventApi.joinEvent(eventId, user);
};

export const commentEvent = (eventId: string, user: { nickname: string; avatar: string }, content: string) => {
  return eventApi.commentEvent(eventId, user, content);
}; 