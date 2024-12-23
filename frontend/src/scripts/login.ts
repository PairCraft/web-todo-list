import { ErrorData, fetchData, HttpStatus } from "../api/api";

interface requestBody {
    username: string;
    password: string;
}

interface responseBody {
    username: string;
    token: string;
}

const idInput = document.querySelector('#login-input-id') as HTMLInputElement;
const pwInput = document.querySelector('#login-input-pw') as HTMLInputElement;
const errorMessage = document.querySelector('span') as HTMLSpanElement;

[idInput, pwInput].forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            if (idInput.value && pwInput.value) {
                requestLogin(idInput.value, pwInput.value);
            }
        }
    });
});

// 로그인
const loginButton = document.querySelector('#login-button') as HTMLButtonElement;
loginButton.addEventListener("click", () => {
    if (idInput.value && pwInput.value) {
        requestLogin(idInput.value, pwInput.value);
    }
})

idInput.addEventListener('focus', () => {
    idInput.classList.remove('error');
    pwInput.classList.remove('error');
    errorMessage.style.display = 'none';
});

pwInput.addEventListener('focus', () => {
    pwInput.classList.remove('error');
    idInput.classList.remove('error');
    errorMessage.style.display = 'none';
});

async function requestLogin(id: string, password: string) {
    const request: requestBody = { username: id, password: password };

    try {
        const response = await fetchData<responseBody>(`users/login`, {
            method: 'POST',
            body: JSON.stringify(request)
        });

        if (response) {
            alert(`${response.username}님 환영합니다!`);
            localStorage.setItem('token', response.token);
            window.location.href = './index.html';
        }
    } catch (error) {
        if (error instanceof ErrorData) {
            if (error.status === HttpStatus.UNAUTHORIZED) {
                errorMessage.style.display = 'flex';
                errorMessage.innerText = error.message;
                idInput.classList.add('error');
                pwInput.classList.add('error');
            } else
                alert(error.message);
        }
        else
            alert(`unhandled error ${error}`);
    }
}