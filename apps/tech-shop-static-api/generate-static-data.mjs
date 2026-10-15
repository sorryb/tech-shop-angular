import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const database = JSON.parse(await readFile(join(root, 'db.json'), 'utf8'));
const dataDirectory = join(root, 'data');
await mkdir(join(dataDirectory, 'orders'), { recursive: true });

const resources = {
  config: database.config,
  product: database.product,
  categories: database.categories,
  order: database.order,
};

for (const [name, value] of Object.entries(resources)) {
  await writeFile(join(dataDirectory, `${name}.json`), `${JSON.stringify(value, null, 2)}\n`);
}

const routes = Object.keys(resources).map((name) => ({
  route: `/api/${name}`,
  rewrite: `/data/${name}.json`,
  methods: ['GET'],
}));

for (const order of database.order ?? []) {
  if (order.id === undefined || order.id === null) continue;
  const orderId = String(order.id);
  await writeFile(join(dataDirectory, 'orders', `${encodeURIComponent(orderId)}.json`), `${JSON.stringify(order, null, 2)}\n`);
  routes.push({
    route: `/api/order/${encodeURIComponent(orderId)}`,
    rewrite: `/data/orders/${encodeURIComponent(orderId)}.json`,
    methods: ['GET'],
  });
}

routes.push({ route: '/api/*', statusCode: 404 });
await writeFile(
  join(root, 'staticwebapp.config.json'),
  `${JSON.stringify({ routes }, null, 2)}\n`
);
