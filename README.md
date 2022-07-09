![logo](https://user-images.githubusercontent.com/38299309/178088457-dbb4e3e1-acb8-4dbf-a7f3-166a4cc334c5.png)


We in storm mode, baby.

## API Spec

| Type   | Endpoint                | Body                                | Headers              | Response                            |
| ------ | ----------------------- | ----------------------------------- | -------------------- | ----------------------------------- |
| `POST` | `/api/postVideoSources` | `{ title: string; url: string; }[]` | `{ token: string; }` | `{ title: string; url: string; }[]` |
| `GET`  | `/api/getVideoSources`  | --                                  | --                   | `{ title: string; url: string; }[]` |
| `GET`  | `/api/getAuth`          | --                                  | `{ token: string; }` | `boolean`                           |
