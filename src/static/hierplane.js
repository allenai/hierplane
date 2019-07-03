import { Tree } from '../module/index.js';

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Renders a hierplane tree visualization from the provided tree.
 *
 * @param   {Object}    tree                      The tree to render.
 * @param   {Object}    [options]                 Optional command options.
 * @param   {string}    [options.target='body']   The element into which the tree should be rendered, this
 *                                                defaults to document.body.
 * @param   {string}    [options.theme='dark']    The theme to use, can be "light" or undefined.
 * @returns {function}  unmount                   A function which ummounts the resulting Component.
 */
export function renderTree(tree, options = { target: 'body', theme: 'dark' }) {
  const node = document.querySelector(options.target)
  ReactDOM.render(
    <Tree tree={tree} theme={options.theme ? options.theme : undefined} />,
    node
  );
  return function unmount() {
    ReactDOM.unmountComponentAtNode(node.firstElementChild)
  };
}
