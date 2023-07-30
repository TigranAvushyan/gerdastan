type ExtendsType = {
  target: {
    value: string;
  };
};
export const withChange =
  <T extends ExtendsType>(callback: (value: string) => void) =>
  (e: T) => {
    callback(e.target.value);
  };
