## Run dev

```besh
npm i -g adonis
adonis new project_name
cd project_name
adonis serve --dev
```

### Prod

```besh
npm i -g pm2
pm2 start server.js
```

## Model

```besh
adonis make:model XXX --migration
```

### Migrations

```besh
adonis migration:reset
adonis migration:run
```

### node 須為 10 版，可用 10.22.0

### 所有 log 必須至少一筆資料
