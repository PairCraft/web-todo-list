import { ErrorData, fetchData, HttpStatus } from "../api/api";

interface requestBody {
    username: string;
    password: string;
}

interface responseBody {
    username: string;
}

const idInput = document.querySelector('#join-input-id') as HTMLInputElement;
const pwInput = document.querySelector('#join-input-pw') as HTMLInputElement;
const pwInputConfirm = document.querySelector('#join-input-pw-confirm') as HTMLInputElement;
const idErrorMessage = document.querySelector('#id-error-message') as HTMLSpanElement;
const passwordErrorMessage = document.querySelector('#password-error-message') as HTMLSpanElement;

let isMathchingPassword = false;
let isValidPassword = false;

idInput.addEventListener('focus', () => {
    updateIdErrorState(false, '');
});

[pwInput, pwInputConfirm].forEach((input) => {
    input.addEventListener('input', () => {
        isMathchingPassword = pwInput.value === pwInputConfirm.value;
        isValidPassword = validatePassword(pwInput.value);

        if (isMathchingPassword && isValidPassword)
            updatePasswordErrorState(false, '');
        else if (!isMathchingPassword)
            updatePasswordErrorState(true, '비밀번호가 일치하지 않습니다.');
        else if (!isValidPassword)
            updatePasswordErrorState(true, '비밀번호는 영문자, 숫자, 특수문자가 포함된 8자이상의 문자로 입력해주세요.');
    });
});

function updateIdErrorState(hasError: boolean, message: string) {
    if (hasError) {
        idErrorMessage.style.display = 'flex';
        idErrorMessage.innerText = message;
        idInput.classList.add('error');
    } else {
        idErrorMessage.style.display = 'none';
        idErrorMessage.innerText = '';
        idInput.classList.remove('error');
    }
}

function updatePasswordErrorState(hasError: boolean, message: string) {
    if (hasError) {
        passwordErrorMessage.style.display = 'flex';
        passwordErrorMessage.innerText = message;
        pwInput.classList.add('error');
        pwInputConfirm.classList.add('error');
    } else {
        passwordErrorMessage.style.display = 'none';
        passwordErrorMessage.innerText = '';
        pwInput.classList.remove('error');
        pwInputConfirm.classList.remove('error');
    }
}

// 회원 가입
const joinButton = document.querySelector('#join-button') as HTMLButtonElement;
joinButton.addEventListener("click", () => {
    if (!idInput.value) {
        updateIdErrorState(true, 'id를 입력해주세요.');
        return;
    }

    if (isMathchingPassword && isValidPassword)
        requestJoin(idInput.value, pwInput.value);
});

async function requestJoin(id: string, password: string) {
    const request: requestBody = { username: id, password: password };

    try {
        const response = await fetchData<responseBody>(`users/register`, {
            method: 'POST',
            body: JSON.stringify(request)
        });

        if (response) {
            alert(`${response.username}님 회원가입 완료!`);
            window.location.href = './login.html';
        }
    } catch (error) {
        if (error instanceof ErrorData) {
            if (error.status === HttpStatus.CONFLICT)
                updateIdErrorState(true, error.message);
            else
                alert(error.message);
        }
        else
            alert(`unhandled error ${error}`);
    }
}

function validatePassword(password: string) {
    // 8자 이상
    const isValidLength = password.length >= 8;
    // 영문자 포함
    const hasAlphabet = /[a-zA-Z]/.test(password);
    // 숫자 포함
    const hasNumber = /\d/.test(password);

    // 특수문자 포함
    const special = '!@#$%^&*(),.?\":{}|<>';
    const hasSpecial = Array.from(password).map((char) => special.includes(char));

    if (isValidLength && hasAlphabet && hasNumber && hasSpecial)
        return true;

    return false;
}