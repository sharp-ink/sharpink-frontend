
export interface Message {
    id: number;
    threadId: number;
    threadTitle: string;
    authorId: number;
    authorNickname: string;
    publicationDate: Date;
    number: number;
    content: string;
}
