type ExtendsType = {
  preventDefault: () => void;
};
export const withPreventDefault =
  <T extends ExtendsType>(callback: () => void) =>
  (e: T) => {
    e.preventDefault();
    callback();
  };
