export const fetchData = async () => {
  try {
    const response = await fetch('/data.json');
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Ошибка загрузки данных");
    }
  } catch (error) {
    console.error("Ошибка при получении данных", error);
  }
};