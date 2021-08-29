# storms.watch

We in storm mode, baby.

## API Spec

| Type   | Endpoint                | Body                                | Headers              | Response                            |
| ------ | ----------------------- | ----------------------------------- | -------------------- | ----------------------------------- |
| `POST` | `/api/postVideoSources` | `{ title: string; url: string; }[]` | `{ token: string; }` | `{ title: string; url: string; }[]` |
| `GET`  | `/api/getVideoSources`  | --                                  | --                   | `{ title: string; url: string; }[]` |
| `GET`  | `/api/getAuth`          | --                                  | `{ token: string; }` | `boolean`                           |
