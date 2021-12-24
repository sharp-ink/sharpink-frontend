
export interface ThreadSearch {
    criteria: Criteria;
    sort?: Sort;
}

interface Criteria {
    title?: string;
    authorName?: string;
    keyWords?: string;
}

interface Sort {
    title?: SortType;
    authorName?: SortType;
}

enum SortType {
    NONE, ASC, DESC
}
