interface Mapping {
  key: string
  column: string
  exact: boolean
}

export const buildConditions = (mappings: Mapping[], data: any) => {
  const sqlValues: string[] = [];
  const conditions: string[] = [];

  mappings.forEach(({ key, column, exact }) => {
    if (data[key]) {
      const i = sqlValues.length + 1;
      if (exact) {
        conditions.push(`${column} = $${i}`);
        sqlValues.push(data[key]);
      } else {
        conditions.push(`${column} ILIKE $${i}`);
        sqlValues.push(`%${data[key].replace(/\*/g, '%')}%`);
      }
    }
  });
  return { conditions, sqlValues };
};
