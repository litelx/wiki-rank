export class Node {
    constructor(
        public id: number,
        public depth: ELevel,
        public role: ERole,
        public name: string,
        public parent: Node,
        public child: Node[] = null
    ) {}
}

export enum ERole {
    Connection,
    Database,
    Schema,
    Table,
    Column
}

export enum ELevel {
    Connection,
    Database,
    Schema,
    Table,
    Column
}
