import { createApp } from "./app";
import { env } from "./config/env";

const port = env.PORT;

const app = createApp();
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
