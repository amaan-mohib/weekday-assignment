export const apiCaller = async (limit = 10, offset = 0) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const result = await response.text();
    return result;
  } catch (error) {
    console.log(error);
    return "";
  }
};
