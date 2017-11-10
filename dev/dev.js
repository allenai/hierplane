/**
 * Sample trees to be used while developing locally, using `dev/static.html`.
 */
(function() {
  const sampleTrees = [];

  function renderSelectTreeUI(onTreeChanged = () => {}) {
    return (
      fetch('/api/samples')
        .then(res => res.json())
        .then(samples => {
          sampleTrees.push.apply(sampleTrees, samples);

          const div = document.createElement('div');
          div.classList.add('hpdev__select-tree');

          const select = document.createElement('select');
          select.addEventListener('change', onTreeChanged);

          sampleTrees.forEach((tree, idx) => {
            const option = document.createElement('option');
            option.setAttribute('value', idx);
            option.textContent = tree.text;
            select.appendChild(option);
          });

          div.appendChild(select);

          document.body.insertBefore(div, document.body.firstElementChild);

          renderTree(0);
        })
        .catch(err => {
          console.error('Error fetching sample trees:', err);
        })
    );
  };

  function getTreeAtIdx(idx) {
    if (idx < 0 || idx >= sampleTrees.length) {
      throw new Error(`No tree at index ${idx}`);
    }
    return sampleTrees[idx];
  };

  const containerId = 'tree';
  const container = document.getElementById(containerId);
  function renderTree(idx) {
    if (container.firstElementChild) {
      container.removeChild(container.firstElementChild);
    }
    hierplane.renderTree(getTreeAtIdx(idx), { target: `#${containerId}` });
  }

  renderSelectTreeUI(event => { renderTree(event.target.value) })
})();
