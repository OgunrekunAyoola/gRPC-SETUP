const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "proto", "service.proto");

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const demoProto = grpc.loadPackageDefinition(packageDefinition).demo;

// Implement the gRPC service method
function getData(call, callback) {
  const id = call.request.id;
  callback(null, { message: `Data for ID ${id}` });
}

function main() {
  const server = new grpc.Server();
  server.addService(demoProto.DemoService.service, { getData });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("Server running on port 50051");
      server.start();
    }
  );
}

main();
