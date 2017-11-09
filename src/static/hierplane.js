import { Tree } from '../module/index.js';

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Renders a hierplane tree visualization from the provided tree.
 *
 * @param  {Object} tree                    The tree to render.
 * @param  {Object} [options]               Optional command options.
 * @param  {string} [options.target='body'] The element into which the tree should be rendered, this
 *                                          defaults to document.body.
 * @return {undefined}
 */
export function renderTree(tree, options = { target: 'body' }) {
  ReactDOM.render(
    <Tree tree={tree} readOnly={true} showSidebar={false} />,
    document.querySelector(options.target)
  );
}
