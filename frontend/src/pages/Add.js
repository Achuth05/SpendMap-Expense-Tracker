import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
const AddExpense = () =>{
    const[currentTab, setCurrentTab]=useState('daily');
    const[submitMsg, setSubmitMsg]=useState('');
    //all
    const[others, setOthers]=useState('');
    const[notes, setNotes]=useState('');
    //daily
    const[date, setDate]=useState('');
    const[food, setFood]=useState('');
    const[travel, setTravel]=useState('');
    const[entmt, setEntmt]=useState('');
    const[shop, setShop]=useState('');
    const[total, setTotal]=useState('');
    useEffect(()=>{
        const dtotal= (parseFloat(food)||0)+(parseFloat(travel)||0)+(parseFloat(entmt)||0)+(parseFloat(shop)||0)+(parseFloat(others)||0);
        setTotal(dtotal);
    }, [food, travel, entmt, shop, others]);

    const handleDailySubmit= async(e)=>{
        e.preventDefault();
        const token=localStorage.getItem('token');
        const dailyExpData={
            date, food: Number(food)||0, travel: Number(travel)||0, entertainment: Number(entmt)||0, shopping: Number(shop)||0,
            others: Number(others)||0, notes
        };
        try{
            const res= await fetch('http://localhost:3001/api/expenses/daily',
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json',
                                Authorization:`Bearer ${token}`,
                    },
                    body:JSON.stringify(dailyExpData),
                }
            );
            const data= await res.json();
            console.log("Submitted", data);
            setSubmitMsg("Succesfully added your expenses!");
        }
        catch(err){
            console.error("Error submitting data", err);
            setSubmitMsg("Oops!Error occured. Please try again");
        }
        setDate('');
        setFood('');
        setTravel('');
        setEntmt('');
        setShop('');
        setOthers('');
        setNotes('');
        setTotal('');
    }

    //monthly
    const[month, setMonth]=useState('');
    const[year, setYear]=useState('');
    const[ecity, setEcity]=useState('');
    const[water, setWater]=useState('');
    const[rent, setRent]=useState('');
    const[sum, setSum]=useState('');
    useEffect(()=>{
        const mtotal= (parseFloat(ecity)||0)+(parseFloat(water)||0)+(parseFloat(rent)||0)+(parseFloat(others)||0);
        setSum(mtotal);
    }, [ecity, water, rent, others]);
    const handleMonthlySubmit= async(e)=>{
        e.preventDefault();
        const token=localStorage.getItem('token');
        const monthlyExpData={
            month, year, electricity: Number(ecity)||0, water: Number(water)||0, rent: Number(rent)||0,
            others: Number(others)||0, notes
        };
        try{
            const res= await fetch('http://localhost:3001/api/expenses/monthly',
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json',
                                Authorization:`Bearer ${token}`,
                    },
                    body:JSON.stringify(monthlyExpData),
                }
            );
            const data= await res.json();
            console.log("Submitted", data);
            setSubmitMsg("Succesfully added your expenses!");
        }
        catch(err){
            console.error("Error submitting data", err);
            setSubmitMsg("Oops!Error occured. Please try again");
        }
        setMonth('');
        setYear('');
        setEcity('');
        setWater('');
        setRent('');
        setOthers('');
        setNotes('');
        setSum('');
    }


    //occasional
    const[insurance, setInsurance]=useState('');
    const[schoolFee, setSchoolFee]=useState('');
    const[repair, setRepair]=useState('');
    const[osum, setOsum]=useState('');
    useEffect(()=>{
        const ototal= (parseFloat(insurance)||0)+(parseFloat(schoolFee)||0)+(parseFloat(repair)||0);
        setOsum(ototal);
    }, [insurance, schoolFee, repair]);
    const handleOccasionalSubmit= async(e)=>{
        e.preventDefault();
        const token=localStorage.getItem('token');
        const occasionalData={
            date, insurance: Number(insurance)||0, schoolFee: Number(schoolFee)||0, repair: Number(repair)||0, notes
        };
        try{
            const res= await fetch('http://localhost:3001/api/expenses/occasional',
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json',
                                Authorization:`Bearer ${token}`,
                    },
                    body:JSON.stringify(occasionalData),
                }
            );
            const data= await res.json();
            console.log("Submitted", data);
            setSubmitMsg("Succesfully added your expenses!");
        }
        catch(err){
            console.error("Error submitting data", err);
            setSubmitMsg("Oops!Error occured. Please try again");
        }
        setDate('');
        setInsurance('');
        setSchoolFee('');
        setRepair('');
        setNotes('');
        setOsum('');
    }

    
    return(
        <>
            <div className="bg-gray-400  min-h-screen">
                <Navbar/>
                <h1 className="text-gray-800 text-3xl sm:4xl md:text-5xl  font-bold mb-6 px-4 py-4 ">Add Expense</h1>
                <div className="flex justify-center space-x-4 mb-6">
                    <button onClick={()=>{setCurrentTab('daily');
                                            setSubmitMsg('');} }
                        className={`px-4 py-4 shadow-md rounded ${currentTab==="daily"?"bg-blue-500 text-white hover:bg-blue-600 font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Daily</button>
                    <button onClick={()=>{setCurrentTab('monthly');
                                            setSubmitMsg('');}}
                             className={`px-4 py-4 shadow-md rounded ${currentTab==="monthly"?"bg-blue-500 text-white hover:bg-blue-600 font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Monthly</button>
                    <button onClick={()=>{setCurrentTab('occasional');
                                            setSubmitMsg('');}}
                     className={`px-4 py-4 shadow-md rounded ${currentTab==="occasional"?"bg-blue-500 hover:bg-blue-600 text-white font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Occasional</button>
                </div>
                <div className="flex justify-center items-start ">
                    {currentTab==="daily" &&
                            <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                                <h2 className="text-3xl mb-4 mt-4 font-bold">Daily expense form</h2>
                                <form onSubmit={handleDailySubmit} className="w-full py-6">
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Date</label>
                                        <input 
                                            type="date"
                                            value={date}
                                            onChange={(e)=>setDate(e.target.value)}
                                            placeholder="Enter date"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Food</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={food}
                                            onChange={(e)=>setFood(e.target.value)}
                                            placeholder="Enter food expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Travel</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={travel}
                                            onChange={(e)=>setTravel(e.target.value)}
                                            placeholder="Enter travel expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Shopping</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={shop}
                                            onChange={(e)=>setShop(e.target.value)}
                                            placeholder="Enter shopping expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Entertainment</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={entmt}
                                            onChange={(e)=>setEntmt(e.target.value)}
                                            placeholder="Enter entertainment expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Others</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={others}
                                            onChange={(e)=>setOthers(e.target.value)}
                                            placeholder="Enter other expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Notes</label>
                                        <input 
                                            type="text"
                                            value={notes}
                                            onChange={(e)=>setNotes(e.target.value)}
                                            placeholder="Any notes"
                                            className="w-full border m-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Total</label>
                                        <input 
                                            type="Number"
                                            value={total}
                                            readOnly
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                    >Add</button>
                                </form>
                                {submitMsg && (<p className="text-green-700 text-sm font-bold mt-3 mb-3">{submitMsg}</p>)}
                            </div>
                        }
                        {currentTab==="monthly" &&
                            <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                                <h2 className="text-3xl mb-4 mt-4 font-bold">Monthly expense form</h2>
                                <form onSubmit={handleMonthlySubmit} className="w-full py-6">
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Month</label>
                                        <select
                                            value={month}
                                            onChange={(e)=>setMonth(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                        <option value="">Select month</option>
                                        {['January', 'February', 'March', 'April', 'May', 'June', 'July',
                                             'August', 'September', 'October', 'November', 'December'].map((m)=>(
                                                <option key={m} value={m}>{m}</option>
                                             ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Year</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={year}
                                            onChange={(e)=>setYear(e.target.value)}
                                            placeholder="Enter year"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Electricity</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={ecity}
                                            onChange={(e)=>setEcity(e.target.value)}
                                            placeholder="Enter electricty expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Water</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={water}
                                            onChange={(e)=>setWater(e.target.value)}
                                            placeholder="Enter water expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Rent</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={rent}
                                            onChange={(e)=>setRent(e.target.value)}
                                            placeholder="Enter rent"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Others</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={others}
                                            onChange={(e)=>setOthers(e.target.value)}
                                            placeholder="Enter other expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Notes</label>
                                        <input 
                                            type="text"
                                            value={notes}
                                            onChange={(e)=>setNotes(e.target.value)}
                                            placeholder="Any notes"
                                            className="w-full border m-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Total</label>
                                        <input 
                                            type="Number"
                                            value={sum}
                                            readOnly
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                    >Add</button>
                                </form>
                                {submitMsg && (<p className="text-green-700 text-sm font-bold mt-3 mb-3">{submitMsg}</p>)}
                            </div>
                        }
                        {currentTab==="occasional" &&
                            <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                                <h2 className="text-3xl mb-4 mt-4 font-bold">Occasional expense form</h2>
                                <form onSubmit={handleOccasionalSubmit} className="w-full py-6">
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Date</label>
                                        <input
                                            type="date"
                                            value={date}
                                            placeholder="Enter date"
                                            onChange={(e)=>setDate(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Insurance</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={insurance}
                                            onChange={(e)=>setInsurance(e.target.value)}
                                            placeholder="Enter insurance amount"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">School fee</label>
                                        <input 
                                           type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={schoolFee}
                                            onChange={(e)=>setSchoolFee(e.target.value)}
                                            placeholder="Enter school fee"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Repair</label>
                                        <input 
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            value={repair}
                                            onChange={(e)=>setRepair(e.target.value)}
                                            placeholder="Enter repair expenses"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Notes</label>
                                        <input 
                                            type="text"
                                            value={notes}
                                            onChange={(e)=>setNotes(e.target.value)}
                                            placeholder="Any notes"
                                            className="w-full border m-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Total</label>
                                        <input 
                                            type="Number"
                                            value={osum}
                                            readOnly
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                    >Add</button>
                                </form>
                                {submitMsg && (<p className="text-green-700 text-sm font-bold mt-3 mb-3">{submitMsg}</p>)}
                            </div>
                        }
                </div>  
            </div>
        </>
        
    );
};
export default AddExpense;