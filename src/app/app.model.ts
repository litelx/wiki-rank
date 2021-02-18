export type ArtistAlbums = {
    href: string,
    items: AlbumItem[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
};

export type AlbumItem = {
    album_type: string,
    available_markets: string[],
    external_urls: any,
    href: string,
    id: string,
    images: ImageItem[],
    name: string,
    type: string,
    uri: string,
    release_date?: string
    artists?: any[]
}

export type ImageItem = {
    height: number,
    url: string,
    width: number
}
