export const getFullName = <Person extends { firstName: string; lastName: string }>(
  person: Person,
) => {
  return `${person.firstName} ${person.lastName}`;
};
