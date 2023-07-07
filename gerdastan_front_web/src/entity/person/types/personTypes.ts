export interface IPerson {
    id: number,
    children: IPerson[],
    parentId: number | null,
    firstName: string,
    lastName: string
}
