const useFetch = (baseUrl) => {
  async function get(url) {
    try {
      const response = await fetch(baseUrl + url);
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return { get };
};

export default useFetch;
