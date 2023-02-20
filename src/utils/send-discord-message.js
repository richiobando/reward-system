import fetch from "node-fetch";

// const issueNumber = process.env.GITHUB_HEAD_REF.split("/").pop();
const issueName = process.env.INPUT_ISSUE_NUMBER;
const issueDescription = process.INPUT_ISSUE_DESCRIPTION;
const reward = 10;
const username = "username_de_discord";

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const data = {
  username: "GitHub Action",
  content: `El pull request #${issueName} ha sido mergeado en Develop. 
  Descripcion: ${issueDescription}
  Se otorgan ${reward} puntos a ${username}.`,
};

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then(() => console.log("Mensaje enviado correctamente."))
  .catch((error) => console.error("Error al enviar mensaje:", error));
