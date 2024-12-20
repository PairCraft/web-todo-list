/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchData: () => (/* binding */ fetchData)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst BASE_URL = 'http://localhost:3000/todos';\nfunction fetchData(url, options) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const response = yield fetch(`${BASE_URL}/${url}`, options);\n            if (!response.ok) {\n                throw new Error(`HTTP error ${response.status}`);\n            }\n            // 응답 본문 없는 경우\n            if (response.status === 204) {\n                return null;\n            }\n            return yield response.json();\n        }\n        catch (error) {\n            console.error(`Fetch error: ${error}`);\n            throw error;\n        }\n    });\n}\n\n\n//# sourceURL=webpack://frontend/./src/api.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n// 유저 전체 todo 리스트\nlet todos = [];\nconst addButton = document.getElementById(\"add-button\");\nconst todoInput = document.getElementById(\"todo-input\");\nconst todoList = document.getElementById(\"todo-list\");\nconst doneList = document.getElementById(\"done-list\");\n// 모달 관련 요소 가져오기\nconst modal = document.getElementById(\"modal\");\nconst confirmDeleteButton = document.getElementById(\"confirm-delete\");\naddButton.addEventListener(\"click\", () => {\n    const title = todoInput.value;\n    if (!title)\n        return;\n    addUserTodo(title);\n});\nfunction renderTodos() {\n    todoList.innerHTML = '';\n    doneList.innerHTML = '';\n    updateEmptyMessage('todo', todos.filter(todo => todo.status !== 'done').length);\n    updateEmptyMessage('done', todos.filter(todo => todo.status == 'done').length);\n    todos.forEach((todo) => {\n        const li = createTodoItem(todo);\n        if (todo.status === 'done') {\n            doneList.appendChild(li);\n        }\n        else {\n            todoList.appendChild(li);\n        }\n    });\n}\nfunction updateEmptyMessage(type, count) {\n    const emptyMessage = document.getElementById(`empty-message-${type}`);\n    emptyMessage.style.display = count ? 'none' : 'block';\n}\nfunction createTodoItem(todo) {\n    const li = document.createElement('li');\n    li.className = 'todo-item';\n    const itemTitleGroup = document.createElement('div');\n    itemTitleGroup.className = 'item-title-group';\n    const checkBox = createCheckbox(todo);\n    itemTitleGroup.appendChild(checkBox);\n    const todoTitleSpan = document.createElement('span');\n    todoTitleSpan.textContent = todo.title;\n    itemTitleGroup.appendChild(todoTitleSpan);\n    const buttonGroup = document.createElement('div');\n    buttonGroup.className = 'item-button-group';\n    const editButton = createEditButton(todo);\n    buttonGroup.appendChild(editButton);\n    const deleteButton = createDeleteButton(todo.id);\n    buttonGroup.appendChild(deleteButton);\n    li.appendChild(itemTitleGroup);\n    li.appendChild(buttonGroup);\n    return li;\n}\nfunction createCheckbox(todo) {\n    const checkBox = document.createElement('input');\n    checkBox.type = 'checkbox';\n    checkBox.checked = todo.status === 'done';\n    checkBox.addEventListener('change', () => {\n        updateTodoStatus(todo.id);\n    });\n    return checkBox;\n}\nfunction createInputField(value) {\n    const inputField = document.createElement('input');\n    inputField.type = 'text';\n    if (value) {\n        inputField.value = value;\n    }\n    return inputField;\n}\nfunction createButton(className, id, text) {\n    const button = document.createElement('button');\n    button.className = className;\n    button.id = id;\n    button.innerText = text;\n    return button;\n}\n// 기본적으로는 수정버튼이지만 수정중일 때는 완료버튼이 된다.\nfunction createEditButton(todo) {\n    const editButton = createButton('gray-outline-button', 'edit-button', '수정');\n    if (todo.status === 'done') {\n        editButton.style.display = 'none';\n    }\n    editButton.addEventListener('click', () => {\n        // 수정버튼인 상태에서 클릭 => isEditing: true\n        const isEditing = editButton.innerText === '수정';\n        updateTodoItemStates(todo, editButton, isEditing);\n    });\n    return editButton;\n}\n// 기본적으로는 삭제버튼이지만 수정중일 때는 취소버튼이 된다.\nfunction createDeleteButton(id) {\n    const deleteButton = createButton('red-outline-button', 'delete-button', '삭제');\n    deleteButton.addEventListener(\"click\", () => {\n        if (deleteButton.innerText === '취소') {\n            setTodoItemDefault(deleteButton);\n        }\n        else {\n            openDeleteModal(id);\n        }\n    });\n    return deleteButton;\n}\nfunction updateTodoItemStates(todo, editButton, isEditing) {\n    var _a;\n    const li = editButton.closest('li');\n    const itemTitleGroup = li.querySelector('.item-title-group');\n    const deleteButton = li.querySelector('#delete-button');\n    updateTodoItemButtonStates(editButton, deleteButton, isEditing);\n    if (isEditing) {\n        itemTitleGroup.style.display = 'none';\n        li.insertBefore(createInputField(todo.title), itemTitleGroup);\n    }\n    else {\n        const inputField = li.querySelector('input[type=\"text\"]');\n        if (inputField && inputField.value && inputField.value !== todo.title) {\n            updateTodoTitle(todo.id, inputField.value);\n            // const titleSpan = li.querySelector('span') as HTMLSpanElement;\n            // titleSpan.textContent = inputField.value;\n        }\n        (_a = li.querySelector('input[type=\"text\"]')) === null || _a === void 0 ? void 0 : _a.remove();\n        itemTitleGroup.style.display = 'flex';\n    }\n}\n// 투두 아이템 버튼 상태 변경\nfunction updateTodoItemButtonStates(editButton, deleteButton, isEditing) {\n    editButton.innerText = isEditing ? '완료' : '수정';\n    editButton.className = isEditing ? 'gray-filled-button' : 'gray-outline-button';\n    deleteButton.innerText = isEditing ? '취소' : '삭제';\n    deleteButton.className = isEditing ? 'gray-outline-button' : 'red-outline-button';\n}\nfunction setTodoItemDefault(deleteButton) {\n    var _a;\n    const li = deleteButton.closest('li');\n    const editButton = li.querySelector('#edit-button');\n    const itemTitleGroup = li.querySelector('.item-title-group');\n    // 상태 복구\n    updateTodoItemButtonStates(editButton, deleteButton, false);\n    (_a = li.querySelector('input[type=\"text\"]')) === null || _a === void 0 ? void 0 : _a.remove();\n    itemTitleGroup.style.display = 'flex';\n}\nmodal.addEventListener(\"click\", (event) => __awaiter(void 0, void 0, void 0, function* () {\n    const target = event.target;\n    if (target.id === \"confirm-delete\") {\n        const id = Number(target.dataset.id);\n        yield deleteTodo(id);\n        closeDeleteModal();\n    }\n    else if (target.id === \"cancel-delete\") {\n        closeDeleteModal();\n    }\n}));\nfunction openDeleteModal(id) {\n    confirmDeleteButton.dataset.id = id.toString();\n    modal.style.display = \"flex\";\n}\nfunction closeDeleteModal() {\n    modal.style.display = 'none';\n}\n// 유저 할일목록 받기\nfunction getUserTodos() {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const response = yield (0,_api__WEBPACK_IMPORTED_MODULE_0__.fetchData)('');\n            if (response) {\n                todos = response;\n                renderTodos();\n            }\n        }\n        catch (error) {\n            if (error instanceof Error) {\n                alert(error.message);\n            }\n        }\n    });\n}\n// 할 일 추가\nfunction addUserTodo(title) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let request;\n        request = { title: title };\n        try {\n            const response = yield (0,_api__WEBPACK_IMPORTED_MODULE_0__.fetchData)('', {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(request)\n            });\n            if (response) {\n                todoInput.value = '';\n                const newTodo = { id: response.id, title: response.title, status: response.status };\n                todos.push(newTodo);\n                renderTodos();\n            }\n        }\n        catch (error) {\n            if (error instanceof Error) {\n                alert(error.message);\n            }\n        }\n    });\n}\n// 할 일 상태 변경\nfunction updateTodoStatus(id) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let response = yield (0,_api__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`${id}`, {\n                method: 'PATCH',\n                headers: {\n                    'Content-Type': 'application/json'\n                }\n            });\n            if (response) {\n                console.log(response.status);\n                const index = todos.findIndex(todo => todo.id === response.id);\n                if (index !== -1) {\n                    todos[index] = { id: response.id, title: response.title, status: response.status };\n                    renderTodos();\n                }\n            }\n        }\n        catch (error) {\n            if (error instanceof Error) {\n                alert(error.message);\n            }\n        }\n    });\n}\n// 할 일 수정\nfunction updateTodoTitle(id, title) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let request;\n        request = { title: title };\n        try {\n            let response = yield (0,_api__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`${id}`, {\n                method: 'PUT',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(request)\n            });\n            if (response) {\n                const index = todos.findIndex(todo => todo.id === response.id);\n                if (index !== -1) {\n                    todos[index] = { id: response.id, title: response.title, status: response.status };\n                    renderTodos();\n                }\n            }\n        }\n        catch (error) {\n            if (error instanceof Error) {\n                alert(error.message);\n            }\n        }\n    });\n}\n// 할 일 삭제\nfunction deleteTodo(id) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            yield (0,_api__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`${id}`, {\n                method: 'DELETE'\n            });\n            todos = todos.filter(todo => todo.id !== id);\n            renderTodos();\n        }\n        catch (error) {\n            if (error instanceof Error) {\n                alert(error.message);\n            }\n        }\n    });\n}\ngetUserTodos();\n\n\n//# sourceURL=webpack://frontend/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;