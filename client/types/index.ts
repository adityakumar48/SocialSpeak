export interface roomType {
  id: number;
  topic: string;
  description: string;
  speaker: {
    id: number;
    name: string;
    avatar: string;
  }[];
  listeners: number;
}
