const MIN_PASS_LENGTH = 5; //TODO change this in prod
const USERNAME_LENGTH = 5;

const checkFieldEmpty = (field) => {
    return field === '' || field === null || field === undefined;
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const checkIfInt = (field) => {
    return !isNaN(field) && field.toString().indexOf('.') === -1;
}

const checkIfFloat = (field) => {

    return checkIfInt(field) || (!isNaN(field) && field.toString().indexOf('.') !== -1);
}


const validateSignInForm = (formData) => {
    const {username, password} = formData;
    const usernameErrors = [];
    const passwordErrors = [];
    if (checkFieldEmpty(username)) {
        usernameErrors.push("Username cannot be empty!");
    } else {
        if (validateEmail(username)) {
            usernameErrors.push("Username cannot be an email!")
        }
        if (username.length < USERNAME_LENGTH) {
            usernameErrors.push("Username must have at least 5 characters!")
        }
    }

    if (checkFieldEmpty(password)) {
        passwordErrors.push("Password cannot be empty!");
    } else {
        if (password.length < MIN_PASS_LENGTH) {
            passwordErrors.push("Password must have at least 5 characters!");
        }
    }
    let usernameError = "";
    let passwordError = "";
    if (usernameErrors.length > 0) {
        usernameError = usernameErrors[0];
    }
    if (passwordErrors.length > 0) {
        passwordError = passwordErrors[0];
    }
    return {usernameError: usernameError, passwordError: passwordError}
}

const validateSignUpForm = (formData) => {
    const {username, email, emailConfirm, password, passwordConfirm} = formData;
    let usernameErrors = [];
    let emailErrors = [];
    let emailConfirmErrors = [];
    let passwordErrors = [];
    let passwordConfirmErrors = [];

    if (checkFieldEmpty(username)) {
        usernameErrors.push("Username cannot be empty!");
    } else {
        if (validateEmail(username)) {
            usernameErrors.push("Username cannot be an email!")
        }
        if (username.length < USERNAME_LENGTH) {
            usernameErrors.push("Username must have at least 5 characters!")
        }
    }

    if (checkFieldEmpty(email)) {
        emailErrors.push("Email cannot be empty!");
    } else {
        if (!validateEmail(email)) {
            emailErrors.push("Incorrect email format!");
        }
    }


    if (checkFieldEmpty(emailConfirm)) {
        emailConfirmErrors.push("Email cannot be empty!");
    } else {
        if (!validateEmail(emailConfirm)) {
            emailConfirmErrors.push("Incorrect email format!");
        }
    }

    if (emailConfirm !== email) {
        emailErrors.push("Emails must match!");
        emailConfirmErrors.push("Emails must match!");
    }

    if (checkFieldEmpty(password)) {
        passwordErrors.push("Password cannot be empty!");
    } else {
        if (password.length < MIN_PASS_LENGTH) {
            passwordErrors.push("Password must have at least 5 characters!");
        }
    }

    if (checkFieldEmpty(passwordConfirm)) {
        passwordConfirmErrors.push("Password cannot be empty!");
    } else {
        if (passwordConfirm.length < MIN_PASS_LENGTH) {
            passwordConfirmErrors.push("Password must have at least 5 characters!");
        }
    }

    if (password !== passwordConfirm) {
        passwordErrors.push("Passwords must match!");
        passwordConfirmErrors.push("Passwords must match!");
    }

    let usernameError = "";
    let emailError = "";
    let emailConfirmError = "";
    let passwordError = "";
    let passwordConfirmError = "";
    if (usernameErrors.length > 0) {
        usernameError = usernameErrors[0];
    }
    if (emailErrors.length > 0) {
        emailError = emailErrors[0];
    }
    if (emailConfirmErrors.length > 0) {
        emailConfirmError = emailConfirmErrors[0];
    }
    if (passwordErrors.length > 0) {
        passwordError = passwordErrors[0];
    }
    if (passwordConfirmErrors.length > 0) {
        passwordConfirmError = passwordConfirmErrors[0];
    }
    return {
        usernameError: usernameError,
        emailError: emailError,
        emailConfirmError: emailConfirmError,
        passwordError: passwordError,
        passwordConfirmError: passwordConfirmError
    }
}

const validateResetPasswordRequestForm = (formData) => {
    const {email} = formData;
    const emailErrors = [];
    if (checkFieldEmpty(email)) {
        emailErrors.push("Email cannot be empty!");
    } else {
        if (!validateEmail(email)) {
            emailErrors.push("Invalid email format!");
        }
    }
    let emailError = "";
    if (emailErrors.length > 0) {
        emailError = emailErrors[0];
    }

    return {emailError: emailError}
}

const validateResetPasswordForm = (formData) => {
    const {password, passwordConfirm} = formData;
    const passwordErrors = [];
    const passwordConfirmErrors = [];
    if (checkFieldEmpty(password)) {
        passwordErrors.push("Password cannot be empty!");
    } else {
        if (password.length < MIN_PASS_LENGTH) {
            passwordErrors.push("Password must have at least 5 characters!");
        }
    }

    if (checkFieldEmpty(passwordConfirm)) {
        passwordConfirmErrors.push("Password cannot be empty!");
    } else {
        if (passwordConfirm.length < MIN_PASS_LENGTH) {
            passwordConfirmErrors.push("Password must have at least 5 characters!");
        }
    }

    if (password !== passwordConfirm) {
        passwordErrors.push("Passwords must match!");
        passwordConfirmErrors.push("Passwords must match!");
    }

    let passwordError = "";
    let passwordConfirmError = "";
    if (passwordErrors.length > 0) {
        passwordError = passwordErrors[0];
    }
    if (passwordConfirmErrors.length > 0) {
        passwordConfirmError = passwordConfirmErrors[0];
    }
    return {passwordError: passwordError, passwordConfirmError: passwordConfirmError}
}

const validateTrainingForm = (formData) => {
    const {
        envName, epsilon, minEpsilon, epsilonDecay, showStatsEvery, learningRate, saveQTableEvery,
        episodes, discountRate
    } = formData;
    let env_nameError = envName === null || envName === "" ? "You must select an environment" : "";
    let epsilonError = !checkIfFloat(epsilon) || epsilon > 1.0 || epsilon <= 0 ? "Epsilon must be a float value between (0, 1]" : "";
    let min_epsilonError = !checkIfFloat(minEpsilon) || minEpsilon >= 1.0 || minEpsilon <= 0 ? "Min epsilon must be a float between (0, 1)" : "";
    let epsilon_decayError = !checkIfFloat(epsilonDecay) || epsilonDecay >= 1.0 || epsilonDecay <= 0 ? "Epsilon decay must be a float between (0, 1)" : "";
    let show_stats_everyError = !checkIfInt(showStatsEvery) || showStatsEvery <= 0 ? "Show Stats Every must be a positive integer" : "";
    let learning_rateError = !checkIfFloat(learningRate) || learningRate <= 0 ? "Learning rate must be a positive float" : "";
    let save_q_table_everyError = !checkIfInt(saveQTableEvery) || saveQTableEvery <= 0 ? "Save q table every must be a positive integer" : "";
    let episodesError = !checkIfInt(episodes) || episodes <= 0 ? "Number of episodes must be a positive integer" : "";
    let discount_rateError = !checkIfFloat(discountRate) || discountRate <= 0 ? "Discount rate must be a positive float" : "";


    return {
        env_nameError: env_nameError, epsilonError: epsilonError, min_epsilonError: min_epsilonError,
        epsilon_decayError: epsilon_decayError, show_stats_everyError: show_stats_everyError,
        learning_rateError: learning_rateError, save_q_table_everyError: save_q_table_everyError,
        episodesError: episodesError, discount_rateError: discount_rateError
    }
}

export {
    validateSignUpForm,
    validateSignInForm,
    validateResetPasswordRequestForm,
    validateResetPasswordForm,
    validateTrainingForm
};
