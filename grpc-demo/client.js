const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "proto", "service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const demoProto = grpc.loadPackageDefinition(packageDefinition).demo;

const client = new demoProto.DemoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.getData({ id: "1234" }, (error, response) => {
  if (!error) {
    console.log("Received:", response.message);
  } else {
    console.error("Client Error:", error);
  }
});
