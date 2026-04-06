const input = require('./schema.json');

const tables = {};
for (const { table_name, column_name, data_type
} of input) {
  if (!tables[table_name
  ]) tables[table_name
  ] = {};
  tables[table_name
  ][column_name
  ] = data_type;
}

const output = Object.entries(tables).map(([table_name, columns
]) => ({ table_name, columns
}));

console.log(JSON.stringify(output,
null,
2));