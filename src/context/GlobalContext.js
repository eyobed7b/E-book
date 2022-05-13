import React ,{createContext,useReducer} from 'react'
import AppReducer from './AppReducer'
import { Auth, db } from "../firebase";

import { collection, addDoc, getDocs } from "firebase/firestore";

const initialState ={
    transaction:[

        ],
        error:null,
        loading:true,
        userInfo:null
}

export const GlobalCOntext = createContext(initialState)

export const GlobalProvider = ({children})=>{
    const [state , dispatch] = useReducer(AppReducer,initialState)
    async function signup (name,email,password){
        const  API = "http://localhost:5000/api"
        console.log(name+email+password)
         try{



             console.log("yes")
             const config = {
                 headers: {
                     'Content-Type': 'application/json',
                     // 'Access-Control-Allow-Origin' : 'http://localhost:5000/api/signin',

                 },
             }

             const {data} =
             await axios.post(
                 `${API}/signup`,
                 {name,email, password},
                 config
             )
             console.log(data)

             dispatch({
                 type:"SIGNIN",
                 payload: data
             })
          }catch(err){
             dispatch({
                 type:"SIGNUP_ERROR",
                 payload: err.response && err.response.data.message
                 ? err.response.data.message
                 : err.message
             })
          }

      }





      function login(email, password) {

        const usersCollectionRef = collection(db, "users");
        return Auth.signInWithEmailAndPassword(email, password).then((user) => {
            dispatch({
                type:"SIGIN",
                payload:res.data.data
            })
            setCurrentUser(user);

            // getUserFromCloud(email,user);
              getDocs(usersCollectionRef).then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  if (doc.data()['email'] === email) {

                      setUserData(doc.data());
                      console.log("userData")
                      console.log(userData)

                   setLoading(false);
                  }

                });


            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
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
     async function signout (email,password){

       localStorage.removeItem('userInfo')
       document.location.href = '/'

      }

    async function getTransaction (userInfo){

         try{
            console.log("userInfo")
           let user = JSON.parse( userInfo)


           const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                    // 'Access-Control-Allow-Origin' : 'http://localhost:5000/api/signin',

                },
            }
            const res = await axios.get('/api/v1/transactions/'+user['_id'], config)
            dispatch({
                type:"GET_TRANSACTION",
                payload:res.data.data
            })
         }catch(err){
            dispatch({
                type:"TRANSACTION_ERROR",
                payload:err.response.data.error
            })
         }
     }

    async function deleteTransaction (id,userInfo){
        let user = JSON.parse( userInfo)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
                // 'Access-Control-Allow-Origin' : 'http://localhost:5000/api/signin',

            },

        }

        try{
            await axios.delete(`/api/v1/transactions/${id}`,config)
            dispatch({
                type:"DELETE_TRANSACTION",
                payload:id
            })
         }catch(err){
            dispatch({
                type:"TRANSACTION_ERROR",
                payload:err.response.data.error
            })
         }

    }
   async function addTransaction (transaction,userInfo){
    let user = JSON.parse( userInfo)

       const config ={
           headers:{
               "Content-Type":"application/json",
               Authorization: `Bearer ${user.token}`,
           }
       }
       try{
           const res = await axios.post('/api/v1/transactions',transaction,config)

        dispatch({
            type:"ADD_TRANSACTION",
            payload:res.data

        })

       }
       catch(err){
        dispatch({
            type:"TRANSACTION_ERROR",
            payload:err
        })
       }


    }

return (<GlobalCOntext.Provider  value={{
    transaction:state.transaction,
    error:state.error,
    loading:state.loading,
    userInfo:localStorage.getItem('userInfo'),
    signup,
    signin,
    signout,
    getTransaction,
    deleteTransaction,
    addTransaction
}}>{children}</GlobalCOntext.Provider>);
}