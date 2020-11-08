
export interface ThreadRequest {
    originalAuthorId: number;
    title: string;
    storyId?: number; // renseigné si le thread est la discussion attitrée d'une histoire
}
