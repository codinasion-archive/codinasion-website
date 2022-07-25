// humans.txt
export default async function handler(req, res) {
  const text = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/${"humans.txt"}`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => res.text())
    .catch((error) => console.log(error));

  res.setHeader("Content-Type", "text/plain");
  return res.send(text);
}
