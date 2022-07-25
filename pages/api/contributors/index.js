// API to get all contributors of codinasion
export default async function handler(req, res) {
  const contributors = await fetch(
    `https://raw.githubusercontent.com/codinasion/codinasion-data/master/data/contributors.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  res.setHeader("Content-Type", "application/json");
  return res.send(contributors);
}
