/* source: https://github.com/andypf/json-viewer/tree/2.2.0 */
/* Edited, Adapted and Improved by vitor.hugo (fork by: https://github.com/vitorhugo1207) - 07/11/2025 */

/* ====================== STYLES (styles.css) ====================== */
const BASE_STYLES = `
.container {
  background-color: var(--base00);
  color: var(--base05);
  padding: 10px;
  letter-spacing: 0.5px;
  font-family: monospace;
  border-radius: 3px;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: solid 1px var(--base02);
  position: absolute;
  top: 4px;
  right: 4%;
  left: 0%;
  background-color: white;
  z-index: 2;
}
.toolbar .options,
.toolbar .search-wrapper {
  display: flex;
  align-items: center;
}
.toolbar .icon-wrapper {
  height: 15px;
  display: flex;
  align-items: center;
  padding: 2px 5px;
}
.toolbar .icon-wrapper:hover {
  background-color: var(--base02);
  border-radius: 3px;
}
.toolbar .icon-wrapper:first-child {
  margin-left: 0px;
}
.toolbar .icon-wrapper.disabled {
  opacity: 0.4;
  pointer-events: none;
}
.toolbar .search.icon {
  margin-right: 5px;
}
.toolbar .search-input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 16px;
  color: var(--base0D);
}
.match {
  background-color: yellow;
  font-weight: bold;
  color: red;
}
.match.current {
  background-color: orange;
  color: #000;
  outline: 1px solid var(--base0D);
}
.data-row {
  padding: 3px 0;
}
.data-row-p {
  padding-top: 16px !important;
}
.data-row .data-row {
  border-left: solid 1px var(--base02);
  padding-left: 20px;
  margin-left: 5px;
  display: none;
}
.data-row.expanded > .data-row {
  display: block;
}
.data-row .key-value-wrapper {
  display: flex;
  align-items: center;
}
.data-row .key {
  color: var(--base07);
}
.data-row .key.number {
  color: var(--base0C);
}
.data-row .colon {
  color: var(--base07);
  margin: 0 5px 0 0;
}
.clickable {
  cursor: pointer;
}
.data-row .opening-parenthesis,
.data-row .closing-parenthesis {
  color: var(--base07);
}
.data-row .ellipsis {
  color: var(--base09);
}
.data-row.expanded > .key-value-wrapper .closing-parenthesis,
.data-row.expanded > .key-value-wrapper .ellipsis {
  display: none;
}
.data-row > .closing-parenthesis {
  display: none;
}
.data-row.expanded > .closing-parenthesis {
  display: inline-block;
}
.data-row .items-size {
  margin-left: 10px;
  color: var(--base04);
  font-style: italic;
  display: none;
}
.show-size .data-row .items-size {
  display: inline-block;
}
.data-row .value.bool,
.data-row .value.boolean {
  color: var(--base0E);
}
.data-row .value.function {
  color: var(--base0D);
}
.data-row .value.int,
.data-row .value.integer {
  color: var(--base0F);
}
.data-row .value.float {
  color: var(--base0B);
}
.data-row .value.string {
  color: var(--base09);
}
.data-row .value.string .content {
  overflow-wrap: break-word;
}
.data-row .value.string .content::before { content: open-quote; }
.data-row .value.string .content::after { content: close-quote; }
.data-row .value.regexp { color: var(--base0A); }
.data-row .value.nan { color: var(--base08); }
.data-row .value.null { color: var(--base0A); }
.data-row .value.undefined { color: var(--base05); }
.data-row .value.date { color: var(--base0D); }
.data-row .value.nan,
.data-row .value.null,
.data-row .value.undefined {
  border-radius: 3px;
  background-color: var(--base02);
  padding: 1px 2px;
}
.data-row .value .type {
  font-size: smaller;
  margin-right: 4px;
  opacity: 0.8;
  display: none;
}
.data-row .value .value-data {
  word-break: break-all;
}
.show-data-types .data-row .value .type {
  display: inline-block;
}
/* ICONS */
.icon-wrapper,
.copy-icon-wrapper {
  display: inline-block;
  cursor: pointer;
}
.icon {
  display: block;
  position: relative;
}
.icon:before,
.icon:after {
  content: "";
  position: absolute;
  display: block;
}
/* expand arrow */
.expand.icon { margin-right: 5px; }
.expand-icon-arrow .expand.icon {
  margin-left: 3px;
  width: 0;
  height: 0;
  border-left: solid 6px var(--base0E);
  border-top: solid 6px transparent;
  border-bottom: solid 6px transparent;
}
.expand-icon-arrow .expanded > .key-value-wrapper .expand.icon,
.expand-icon-arrow .expanded.icon.expand {
  transform: rotate(90deg);
  border-left-color: var(--base0D);
}
/* expand icon square/circle */
.expand-icon-square .expand.icon,
.expand-icon-circle .expand.icon {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  border: solid 1px var(--base0E);
}
.expand-icon-circle .expand.icon { border-radius: 50%; }
.expand-icon-square .expand.icon:before,
.expand-icon-circle .expand.icon:before,
.expand-icon-square .expand.icon:after,
.expand-icon-circle .expand.icon:after {
  width: 5px;
  height: 1px;
  background-color: var(--base0E);
  left: 2px;
  top: 4px;
}
.expand-icon-square .expand.icon:after,
.expand-icon-circle .expand.icon:after { transform: rotate(90deg); }
.expand-icon-square .expanded > .key-value-wrapper .expand.icon:after,
.expand-icon-circle .expanded > .key-value-wrapper .expand.icon:after,
.expand-icon-square .expand.icon.expanded:after,
.expand-icon-circle .expand.icon.expanded:after {
  display: none;
}
.expand-icon-square .expanded > .key-value-wrapper .expand.icon,
.expand-icon-circle .expanded > .key-value-wrapper .expand.icon,
.expand-icon-square .expand.icon.expanded,
.expand-icon-circle .expanded.expand.icon {
  border-color: var(--base0D);
}
.expand-icon-square .expanded > .key-value-wrapper .expand.icon:before,
.expand-icon-circle .expanded > .key-value-wrapper .expand.icon:before,
.expand-icon-square .expanded.expand.icon:before,
.expand-icon-circle .expanded.expand.icon:before {
  background-color: var(--base0D);
}
/* copy icon */
.show-copy .key-value-wrapper:hover .icon.copy { display: block; }
.copy.icon {
  margin-left: 10px;
  display: none;
  width: 8px;
  height: 10px;
  border: solid 1px var(--base0D);
  border-radius: 1px;
  position: relative;
  top: 4px;
  transition: 0.2s all;
}
.copy.icon:active {
  transform: scale(1.6);
  background-color: var(--base0B);
}
.copy.icon:before {
  content: "";
  left: -3px;
  top: -3px;
  width: 8px;
  height: 10px;
  border-top: solid 1px var(--base0D);
  border-left: solid 1px var(--base0D);
  border-radius: 1px 0 0 0;
}
/* plus icon */
.plus.icon {
  width: 11px;
  height: 1px;
  background-color: var(--base0D);
}
.plus.icon:after {
  width: 11px;
  height: 1px;
  background-color: var(--base0D);
  transform: rotate(90deg);
}
/* minus icon */
.minus.icon { width: 11px; height: 1px; background-color: var(--base0D); }
/* indent icon */
.indent.icon {
  color: var(--base0D);
  width: 17px;
  height: 8px;
  border-top: solid 1px var(--base0D);
  border-bottom: solid 1px var(--base0D);
}
.indent.icon:before {
  top: 2px;
  right: 0;
  width: 11px;
  height: 2px;
  border-top: solid 1px var(--base0D);
  border-bottom: solid 1px var(--base0D);
}
.indent.icon:after {
  top: 1px;
  width: 0;
  height: 0;
  border-top: solid 3px transparent;
  border-bottom: solid 3px transparent;
  border-left: solid 3px var(--base0D);
  border-right: solid 3px transparent;
}
/* outdent icon */
.outdent.icon {
  color: var(--base0D);
  margin-left: 2px;
  width: 17px;
  height: 8px;
  border-top: solid 1px var(--base0D);
  border-bottom: solid 1px var(--base0D);
}
.outdent.icon:before {
  top: 2px;
  right: 0;
  width: 11px;
  height: 2px;
  border-top: solid 1px var(--base0D);
  border-bottom: solid 1px var(--base0D);
}
.outdent.icon:after {
  top: 1px;
  left: -3px;
  width: 0;
  height: 0;
  border-top: solid 3px transparent;
  border-bottom: solid 3px transparent;
  border-left: solid 3px transparent;
  border-right: solid 3px var(--base0D);
}
/* refresh icon */
.refresh.icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border-top: solid 1px var(--base0D);
  border-bottom: solid 1px var(--base0D);
  border-left: solid 1px transparent;
  border-right: solid 1px var(--base0D);
}
.refresh.icon:before {
  left: 1px;
  top: 8px;
  width: 3px;
  height: 3px;
  border-top: solid 1px var(--base0D);
  border-left: solid 1px var(--base0D);
  transform: rotate(-22.5deg);
}
/* info icon */
.info.icon {
  width: 12px;
  height: 11px;
  border: solid 1px var(--base0D);
  border-radius: 2px;
}
.info.icon::before {
  top: 5px;
  left: 5px;
  width: 2px;
  height: 5px;
  background-color: var(--base0D);
}
.info.icon::after {
  top: 2px;
  left: 5px;
  width: 2px;
  height: 2px;
  background-color: var(--base0D);
}
.info.icon.active { background-color: var(--base0D); }
.info.icon.active::before,
.info.icon.active::after { background-color: var(--base02); }
/* search icon */
.search.icon {
  width: 11px;
  height: 11px;
  border: solid 1px var(--base0D);
  border-radius: 100%;
  transform: rotate(-45deg);
}
.search.icon:before {
  top: 11px;
  left: 5px;
  height: 6px;
  width: 1px;
  background-color: var(--base0D);
}
/* nav (prev/next) icons */
.nav-left.icon,
.nav-right.icon {
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}
.nav-left.icon { border-right: 8px solid var(--base0D); margin-left: 6px; }
.nav-right.icon { border-left: 8px solid var(--base0D); margin-left: 6px; }
`;

/* ====================== THEMES (themes.js) ====================== */
const THEMES = {
  "default-light": [
    "#ffffff","#e8e8e8","#d8d8d8","#b8b8b8","#585858","#383838","#282828","#181818",
    "#ab4642","#dc9656","#ab4642","#a1b56c","#86c1b9","#7cafc2","#ba8baf","#a16946"
  ],
  "default-dark": [
    "#181818","#282828","#383838","#585858","#b8b8b8","#d8d8d8","#e8e8e8","#f8f8f8",
    "#ab4642","#dc9656","#f7ca88","#a1b56c","#86c1b9","#7cafc2","#ba8baf","#a16946"
  ],
  // (Mantém apenas dois temas para diminuir tamanho; adicione outros conforme necessário)
};

const availableThemes = Object.keys(THEMES);

function themeStyles(nameOrObject) {
  let theme;
  if (typeof nameOrObject === "string") {
    if (!THEMES[nameOrObject]) throw new Error(`${nameOrObject} not found`);
    theme = THEMES[nameOrObject].reduce((map, v, i) => {
      const key = `base0${i.toString(16).toUpperCase()}`;
      map[key] = v;
      return map;
    }, {});
  } else {
    theme = nameOrObject;
  }
  return `.container{${Object.keys(theme).map(k => `--${k}: ${theme[k]};`).join("")}}`;
}

/* ====================== VALIDATORS (validator.js) ====================== */
function validateBoolean(value) {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error("should be a boolean!");
}
function validateString(value) {
  if (typeof value === "string") return value;
  throw new Error("should be a string!");
}
function validatePositiveNumber(value) {
  if (typeof value === "number" && value >= 0) return value;
  if (typeof value === "string") value = parseFloat(value);
  if (isNaN(value) || value < 0) throw new Error("should be a positive number!");
  return value;
}
function validateBooleanOrPositiveNumber(value) {
  if (typeof value === "boolean" || typeof value === "number") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  if (typeof value === "string") {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) return num;
  }
  throw new Error("should be a boolean or a positive number!");
}
function validateStringOrJson(value) {
  if (typeof value === "object") return value;
  if (typeof value === "string") {
    try { return JSON.parse(value); } catch { return value; }
  }
  throw new Error("should be a string or JSON!");
}

/* ====================== DATA HELPERS (data-helpers.js) ====================== */
function isUrl(string) {
  try {
    return Boolean(new URL(string));
  } catch {
    return false;
  }
}
function dataType(data) {
  if (Array.isArray(data)) return "array";
  if (data === null) return "null";
  if (data instanceof RegExp) return "regexp";
  const type = typeof data;
  if (type === "number") {
    if (isNaN(data)) return "NaN";
    if (!isFinite(data)) return "Infinity";
    return Number.isInteger(data) ? "int" : "float";
  }
  if (type === "boolean") return "bool";
  if (type === "object" && data instanceof Date) return "date";
  return type;
}

/* ====================== TOOLBAR (toolbar.js) ====================== */
function Toolbar({ expanded, indent, onChange, onSearch, onNavigate, showDetails }) {
  this.indent = indent || 2;
  this.expanded = typeof expanded === "number" ? expanded : 2;
  this.showDetails = showDetails !== false;
  this.maxExpandLevel = 0;
  let searchInput;

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  const options = document.createElement("div");
  options.className = "options";
  toolbar.appendChild(options);

  const searchWrapper = document.createElement("div");
  searchWrapper.className = "search-wrapper";
  toolbar.appendChild(searchWrapper);

  // Refresh
  const refreshIconWrapper = document.createElement("div");
  refreshIconWrapper.className = "icon-wrapper clickable";
  const refreshIcon = document.createElement("span");
  refreshIcon.className = "icon refresh";
  refreshIconWrapper.onclick = () => this.refresh();
  refreshIconWrapper.appendChild(refreshIcon);
  options.appendChild(refreshIconWrapper);

  // Expand
  const expandIconWrapper = document.createElement("div");
  expandIconWrapper.className = "icon-wrapper clickable";
  const expandIcon = document.createElement("span");
  expandIcon.className = "icon plus";
  expandIconWrapper.appendChild(expandIcon);
  expandIconWrapper.onclick = () => {
    if (this.expanded < this.maxExpandLevel) this.expanded += 1;
    onChange({ expanded: this.expanded });
  };
  options.appendChild(expandIconWrapper);

  // Collapse
  const collapseIconWrapper = document.createElement("div");
  collapseIconWrapper.className = "icon-wrapper clickable";
  const collapseIcon = document.createElement("span");
  collapseIcon.className = "icon minus";
  collapseIconWrapper.appendChild(collapseIcon);
  collapseIconWrapper.onclick = () => {
    if (this.expanded > this.maxExpandLevel) this.expanded = this.maxExpandLevel;
    if (this.expanded > 0) this.expanded -= 1;
    onChange({ expanded: this.expanded });
  };
  options.appendChild(collapseIconWrapper);

  // Indent
  const indentIconWrapper = document.createElement("div");
  indentIconWrapper.className = "icon-wrapper clickable";
  const indentIcon = document.createElement("span");
  indentIcon.className = "icon indent";
  indentIconWrapper.onclick = () => {
    this.indent += 1;
    onChange({ indent: this.indent });
  };
  indentIconWrapper.appendChild(indentIcon);
  options.appendChild(indentIconWrapper);

  // Outdent
  const outdentIconWrapper = document.createElement("div");
  outdentIconWrapper.className = "icon-wrapper clickable";
  const outdentIcon = document.createElement("span");
  outdentIcon.className = "icon outdent";
  outdentIconWrapper.onclick = () => {
    this.indent = Math.max(0, this.indent - 1);
    onChange({ indent: this.indent });
  };
  outdentIconWrapper.appendChild(outdentIcon);
  options.appendChild(outdentIconWrapper);

  // Info (toggle details)
  const infoIconWrapper = document.createElement("div");
  infoIconWrapper.className = "icon-wrapper clickable";
  const infoIcon = document.createElement("span");
  infoIcon.className = `icon info ${this.showDetails ? "active" : ""}`;
  infoIconWrapper.onclick = () => {
    infoIcon.classList.toggle("active");
    this.showDetails = !this.showDetails;
    onChange({ showDetails: this.showDetails });
  };
  infoIconWrapper.appendChild(infoIcon);
  options.appendChild(infoIconWrapper);

  // Search
  const searchIcon = document.createElement("span");
  searchIcon.className = "icon search";
  searchWrapper.appendChild(searchIcon);

  searchInput = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.placeholder = "Search";
  searchInput.oninput = (e) => onSearch(e.target.value);
  searchWrapper.appendChild(searchInput);

  // Prev/Next navigation (next to search)
  const navPrevWrapper = document.createElement("div");
  navPrevWrapper.className = "icon-wrapper clickable disabled";
  const navPrevIcon = document.createElement("span");
  navPrevIcon.className = "icon nav-left";
  navPrevWrapper.appendChild(navPrevIcon);
  navPrevWrapper.onclick = () => { if (onNavigate) onNavigate("prev"); };
  searchWrapper.appendChild(navPrevWrapper);

  const navNextWrapper = document.createElement("div");
  navNextWrapper.className = "icon-wrapper clickable disabled";
  const navNextIcon = document.createElement("span");
  navNextIcon.className = "icon nav-right";
  navNextWrapper.appendChild(navNextIcon);
  navNextWrapper.onclick = () => { if (onNavigate) onNavigate("next"); };
  searchWrapper.appendChild(navNextWrapper);

  this.setNavigationEnabled = (enabled) => {
    navPrevWrapper.classList.toggle("disabled", !enabled);
    navNextWrapper.classList.toggle("disabled", !enabled);
  };

  this.refresh = () => {
    this.expanded = 1;
    this.indent = 2;
    if (searchInput) searchInput.value = "";
    onChange({ indent: 2, expanded: 1 });
    onSearch("");
  };

  this.updateShowDetails = (value) => {
    this.showDetails = value;
    if (this.showDetails) infoIcon.classList.add("active");
    else infoIcon.classList.remove("active");
  };

  this.element = toolbar;
}

/* ====================== DATA ROW (data-row.js) ====================== */
function DataRow({ key, value, expanded, indent, onToggleExpand, level = 0, parentRow }) {
  const row = document.createElement("div");
  this.maxLevel = level;
  const thisDataType = dataType(value);
  const hasChildren = thisDataType === "array" || thisDataType === "object";
  let isExpanded = expanded === true || expanded > level;
  let expandIcon, childrenRows, keyEl, valueEl;

  row.className = `data-row ${isExpanded ? "expanded" : ""}`;
  // adiciona .data-row-p para a primeira row (nível 0)
  if (level === 0) row.classList.add("data-row-p");
  row.dataset.key = key;
  row.dataset.level = level;
  if (level > 0) row.style.paddingLeft = `${indent * 5}px`;

  const keyValueWrapper = document.createElement("span");
  keyValueWrapper.className = "key-value-wrapper";
  row.appendChild(keyValueWrapper);

  const toggleExpand = () => {
    row.classList.toggle("expanded");
    if (onToggleExpand) {
      if (row.classList.contains("expanded")) onToggleExpand(level + 1);
      else onToggleExpand(level);
    }
  };

  if (hasChildren) {
    const expandIconWrapper = document.createElement("span");
    expandIconWrapper.className = "icon-wrapper";
    keyValueWrapper.appendChild(expandIconWrapper);

    expandIcon = document.createElement("span");
    expandIcon.className = `expand icon clickable`;
    expandIcon.setAttribute("title", isExpanded ? "Collapse" : "Expand");
    expandIconWrapper.appendChild(expandIcon);

    expandIconWrapper.addEventListener("click", () => toggleExpand());
  }

  if (key !== null && key !== "") {
    const keyDataType = typeof key;
    keyEl = document.createElement("span");
    keyEl.className = `key clickable ${keyDataType === "number" ? "number" : ""}`;
    keyEl.textContent = keyDataType === "number" ? key : `${key}`;
    keyEl.addEventListener("click", () => toggleExpand());
    keyValueWrapper.appendChild(keyEl);

    const colonEl = document.createElement("span");
    colonEl.classList.add("colon");
    colonEl.textContent = ":";
    keyValueWrapper.appendChild(colonEl);
  }

  if (hasChildren) {
    const openingParenthesis = document.createElement("span");
    openingParenthesis.className = "opening-parenthesis";
    openingParenthesis.textContent = thisDataType === "array" ? "[" : "{";
    keyValueWrapper.appendChild(openingParenthesis);

    const ellipsis = document.createElement("span");
    ellipsis.className = "ellipsis clickable";
    ellipsis.textContent = "...";
    ellipsis.addEventListener("click", () => toggleExpand());
    keyValueWrapper.appendChild(ellipsis);

    const closingParenthesis = document.createElement("span");
    closingParenthesis.className = "closing-parenthesis";
    closingParenthesis.textContent = thisDataType === "array" ? "]" : "}";
    keyValueWrapper.appendChild(closingParenthesis);

    const itemsSize = document.createElement("span");
    const length = thisDataType === "array" ? value.length : Object.keys(value).length;
    itemsSize.className = "items-size";
    itemsSize.textContent = `${length} item${length === 1 ? "" : "s"}`;
    keyValueWrapper.appendChild(itemsSize);

    childrenRows = [];
    const items = thisDataType === "array" ? value.map((_, i) => i) : Object.keys(value);
    items.forEach((childKey) => {
      const subRow = new DataRow({
        key: childKey,
        value: value[childKey],
        expanded,
        indent,
        onToggleExpand,
        level: level + 1,
        parentRow: row,
      });
      childrenRows.push(subRow);
      row.appendChild(subRow.element);
      this.maxLevel = Math.max(this.maxLevel, subRow.maxLevel);
    });

    const expandedClosingParenthesis = document.createElement("span");
    expandedClosingParenthesis.className = "closing-parenthesis";
    expandedClosingParenthesis.textContent = thisDataType === "array" ? "]" : "}";
    row.appendChild(expandedClosingParenthesis);
  } else {
    let valueType = null;
    if (!["nan", "NaN", "undefined", "null"].includes(thisDataType)) {
      valueType = document.createElement("span");
      valueType.className = `type`;
      valueType.textContent = thisDataType.toLowerCase();
    }
    const valueWrapper = document.createElement("span");
    valueWrapper.className = `value ${thisDataType.toLowerCase()}`;
    valueEl = document.createElement("span");
    valueEl.className = "value-data";
    valueEl.textContent = thisDataType === "string" ? `"${value}"` : value;
    if (valueType) valueWrapper.appendChild(valueType);
    valueWrapper.appendChild(valueEl);
    keyValueWrapper.appendChild(valueWrapper);
  }

  // Copy icon
  const copyIcon = document.createElement("span");
  copyIcon.className = "copy icon";
  copyIcon.setAttribute("title", "Copy to clipboard");

  const copyIconWrapper = document.createElement("span");
  copyIconWrapper.className = "icon-wrapper";
  copyIconWrapper.addEventListener("click", () => {
    try {
      navigator.clipboard.writeText(
          typeof value === "string" ? value : JSON.stringify(value, null, indent)
      );
    } catch (e) {
      console.warn("Copy failed", e);
    }
  });
  copyIconWrapper.appendChild(copyIcon);
  keyValueWrapper.appendChild(copyIconWrapper);

  const search = (searchTerm) => {
    let regex;
    try {
      regex = new RegExp(searchTerm, "gi");
    } catch {
      return; // padrão inválido, ignora
    }
    const searchElements = [];
    if (keyEl) searchElements.push(keyEl);
    if (valueEl) searchElements.push(valueEl);

    let found = false;
    searchElements.forEach((el) => {
      const original = el.textContent;
      // reset de qualquer pesquisa anterior
      el.innerHTML = original;
      if (!searchTerm) return;
      const matches = [...original.matchAll(regex)].map(m => m.index);
      if (matches.length === 0) return;
      const fragments = [];
      let last = 0;
      matches.forEach(idx => {
        found = true;
        fragments.push(original.slice(last, idx));
        fragments.push(`<span class="match">${original.slice(idx, idx + searchTerm.length)}</span>`);
        last = idx + searchTerm.length;
      });
      fragments.push(original.slice(last));
      el.innerHTML = fragments.join("");
    });

    if (found && !row.classList.contains("expanded")) {
      toggleExpand();
      if (parentRow) parentRow.classList.add("expanded");
    }
  };

  this.update = ({ expanded, indent, searchTerm }) => {
    if (indent !== undefined && level > 0) {
      row.style.paddingLeft = `${indent * 5}px`;
    }
    if (expanded !== undefined) {
      isExpanded = expanded === true || expanded > level;
      row.classList.toggle("expanded", isExpanded);
      if (expandIcon) expandIcon.title = isExpanded ? "Collapse" : "Expand";
    }
    if (searchTerm !== undefined) search(searchTerm);
    if (childrenRows) childrenRows.forEach(r => r.update({ expanded, indent, searchTerm }));
  };

  this.element = row;
}


/* ====================== CONTAINER (container.js) ====================== */
function Container(root, options = {}) {
  const containerElem = document.createElement("div");
  containerElem.className = "container";
  root.appendChild(containerElem);
  let dataRow = null;
  let toolbar = null;
  const cache = { matches: [], matchIndex: -1 };

  const setCurrentMatch = (idx) => {
    const prev = containerElem.querySelector(".match.current");
    if (prev) prev.classList.remove("current");
    const el = cache.matches[idx];
    if (el) {
      el.classList.add("current");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const gotoPrev = () => {
    if (!cache.matches || cache.matches.length === 0) return;
    cache.matchIndex = (cache.matchIndex - 1 + cache.matches.length) % cache.matches.length;
    setCurrentMatch(cache.matchIndex);
  };
  const gotoNext = () => {
    if (!cache.matches || cache.matches.length === 0) return;
    cache.matchIndex = (cache.matchIndex + 1) % cache.matches.length;
    setCurrentMatch(cache.matchIndex);
  };

  this.update = ({ data, expanded, indent, expandIconType, showDataTypes, showToolbar, showSize, showCopy }) => {
    if (data) {
      const newDataCompareString = JSON.stringify(data);
      if (cache.dataComapreString !== newDataCompareString) {
        cache.dataComapreString = newDataCompareString;
        dataRow = new DataRow({
          key: "",
          value: data,
          expanded,
          indent,
          onToggleExpand: (level) => {
            if (toolbar) toolbar.expanded = level;
            cache.expanded = level;
          },
        });
        containerElem.replaceChildren(dataRow.element);
        if (cache.showToolbar && toolbar) {
          containerElem.prepend(toolbar.element);
          toolbar.maxExpandLevel = dataRow.maxLevel;
          toolbar.refresh();
        }
      }
    }
    if (showToolbar !== undefined && cache.showToolbar !== showToolbar) {
      cache.showToolbar = showToolbar;
      if (showToolbar) {
        if (!toolbar)
          toolbar = new Toolbar({
            expanded: cache.expanded,
            indent: cache.indent,
            onChange: ({ expanded, indent, showDetails }) => {
              const options = { expanded, indent };
              if (showDetails !== undefined) {
                options.showCopy = showDetails;
                options.showSize = showDetails;
                options.showDataTypes = showDetails;
              }
              this.update(options);
            },
            onSearch: (term) => {
              if (dataRow) dataRow.update({ searchTerm: term });
              // Coleta matches e navega até o primeiro
              cache.matches = Array.from(containerElem.querySelectorAll(".match"));
              if (cache.matches.length > 0) {
                cache.matchIndex = 0;
                setCurrentMatch(0);
                if (toolbar) toolbar.setNavigationEnabled(true);
              } else {
                cache.matchIndex = -1;
                if (toolbar) toolbar.setNavigationEnabled(false);
              }
            },
            onNavigate: (dir) => {
              if (dir === "prev") gotoPrev();
              else gotoNext();
            },
          });
        if (dataRow) toolbar.maxExpandLevel = dataRow.maxLevel;
        containerElem.prepend(toolbar.element);
        toolbar.setNavigationEnabled(false);
      } else {
        const element = containerElem.querySelector(".toolbar");
        if (element) element.remove();
      }
    }

    const propsToUpdate = {};
    if (expanded !== undefined && cache.expanded !== expanded) {
      cache.expanded = expanded;
      propsToUpdate.expanded = expanded;
    }
    if (indent !== undefined && cache.indent !== indent) {
      cache.indent = indent;
      propsToUpdate.indent = indent;
    }
    if (Object.keys(propsToUpdate).length && dataRow) {
      dataRow.update(propsToUpdate);
    }

    if (showCopy !== undefined && cache.showCopy !== showCopy) {
      cache.showCopy = showCopy;
      containerElem.classList.toggle("show-copy", showCopy);
    }
    if (showSize !== undefined && cache.showSize !== showSize) {
      cache.showSize = showSize;
      containerElem.classList.toggle("show-size", showSize);
      if (toolbar) toolbar.updateShowDetails(cache.showSize || cache.showDataTypes);
    }
    if (showDataTypes !== undefined && cache.showDataTypes !== showDataTypes) {
      cache.showDataTypes = showDataTypes;
      containerElem.classList.toggle("show-data-types", showDataTypes);
      if (toolbar) toolbar.updateShowDetails(cache.showSize || cache.showDataTypes);
    }
    if (expandIconType !== undefined && cache.expandIconType !== expandIconType) {
      if (cache.expandIconType) {
        containerElem.classList.remove(`expand-icon-${cache.expandIconType}`);
      }
      containerElem.classList.add(`expand-icon-${expandIconType}`);
      cache.expandIconType = expandIconType;
    }
  };

  this.update(options);
}

/* ====================== COMPONENT (component.js unificado) ====================== */
const DEFAULT_PARAMS = {
  indent: 2,
  expanded: 1,
  theme: "default-light",
  showDataTypes: true,
  showToolbar: false,
  expandIconType: "arrow",
  showCopy: true,
  showSize: true,
  data: null,
};

class JsonViewer extends HTMLElement {
  #themeStylesContainer;
  #options;
  #contentData;
  #renderer;

  static get observedAttributes() {
    return Object.keys(DEFAULT_PARAMS).map(k => k.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase());
  }
  static allowedAttributes = ["id"].concat(JsonViewer.observedAttributes);

  constructor() {
    super();
    this.#options = { ...DEFAULT_PARAMS };
    this.#themeStylesContainer = document.createElement("style");
    const shadowRoot = this.attachShadow({ mode: "open" });
    const basicStyles = document.createElement("style");
    basicStyles.textContent = `${BASE_STYLES}`;
    shadowRoot.appendChild(basicStyles);
    shadowRoot.appendChild(this.#themeStylesContainer);
    this.theme = this.#options.theme;
    this.#renderer = new Container(shadowRoot, this.#options);
  }

  #warn(...args) {
    console.warn(`JsonViewer${this.id ? ` (${this.id})` : ""}:`, ...args);
  }

  #validateAndUpdate(propName, value, validatorFunc, allowedValues) {
    try {
      value = validatorFunc(value);
      if (allowedValues && !allowedValues.includes(value)) {
        throw new Error(`should be one of ${allowedValues.join(", ")}`);
      }
      if (this.#options[propName] === value) return;
      this.#options[propName] = value;
      this.#render();
    } catch (e) {
      this.#warn(`Attribute ${propName}: ${e.message}`);
    }
  }

  set showDataTypes(v) { this.#validateAndUpdate("showDataTypes", v, validateBoolean); }
  set showToolbar(v) { this.#validateAndUpdate("showToolbar", v, validateBoolean); }
  set indent(v) { this.#validateAndUpdate("indent", v, validatePositiveNumber); }
  set expandIconType(v) { this.#validateAndUpdate("expandIconType", v, validateString, ["arrow","square","circle"]); }
  set expanded(v) { this.#validateAndUpdate("expanded", v, validateBooleanOrPositiveNumber); }
  set showSize(v) { this.#validateAndUpdate("showSize", v, validateBoolean); }
  set showCopy(v) { this.#validateAndUpdate("showCopy", v, validateBoolean); }

  set theme(newTheme) {
    try {
      newTheme = validateStringOrJson(newTheme);
      if (this.#options.theme === newTheme && this.#themeStylesContainer.textContent !== "") return;
      this.#themeStylesContainer.textContent = themeStyles(newTheme);
      this.#options.theme = newTheme;
    } catch (e) {
      this.#warn(`Attribute theme: ${e.message}`);
    }
  }

  set data(newData) {
    try {
      newData = validateStringOrJson(newData);
      const newDataString = JSON.stringify(newData);
      if (this.#options.data === newDataString) return;
      this.#options.data = newDataString;

      if (isUrl(newData)) {
        fetch(newData)
            .then(r => r.json())
            .then(data => {
              this.#contentData = data;
              this.#render();
            })
            .catch(err => this.#warn("Fetch error:", err));
      } else {
        this.#contentData = newData;
        this.#render();
      }
    } catch (e) {
      this.#warn(`Attribute data: ${e.message}`);
    }
  }

  get options() {
    return this.#options;
  }

  connectedCallback() {
    // Carrega conteúdo inline como JSON
    queueMicrotask(() => {
      const data = this.textContent && this.textContent.trim();
      if (data) {
        this.textContent = "";
        this.data = data;
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (JsonViewer.allowedAttributes.indexOf(name) > -1) {
      const propName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      this[propName] = newValue;
    } else {
      this.#warn(`Attribute ${name} is not supported and will be ignored!`);
      this.removeAttribute(name);
    }
  }

  #render() {
    this.#renderer.update({
      data: this.#contentData,
      expanded: this.#options.expanded,
      expandIconType: this.#options.expandIconType,
      indent: this.#options.indent,
      showDataTypes: this.#options.showDataTypes,
      showToolbar: this.#options.showToolbar,
      showSize: this.#options.showSize,
      showCopy: this.#options.showCopy,
    });
  }
}

if (!customElements.get("andypf-json-viewer")) {
  customElements.define("andypf-json-viewer", JsonViewer);
}

/* Export opcional se usado como módulo */
// export { JsonViewer, availableThemes };