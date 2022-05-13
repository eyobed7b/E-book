import React, { useContext, useEffect, useState } from "react";
import { Auth, db } from "../firebase";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { useResolvedPath } from "react-router-dom";
import {loadState,saveState} from "./LocalStorage"
import Home from '../component/Home/Home'
import Other from '../component/Other'
const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawerState] = useState('home')
  const value = {
    currentUser:  currentUser,
    userData:userData,
    drawer:drawer,
    setDrawer,

    mainComponent,
    signup,
    login,
    signout,
    setUserVariableOnLocalStorage,
  };
  function signup(name, email, password) {
    return Auth.createUserWithEmailAndPassword(email, password).then((user) => {
      setCurrentUser(user);
      console.log(JSON.stringify(user));

      addUserTOCloud(name, email);

      console.log("in");

      return user;
    });
  }
  // const createUser = async (id, email) => {
  //     await addDoc(usersCollectionRef, { email: email, id: id });
  //   };

  function addUserTOCloud(email, name) {
    const usersCollectionRef = collection(db, "users");
    addDoc(usersCollectionRef, {
      name: name,
      email: email,
      id: "user.uid",
      role: "Admin",
    })
      .then(function (docRef) {
        console.log(docRef);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        return;
      });
  }

  function getUserFromCloud(email,user) {
    const usersCollectionRef = collection(db, "users");

   return getDocs(usersCollectionRef).then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.data()['email'] === email) {

            setUserData(doc.data());

        setLoading(false);
        }
        //console.log(doc.data()['email']);

      });
      console.log(userData);
      return  querySnapshot ;
    }).catch(function (error) {
        // console.log("Error getting documents: ", error);
    });

    // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  function setDrawer(name){
    console.log(drawer)
    return  setDrawerState(name)

  }
   function mainComponent( ){
     if(drawer==="home") return <Home/>
     else <Other/>
   }
  function signout() {
    //    console.log("logout");
    return Auth.signOut()
      .then(() => {
        setCurrentUser(null);
        saveState("user",  null);
        //   console.log("out");
      })
      .catch((error) => {
        //   console.log(error)
      });
  }
  function login(email, password) {

    const usersCollectionRef = collection(db, "users");
    return Auth.signInWithEmailAndPassword(email, password).then((user) => {
      setCurrentUser(user);
      saveState('user',user)
      loadState('user')

  //       getUserFromCloud(email,user);
  //         getDocs(usersCollectionRef).then(function (querySnapshot) {
  //           setCurrentUser(user);
  //           querySnapshot.forEach(function (doc) {
  //             if (doc.data()['email'] === email) {

  //                 setUserData(doc.data());
  //                 console.log("userData")
  //                 console.log(userData)


  //             // setLoading(false);
  //             }

  //           });

  //  return querySnapshot
  //       }).catch(function (error) {
  //           console.log("Error getting documents: ", error);
  //       });
        console.log(userData);
        return user;
    });


    // return Auth.signInWithEmailAndPassword(email, password).then((user) => {
    //   setCurrentUser(currentUser);
    //   console.log(currentUser);
    //   getUserFromCloud(email);
    //   return user;
    // });
  }
  function setUserVariableOnLocalStorage(user) {
    console.log(JSON.stringify(user));
  }

  useEffect(() => {
    const unsubcribe = () =>
      Auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        // setUserVariableOnLocalStorage(user)
        //  console.log(user)
        console.log(user)
      });
    unsubcribe();
  setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
