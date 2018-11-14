export const readJsonDataAsync = (file: File) => {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.onload = (event: any) => {
      const jsonData = JSON.parse(event.target.result);
      return resolve(jsonData);
    };
    fr.readAsText(file);
  });
};
