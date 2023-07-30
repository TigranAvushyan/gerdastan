export function listToTree<
  T extends { id: number; firstName: string; parentId: null | number; children?: T[] },
>(list: T[]): T[] {
  const map: any = {};
  let node;
  const roots = [];
  let i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i;
    list[i].children = [];
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== null) {
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
