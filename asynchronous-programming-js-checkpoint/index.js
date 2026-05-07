// Creates a pause before continuing the async flow.
function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// Logs each value one by one with a 1 second delay.
async function iterateWithAsyncAwait(values) {
  for (const value of values) {
    await delay(1000);
    console.log(value);
  }
}

// Simulates an API request that can succeed or fail.
function simulateApiCall(name, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${name} failed`));
        return;
      }

      resolve({ name, message: `Data received from ${name}` });
    }, 1000);
  });
}

// Waits for an API response and handles errors clearly.
async function awaitCall(shouldFail = false) {
  try {
    const data = await simulateApiCall("Main API", shouldFail);
    console.log(data);
  } catch (error) {
    console.log("Sorry, we could not fetch the data. Please try again later.");
  }
}

// The next three functions represent separate async steps.
async function firstAsyncFunction() {
  await delay(1000);
  console.log("First async function finished");
}

async function secondAsyncFunction() {
  await delay(1000);
  console.log("Second async function finished");
}

async function thirdAsyncFunction() {
  await delay(1000);
  console.log("Third async function finished");
}

// Runs async functions in order, waiting for each one to finish.
async function chainedAsyncFunctions() {
  await firstAsyncFunction();
  await secondAsyncFunction();
  await thirdAsyncFunction();
}

// Starts two API calls at the same time and waits for both.
async function concurrentRequests() {
  const results = await Promise.all([
    simulateApiCall("Users API"),
    simulateApiCall("Posts API"),
  ]);

  console.log(results);
}

// Fetches data for all URLs concurrently.
async function parallelCalls(urls) {
  const responses = await Promise.all(
    urls.map((url) => simulateApiCall(url))
  );

  console.log(responses);
}

// Runs each checkpoint example from the terminal.
async function runDemo() {
  console.log("Task 01: Iterating with async/await");
  await iterateWithAsyncAwait(["Apple", "Banana", "Orange"]);

  console.log("\nTask 02: Awaiting a call");
  await awaitCall();

  console.log("\nTask 03: Handling errors with async/await");
  await awaitCall(true);

  console.log("\nChaining async functions");
  await chainedAsyncFunctions();

  console.log("\nTask 04: Awaiting concurrent requests");
  await concurrentRequests();

  console.log("\nTask 05: Awaiting parallel calls");
  await parallelCalls(["/api/products", "/api/orders", "/api/customers"]);
}

runDemo();
