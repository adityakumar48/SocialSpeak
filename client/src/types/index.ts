export interface roomType {
  id: string;
  createdAt: string;
  ownerId: {
    id: number;
    name: string;
    avatar: string;
    activated: boolean;
  };
  roomName: string;
  roomType: string;
  speakers: {
    id: number;
    name: string;
    avatar: string;
  }[];
  listeners: number;
}

export interface UserType {
  id: number;
  name: string;
  avatar: string;
  activated: boolean;
}
