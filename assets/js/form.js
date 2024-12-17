const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const close = modal.querySelector(".close");
const openModal = document.querySelector(".open-modal");

// openModal.addEventListener("click", () => {
// 	// modal.classList.add("open");
// 	// overlay.classList.add("open");

// 	modal.showModal();
// });
close.addEventListener("click", () => {
	// modal.classList.remove("open");
	// overlay.classList.remove("open");

	modal.close();
});

// form validation
const registrationForm = document.querySelector("#registration-form");
const nameInput = registrationForm.querySelector("input[name='name']");
const emailInput = registrationForm.querySelector("input[name='email']");
const passwordInput = registrationForm.querySelector("input[name='password']");
const confirmPasswordInput = registrationForm.querySelector(
	"input[name='confirm-password']"
);

const isValidEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const setErrorMessage = (input, message) => {
	input.nextElementSibling.innerText = message;
	input.parentElement.classList.add("fail");
	input.parentElement.classList.remove("success");
};

const clearErrorMessage = (input) => {
	input.parentElement.classList.remove("fail");
	input.parentElement.classList.add("success");
	input.nextElementSibling.innerText = "";
};

const isNameValidFn = () => {
	const nameValue = nameInput.value.trim();
	if (nameValue === "") {
		// setErrorMessage(nameInput, "Name is required");
		nameInput.nextElementSibling.innerText = "Name is required";
		nameInput.parentElement.classList.add("fail");
		nameInput.parentElement.classList.remove("success");
	} else if (nameValue.length < 6) {
		// setErrorMessage(nameInput, "Name must be at least 6 characters");
		nameInput.nextElementSibling.innerText =
			"Name must be at least 6 characters";
		nameInput.parentElement.classList.add("fail");
		nameInput.parentElement.classList.remove("success");
	} else if (nameValue.lenght > 20) {
		setErrorMessage(nameInput, "Name must be at most 20 characters");
	} else {
		clearErrorMessage(nameInput);
		return true;
	}
};

const isEmailValidFn = () => {
	const emailValue = emailInput.value.trim();
	if (emailValue === "") {
		setErrorMessage(emailInput, "Email is required");
	} else if (!isValidEmail(emailValue)) {
		setErrorMessage(emailInput, "Invalid email");
	} else if (!/.edu$/.test(emailValue)) {
		setErrorMessage(emailInput, "Only .edu domain is allowed");
	} else {
		clearErrorMessage(emailInput);
		return true;
	}
};

const isPasswordValidFn = () => {
	const passwordValue = passwordInput.value.trim();
	if (passwordValue === "") {
		setErrorMessage(passwordInput, "Password is required");
	} else if (passwordValue.length < 6) {
		setErrorMessage(passwordInput, "Password must be at least 6 characters");
	} else {
		clearErrorMessage(passwordInput);
		return true;
	}
};

const isConfirmPasswordValidFn = () => {
	const confirmPasswordValue = confirmPasswordInput.value.trim();
	const passwordValue = passwordInput.value.trim();

	if (confirmPasswordValue === "") {
		setErrorMessage(confirmPasswordInput, "Confirm password is required");
	} else if (confirmPasswordValue !== passwordValue) {
		setErrorMessage(confirmPasswordInput, "Passwords do not match");
	} else {
		clearErrorMessage(confirmPasswordInput);
		return true;
	}
};

nameInput.addEventListener("input", isNameValidFn);
emailInput.addEventListener("input", isEmailValidFn);
passwordInput.addEventListener("input", isPasswordValidFn);
confirmPasswordInput.addEventListener("input", isConfirmPasswordValidFn);

registrationForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// name validation
	const isNameValid = isNameValidFn();
	// email validation
	const isEmailValid = isEmailValidFn();
	// password validation
	const isPasswordValid = isPasswordValidFn();
	// confirm password validation
	const isConfirmPasswordValid = isConfirmPasswordValidFn();

	if (
		isNameValid &&
		isEmailValid &&
		isPasswordValid &&
		isConfirmPasswordValid
	) {
		// registrationForm.submit();

		modal.showModal();
	}
});
