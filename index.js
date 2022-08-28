import server from "./server/server.js";

const port = process.env.PORT || 4001;

server.listen(port, () => {
   console.log(
      `\n*** Server reporting for duty on port: ${port} ***\n`
   );
});
