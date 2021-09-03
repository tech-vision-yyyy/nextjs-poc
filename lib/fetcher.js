// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = (...args) => {
  console.log(`fetcher: ${JSON.stringify(...args)}`);
  fetch(...args).then((res) => res.json());
};

export default fetcher;
