import { encryptStorage } from "./storage";

export const addUserToLocalStorage = (id,email,name,avatar,gender,role) => {
    const curId = encryptStorage.getItem('id');
    const curEmail = encryptStorage.getItem('email');
    const curName = encryptStorage.getItem('name');
    const curAvatar = encryptStorage.getItem('avatar');
    const curGender = encryptStorage.getItem('gender');
    const curRole = encryptStorage.getItem('role');
    if ((curId !== id && id)&&(curEmail !== email && email)&&(curName !==name && name)&&(curAvatar !==avatar && avatar)&&(curGender !==gender && gender)&&(curRole !==role && role)) {
      
        encryptStorage.setMultipleItems([
            ['id', JSON.stringify(id)],
            ['email', JSON.stringify(email)],
            ['name', JSON.stringify(name)],
            ['avatar', JSON.stringify(avatar)],
            ['gender', JSON.stringify(gender)],
            ['role', JSON.stringify(role)],
          ]);
    } else {
        console.log("Add user failed")
        return null;
    }
}

export const getUserFromLocalStorage = () => {

    let user = {
        id:"",
        email:"",
        name:"",
        avatar:null,
        gender:"",
        role:""
    }
    const curId = encryptStorage.getItem('id');
    const curEmail = encryptStorage.getItem('email');
    const curName = encryptStorage.getItem('name');
    const curAvatar = encryptStorage.getItem('avatar');
    const curGender = encryptStorage.getItem('gender');
    const curRole = encryptStorage.getItem('role');
    if (curId && curEmail && curName && curAvatar && curGender && curRole) {
        user= {id:curId,email:curEmail,name:curName,avatar:curAvatar,gender:curGender,role:curRole}
        return user
    } 
    else {
        console.log("Get user failed")
        
    }
}
export const clearUserFromLocalStorage = () => {
    const curId = encryptStorage.getItem('id');
    const curEmail = encryptStorage.getItem('email');
    const curName = encryptStorage.getItem('name');
    const curAvatar = encryptStorage.getItem('avatar');
    const curGender = encryptStorage.getItem('gender');
    const curRole = encryptStorage.getItem('role');
    if (curId && curEmail && curName  && curAvatar && curGender && curRole) {
        encryptStorage.removeItem('id');
        encryptStorage.removeItem('email');
        encryptStorage.removeItem('name');
        encryptStorage.removeItem('avatar');
        encryptStorage.removeItem('gender');
        encryptStorage.removeItem('role');
    } else {
        console.log("Clear user failed") 
    }
}