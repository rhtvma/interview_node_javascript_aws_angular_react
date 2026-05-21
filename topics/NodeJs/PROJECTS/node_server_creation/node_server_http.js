// Step 1: Import the HTTP module
const http = require('http');
const PORT = 3000

// add defaultHandler method in controller.js
const defaultHandler = (request, response) => {
    response.writeHead(200, {
        "Content-Type": "application/json",
    });
    response.write(
        JSON.stringify({
            message: `API not found at ${request.url}`,
        })
    );
    response.end();
};

// add getHandler method in controller.js
const getHandler = (request, response) => {
    const data = {
        name: "Rohit Verma",
        category: "technology",
        website: "rhtvma.com",
    };
    response.writeHead(200, {
        "Content-Type": "application/json",
    });
    response.write(
        JSON.stringify({
            message: "GET Successful",
            data,
        })
    );
    response.end();
};
// Step 2: Create the server using the http.createServer() method
const server = http.createServer((req, res) => {
    const reqURL = req.url;
    const reqMethod = req.method;
    switch (reqMethod) {
        case "GET": {
            if (reqURL === "/") {
                getHandler(req, res);
            }
            break;
        }
        default: {
            defaultHandler(req, res)
        }
    }
});

// Step 5: Bind the server to a specific port and start listening for incoming connections
server.listen(PORT, () => {
    console.log(`Server running at <http://localhost:${PORT}/>`);
});
