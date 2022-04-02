import { Buffer } from 'buffer';

export const convertToImage = (item) => {
  let imageBase64 = '';
  if (item) {
    imageBase64 = Buffer(item, 'base64').toString('binary');
  }
  return imageBase64;
}

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

export const convertArrayToSelectedOpject = (array) => {
  let newArray = array && array.length > 0 && array.map(item => {
    let newObject = {};
    newObject.value = item.id;
    newObject.label = item.name;
    return newObject;
  });
  return newArray
}

export const convertObjectToSelectedOpject = (object) => {
  let newObject = {};
  newObject.value = object.id;
  newObject.label = object.name;
  return newObject;
}

export const handleDate = (date) => {

}

export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateEmail = (email, emailError) => {
    if (email === "") {
      emailError = "";
    }
    else if (isValidEmail(email)) {
      emailError = "";
    }
    else {
      emailError = "Invalid Email!";
    }
}

export const validatePassword = (password, passwordError) => {
    if (password.trim().length < 6) {
      passwordError = "Password must be 6 characters!";
    } else {
      passwordError =  "";
    }
}

export const validateConfirmPassword = (password, confirmPassword, confirmPasswordError) => {
    if(password !== confirmPassword) {
      confirmPasswordError = "Confirm password isn't match to password!";
    } else {
      confirmPasswordError = "";
    }
}