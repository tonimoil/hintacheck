import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myArray, setMyArray] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('myArray');

        if (data == null) {
          setMyArray([])  
        } else {
          setMyArray(JSON.parse(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <MyContext.Provider value={{ myArray, setMyArray }}>
      {children}
    </MyContext.Provider>
  );
};
