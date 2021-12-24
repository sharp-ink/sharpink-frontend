
export interface StorySearch {
    criteria: Criteria;
    sort?: Sort;
}

interface Criteria {
    title?: string;
    authorName?: string;
}

interface Sort {
    title?: SortType;
    authorName?: SortType;
}

enum SortType {
    NONE, ASC, DESC
}
