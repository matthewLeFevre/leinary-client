const ENVIORNMENT = "http://localhost:3333";

export async function request({
  method = "get",
  path,
  auth = false,
  data = {},
}) {
  const token = localStorage.getItem("token");
  try {
    const headers = {
      Accept: "application/json",
      "Content-type": "application/json",
    };
    if (auth && token) headers.Authorization = "Bearer " + token;
    const config = {
      method,
      headers,
    };

    if (method.toLowerCase() !== "get" && method.toLowerCase() !== "delete") {
      config.body = JSON.stringify(data);
    }
    const response = await fetch(ENVIORNMENT + path, config);
    const processedResponse = await response.json();
    processedResponse.status = response.status;
    return processedResponse;
  } catch (err) {
    console.error(err);
  }
}
