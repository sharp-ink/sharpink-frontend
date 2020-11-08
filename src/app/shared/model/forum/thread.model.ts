import { Message } from './message.model';

export interface Thread {
    id: number;
    authorId: number;
    authorNickname: string;
    title: string;
    creationDate: string; // date au format 'yyyyMMdd HH:mm:ss'
    messagesCount: number;
    lastMessage?: Message;
    messages?: Message[];
}
