import React from "react";
import Navbar from "../components/Navbar";
const AddExpense = () =>{
    return(
        <>
            <div className="bg-gray-400  min-h-screen">
                <Navbar/>
                <h1 className="text-gray-800 text-3xl sm:4xl md:text-5xl  font-bold mb-6 px-4 py-4 ">Add Expense</h1>
            </div>
        </>
        
    );
};
export default AddExpense;