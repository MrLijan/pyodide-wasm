const editor = document.getElementById('editor');
const terminal = document.getElementById('terminal');
const runBtn = document.getElementById('run-btn');

runBtn.addEventListener('click', async () => {
  await runCode(editor.value)
});



// PYODIDE
let pyodide = null

async function load() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/"
  });

  return pyodide
}
let pyodideReadyPromise = load();

// FUNCTIONALITY
async function runCode() {
  let pyodide = await pyodideReadyPromise;
  try {
    let output = await pyodide.runPython(editor.value);
    addToTerminal(output)
  } catch (err) {
    addToTerminal(err);
  }
}

function addToTerminal(value) {
  terminal.innerText += `>>>  ${value} \n\n`
}