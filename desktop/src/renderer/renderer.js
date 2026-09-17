(() => {
  const state = {
    step: 1,
    stacks: [],
    selectedStacks: new Set(),
    fileKey: null,
    tokenRead: '',
    tokenPublish: '',
    analyzeResult: null,
    applied: false,
    parsedOk: false,
  };

  const $ = (id) => document.getElementById(id);
  const logOutput = $('log-output');

  function log(line) {
    logOutput.textContent += line;
    logOutput.scrollTop = logOutput.scrollHeight;
  }

  window.dsfr.onConnectOutput(log);

  // --- Boîte de confirmation générique ---------------------------------------
  function confirm(message) {
    return new Promise((resolve) => {
      const dialog = $('confirm-dialog');
      $('confirm-message').textContent = message;
      const onCancel = () => { dialog.close(); cleanup(); resolve(false); };
      const onOk = () => { dialog.close(); cleanup(); resolve(true); };
      function cleanup() {
        $('confirm-cancel').removeEventListener('click', onCancel);
        $('confirm-ok').removeEventListener('click', onOk);
      }
      $('confirm-cancel').addEventListener('click', onCancel);
      $('confirm-ok').addEventListener('click', onOk);
      dialog.showModal();
    });
  }

  // --- Navigation entre écrans -------------------------------------------------
  const STEP_TITLES = [
    'Sélection des stacks',
    'Connexion à Figma',
    'Analyse du fichier Figma',
    'Application du rebranchement',
    'Parser et publier',
  ];

  function canLeaveStep(step) {
    if (step === 1) return state.selectedStacks.size > 0;
    if (step === 2) return Boolean(state.fileKey) && Boolean(state.tokenRead);
    return true;
  }

  function showStep(step) {
    for (let i = 1; i <= 5; i++) {
      $(`screen-${i}`).hidden = i !== step;
    }
    state.step = step;

    $('stepper-title').textContent = STEP_TITLES[step - 1];
    $('stepper-state').textContent = `Étape ${step} sur 5`;
    $('stepper-steps').dataset.frCurrentStep = String(step);
    const detailsEl = $('stepper-details');
    detailsEl.replaceChildren();
    if (step < 5) {
      const strong = document.createElement('span');
      strong.className = 'fr-text--bold';
      strong.textContent = 'Étape suivante : ';
      detailsEl.appendChild(strong);
      detailsEl.appendChild(document.createTextNode(STEP_TITLES[step]));
    }

    $('btn-back').disabled = step === 1;
    $('btn-next').textContent = step === 5 ? 'Terminé' : 'Suivant';
    $('btn-next').disabled = step === 5;

    // Déplace le focus sur le titre de l'étape : sans ça, un changement d'écran
    // au clavier ou au lecteur d'écran passe inaperçu (le focus reste sur le
    // bouton Suivant/Retour de l'écran précédent).
    document.querySelector('.fr-stepper__title').focus();
  }

  $('btn-next').addEventListener('click', () => {
    if (!canLeaveStep(state.step)) return;
    if (state.step < 5) showStep(state.step + 1);
  });
  $('btn-back').addEventListener('click', () => {
    if (state.step > 1) showStep(state.step - 1);
  });

  // --- Étape 1 : stacks --------------------------------------------------------
  async function initStacks() {
    state.stacks = await window.dsfr.listStacks();
    const container = $('stacks-list');
    container.replaceChildren();
    for (const stack of state.stacks) {
      state.selectedStacks.add(stack.id);

      const element = document.createElement('div');
      element.className = 'fr-fieldset__element';

      const wrapper = document.createElement('div');
      wrapper.className = 'fr-checkbox-group';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `stack-${stack.id}`;
      checkbox.checked = true;
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) state.selectedStacks.add(stack.id);
        else state.selectedStacks.delete(stack.id);
      });

      const label = document.createElement('label');
      label.className = 'fr-label';
      label.htmlFor = checkbox.id;
      label.textContent = `${stack.label} (${stack.description})`;

      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      element.appendChild(wrapper);
      container.appendChild(element);
    }
  }

  // --- Étape 2 : connexion Figma ------------------------------------------------
  const TOKEN_DOCS_URL = 'https://www.figma.com/developers/api#access-tokens';
  $('link-token-read').href = TOKEN_DOCS_URL;
  $('link-token-publish').href = TOKEN_DOCS_URL;
  for (const id of ['link-token-read', 'link-token-publish']) {
    $(id).addEventListener('click', (e) => {
      e.preventDefault();
      window.dsfr.openExternal(TOKEN_DOCS_URL);
    });
  }

  $('figma-url').addEventListener('change', async (e) => {
    const key = await window.dsfr.extractFileKey(e.target.value);
    state.fileKey = key;
    $('filekey-hint').textContent = key
      ? `fileKey détecté : ${key}`
      : "URL non reconnue : vérifiez qu'il s'agit bien d'un lien vers un fichier Figma.";
  });

  $('token-read').addEventListener('input', (e) => { state.tokenRead = e.target.value; });
  $('token-publish').addEventListener('input', (e) => { state.tokenPublish = e.target.value; });

  $('same-token').addEventListener('change', (e) => {
    const publishInput = $('token-publish');
    publishInput.disabled = e.target.checked;
    if (e.target.checked) {
      publishInput.value = state.tokenRead;
      state.tokenPublish = state.tokenRead;
    }
  });

  $('test-token-read').addEventListener('click', async () => {
    const statusEl = $('status-token-read');
    statusEl.textContent = 'Test en cours...';
    statusEl.className = 'status';
    const result = await window.dsfr.testToken(state.tokenRead);
    if (result.ok) {
      statusEl.textContent = `Connecté en tant que ${result.handle ?? result.email ?? 'utilisateur Figma'}.`;
      statusEl.className = 'status ok';
    } else {
      statusEl.textContent = `Échec : ${result.error}`;
      statusEl.className = 'status error';
    }
  });

  // --- Étape 3 : analyse ---------------------------------------------------------
  $('btn-analyze').addEventListener('click', async () => {
    const btn = $('btn-analyze');
    btn.disabled = true;
    btn.textContent = 'Analyse en cours...';
    const result = await window.dsfr.analyzeRebind({ fileKey: state.fileKey, token: state.tokenRead });
    btn.disabled = false;
    btn.textContent = 'Analyser';
    if (!result.ok) {
      log(`\nErreur : ${result.error}\n`);
      alert(`Erreur pendant l'analyse : ${result.error}`);
      return;
    }
    state.analyzeResult = result;
    $('count-matched').textContent = result.summary.matched;
    $('count-ambiguous').textContent = result.summary.ambiguous;
    $('count-missing').textContent = result.summary.missing;
    $('analyze-result').hidden = false;
  });

  // --- Étape 4 : application -------------------------------------------------------
  $('btn-apply').addEventListener('click', async () => {
    if (!state.analyzeResult) {
      alert("Lancez d'abord l'analyse (étape 3).");
      return;
    }
    const n = state.analyzeResult.summary.matched;
    const ok = await confirm(
      `Ceci va modifier des fichiers *.figma.ts pour ${n} correspondance(s), dans les stacks sélectionnées. Rien n'est encore publié sur Figma. Continuer ?`,
    );
    if (!ok) return;

    const statusEl = $('status-apply');
    statusEl.textContent = 'Application en cours...';
    statusEl.className = 'status';
    const result = await window.dsfr.applyRebind({
      manifest: state.analyzeResult.manifest,
      matched: state.analyzeResult.matched,
      targetFileKey: state.fileKey,
      stackIds: [...state.selectedStacks],
    });
    if (result.ok) {
      state.applied = true;
      statusEl.textContent = `${result.filesChanged} fichier(s) modifié(s).`;
      statusEl.className = 'status ok';
    } else {
      statusEl.textContent = `Erreur : ${result.error}`;
      statusEl.className = 'status error';
    }
  });

  // --- Étape 5 : parse / publish -----------------------------------------------------
  $('btn-parse').addEventListener('click', async () => {
    const btn = $('btn-parse');
    btn.disabled = true;
    const statusEl = $('status-parse');
    statusEl.textContent = 'Validation en cours...';
    statusEl.className = 'status';
    const results = await window.dsfr.parseStacks({ stackIds: [...state.selectedStacks] });
    btn.disabled = false;
    const allOk = results.every((r) => r.ok);
    state.parsedOk = allOk;
    statusEl.textContent = allOk
      ? 'Validation réussie sur toutes les stacks sélectionnées.'
      : `Échec sur : ${results.filter((r) => !r.ok).map((r) => r.stackId).join(', ')}`;
    statusEl.className = allOk ? 'status ok' : 'status error';
    $('btn-publish').disabled = !allOk;
  });

  $('btn-publish').addEventListener('click', async () => {
    if (!state.parsedOk) return;
    const stacks = [...state.selectedStacks].join(', ');
    const ok = await confirm(
      `Ceci va publier le catalogue vers Figma Dev Mode pour : ${stacks}. C'est visible immédiatement par toute personne ayant accès au fichier Figma. Continuer ?`,
    );
    if (!ok) return;

    const btn = $('btn-publish');
    btn.disabled = true;
    const statusEl = $('status-publish');
    statusEl.textContent = 'Publication en cours...';
    statusEl.className = 'status';
    const results = await window.dsfr.publishStacks({
      stackIds: [...state.selectedStacks],
      token: state.tokenPublish || state.tokenRead,
    });
    const allOk = results.every((r) => r.ok);
    statusEl.textContent = allOk
      ? 'Publication réussie.'
      : `Échec sur : ${results.filter((r) => !r.ok).map((r) => r.stackId).join(', ')}`;
    statusEl.className = allOk ? 'status ok' : 'status error';
    btn.disabled = false;
  });

  // --- Initialisation -------------------------------------------------------------
  initStacks();
  showStep(1);
})();
