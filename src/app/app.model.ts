
export type GifUser = {
    username: string;
    isLoggedin: boolean;
    searchHistory: string[];
    gifs: any
}

export type Storage = GifUser[];

export type apiResponse = {
    data: any[];
    pagination: Pagination;
    meta: Meta;
}

export type Pagination = {
    total_count: number;
    count: number;
    offset: number;
}

export type Meta = {
    status: number;
    msg: string;
    response_id: string;
}


export const MAX_HISTORY_LENGHT = 10
export const MAX_GIF_PER_PAGE = 10