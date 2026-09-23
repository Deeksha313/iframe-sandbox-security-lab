/**
 * Simple Sandbox Lab
 * ------------------
 * LOCAL TRAINING TOOL - INTENTIONALLY VULNERABLE - LOCALHOST ONLY
 *
 * One job: let you paste ANY HTML/JS, store it unsanitized, and render it
 * inside a document that is only ever loaded through a sandboxed <iframe>.
 * Toggling the sandbox permissions in the UI changes what that pasted code
 * can actually do - which is the entire point of the lab.
 *
 * No restrictions are placed on what you can paste. The server does not
 * inspect, filter, or validate the payload in any way.
 */

const express = require("express");
const app = express();

const HOST = "127.0.0.1";
const PORT = 3000;

// In-memory only - intentionally simple, resets when the server restarts.
let storedPayload = `<script>\ndocument.body.innerHTML = "<h2>Hello from inside the iframe</h2>";\n</script>`;

app.use(express.json({ limit: "2mb" })); // generous limit - paste whatever you want
app.use(express.static("public"));

// Store whatever was pasted, no sanitization, no validation.
app.post("/store", (req, res) => {
  storedPayload = typeof req.body.payload === "string" ? req.body.payload : "";
  res.json({ ok: true });
});

// Serve the pasted content as a standalone document. This route is NEVER
// inserted into the main page's own DOM - it is only ever loaded via
// <iframe sandbox="...">, which is what actually restricts it.
app.get("/render", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>sandboxed render</title></head>
<body>
<!-- A single harmless element the "reach the parent" test is allowed to touch. -->
<script>
window.reportResult = function (label, ok, detail) {
  try { window.parent.postMessage({ type: "sandbox-result", label, ok, detail }, "*"); } catch (e) {}
};
</script>
${storedPayload}
</body>
</html>`);
});

// A harmless, purely local page for the "navigate the whole tab" test.
// Never navigates anywhere external.
app.get("/navigated", (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Navigated</title></head>
<body style="font-family:sans-serif; padding:40px;">
<h2>The top-level tab was navigated here.</h2>
<p>This confirms the sandboxed iframe's script was able to control top-level navigation.</p>
<p><a href="/">Go back</a></p>
</body></html>`);
});

app.listen(PORT, HOST, () => {
  console.log(`Simple Sandbox Lab running at http://${HOST}:${PORT}`);
  console.log("LOCAL TRAINING TOOL - INTENTIONALLY VULNERABLE - DO NOT DEPLOY");
});
