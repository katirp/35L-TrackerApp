import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPwu9ySQTCTeavCmdC0vb6deAlpAJitN4",
  authDomain: "cs35l-tracker-app.firebaseapp.com",
  projectId: "cs35l-tracker-app",
  storageBucket: "cs35l-tracker-app.appspot.com",
  messagingSenderId: "814224832456",
  appId: "1:814224832456:web:41bd44dcdd83690f5cf2fd",
  measurementId: "G-S77LBBWY57",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

//function to read firebase data
//ex: const a = readData('/user1')

export async function readData(table: string) {
  const data = ref(database, table);
  try {
    const snapshot = await get(data);
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

//function to write firebase data
// ex: writeData('/user1/2023/03/08/02:15:18/Alcohol', 2)
export function writeData(table: string, key_data: Object) {
  set(ref(database, table), key_data);
}

// Abrils function
//specific to calender - gets string rep of JSON database
export async function calReadData(userRef: string) {
  const data = ref(database, userRef);
  //console.log(userRef)
  try {
    const snapshot = await get(data);
    if (snapshot.exists()) {
      return await Promise.resolve(JSON.stringify(snapshot.val()));
      return JSON.stringify(snapshot.val());
    } else {
      //console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return "Error Acessing Database";
}

export async function getExistingUsers() {
  try {
    const snapshot = await get(ref(database, "/Users"));
    if (snapshot.exists()) {
      return await Promise.resolve(JSON.stringify(snapshot.val()));
      return JSON.stringify(snapshot.val());
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return "Error Acessing Database";
}

import { update } from "firebase/database";

export async function addUser(un: string, pw: string) {
  const db = getDatabase(app);
  const obj: Record<string, string> = {};
  obj[un] = pw;
  //console.log(obj);
  update(ref(db, "/Users"), obj);
}


import { MASTERID } from "../constants/userInfo";
const test = grabCurDay();


export async function grabCurDay() {
  let today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var addzeroDate = '';
  if (date < 10)
    addzeroDate = '0';
  var addZeroMonth = '';
  if (month < 10)
    addZeroMonth = '0';
  const d_ref = ('/' + year + '/' + addZeroMonth + month + '/' + addzeroDate + date);
  const snapshot = await get(ref(database, '/' + MASTERID + d_ref));
  if (snapshot.exists()) {
    for (var i = 0; i < 15; i++) {
      const ret = await Promise.resolve(JSON.stringify(snapshot.val()));
      console.log(ret);
      return ret;
    }
  } else {
    console.log("No data available");
    return null;
  }
  return null;
}