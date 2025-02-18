export const fetchData = async () => {
  try {
    const responseData = await fetch('/data.json');
    const responseNames = await fetch('/names.json');
    
    if (responseData.ok && responseNames.ok) {
      const data = await responseData.json();
      const names = await responseNames.json();
      
      const mergedData = mergeData(data, names);
      return mergedData;
    } else {
      console.error("Ошибка загрузки данных");
    }
  } catch (error) {
    console.error("Ошибка при получении данных", error);
  }
};

const mergeData = (data, names) => {
  const result = Object.entries(names).map(item => {
    const typeId = Number(item[0]) || undefined;
    const typeName = item[1].G || 'Неизвестно';
    const typeData = item[1].B || {};

    const goods = Object.entries(typeData).map(([productId, productName]) => {
      const correspondingGood = data.Value.Goods.find(dataItem => dataItem.T == productId);
      const isValidGood = correspondingGood && correspondingGood.P > 0 ? true : false;

      if (isValidGood) {
        return {
          productId: Number(productId) || undefined,
          typeId: typeId || undefined,
          productName: productName.N || 'Неизвестно',
          typeName,
          price: correspondingGood.C || undefined,
          quantity: correspondingGood.P || undefined,
        }
      }

      return undefined;
    }).filter(product => product !== undefined);

    return {
      typeId,
      typeName,
      goods,
    }
  });

  return result;
};
