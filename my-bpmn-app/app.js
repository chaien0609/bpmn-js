// Default "New Diagram" XML
const newDiagramXML = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
  'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
  'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
  'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
  'targetNamespace="http://bpmn.io/schema/bpmn" ' +
  'id="Definitions_1">' +
  '<bpmn:process id="Process_1" isExecutable="false">' +
  '<bpmn:startEvent id="StartEvent_1"/>' +
  '</bpmn:process>' +
  '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
  '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
  '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
  '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
  '</bpmndi:BPMNShape>' +
  '</bpmndi:BPMNPlane>' +
  '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';

// Modeler instance
const bpmnModeler = new BpmnJS({
  container: '#canvas',
  keyboard: {
    bindTo: window
  }
});

/**
 * Open diagram in our modeler instance.
 *
 * @param {String} bpmnXML diagram to display
 */
async function openDiagram(xml) {
  try {
    await bpmnModeler.importXML(xml);

    // Access modeler components
    const canvas = bpmnModeler.get('canvas');

    // Zoom to fit full viewport
    canvas.zoom('fit-viewport');

    console.log('Diagram loaded!');
  } catch (err) {
    console.error('Could not import BPMN 2.0 diagram', err);
    alert('Could not import BPMN 2.0 diagram: ' + err.message);
  }
}

// --- Toolbar Functions ---

async function createNew() {
  if (confirm('Create new diagram? Any unsaved changes will be lost.')) {
    openDiagram(newDiagramXML);
  }
}

function openFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const xml = e.target.result;
    openDiagram(xml);
  };
  reader.readAsText(file);

  // Reset input so same file can be selected again
  e.target.value = '';
}

async function saveDiagram() {
  try {
    const result = await bpmnModeler.saveXML({ format: true });
    downloadFile('diagram.bpmn', result.xml);
  } catch (err) {
    console.error('Could not save BPMN 2.0 diagram', err);
  }
}

async function saveSVG() {
  try {
    const result = await bpmnModeler.saveSVG();
    downloadFile('diagram.svg', result.svg);
  } catch (err) {
    console.error('Could not save SVG', err);
  }
}

function downloadFile(name, data) {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function zoom(val) {
  const canvas = bpmnModeler.get('canvas');
  const currentZoom = canvas.zoom();

  if (val === 0) {
    canvas.zoom('fit-viewport');
  } else if (val === 1) {
    canvas.zoom(currentZoom * 1.2);
  } else if (val === -1) {
    canvas.zoom(currentZoom * 0.8);
  }
}

function detectOS() {
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? 'mac' : 'windows';
}

function initializeKeyboardShortcuts() {
  const isMac = detectOS() === 'mac';
  const bindings = document.querySelectorAll('.binding[data-mac]');
  
  bindings.forEach(binding => {
    const text = isMac ? binding.getAttribute('data-mac') : binding.getAttribute('data-windows');
    binding.textContent = text;
  });
}

function showShortcuts() {
  initializeKeyboardShortcuts();
  const dialog = document.getElementById('shortcuts-dialog');
  dialog.classList.add('open');
  
  // Close dialog when clicking outside
  setTimeout(() => {
    document.addEventListener('click', handleDialogOutsideClick);
  }, 0);
}

function hideShortcuts() {
  document.getElementById('shortcuts-dialog').classList.remove('open');
  document.removeEventListener('click', handleDialogOutsideClick);
}

function handleDialogOutsideClick(e) {
  const dialog = document.getElementById('shortcuts-dialog');
  const content = dialog.querySelector('.content');
  
  // Close if clicking on the overlay (not on the content)
  if (!content.contains(e.target) && dialog.classList.contains('open')) {
    hideShortcuts();
  }
}

// Setup global keyboard shortcuts
function setupGlobalShortcuts() {
  window.addEventListener('keydown', function(e) {
    const isMac = detectOS() === 'mac';
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    
    // ⌘ + S (Mac) or Ctrl + S (Windows) - Save BPMN diagram
    if (cmdOrCtrl && e.code === 'KeyS') {
      e.preventDefault();
      saveDiagram();
    }
    
    // ⌘ + O (Mac) or Ctrl + O (Windows) - Open diagram from file
    if (cmdOrCtrl && e.code === 'KeyO') {
      e.preventDefault();
      document.getElementById('file-input').click();
    }
    
    // ESC - Close dialog
    if (e.code === 'Escape') {
      const dialog = document.getElementById('shortcuts-dialog');
      if (dialog.classList.contains('open')) {
        e.preventDefault();
        hideShortcuts();
      }
    }
  });
}

// Initialize with new diagram
openDiagram(newDiagramXML);
setupGlobalShortcuts();
