
export interface Message {
    id: number;
    threadId: number;
    authorId: number;
    authorNickname: string;
    publicationDate: string; // date au format 'yyyyMMdd HH:mm:ss.SSSSSS'
    number: number;
    content: string;
}
