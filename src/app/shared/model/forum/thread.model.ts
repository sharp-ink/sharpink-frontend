import { MessageResponse } from './message.model';

export interface Thread {
    id: number;
    authorNickname: string;
    title: string;
    creationDate: string; // date au format 'yyyyMMdd HH:mm:ss'
    messageCount: number;
    lastMessage?: MessageResponse;
}
