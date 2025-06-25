import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
const AddExpense = () =>{
    const[currentTab, setCurrentTab]=useState("daily");
    //all
    const[others, setOthers]=useState(0);
    const[notes, setNotes]=useState('');
    //daily
    const[date, setDate]=useState('');
    const[food, setFood]=useState(0);
    const[travel, setTravel]=useState(0);
    const[entmt, setEntmt]=useState(0);
    const[shop, setShop]=useState(0);
    const[total, setTotal]=useState(0);
    useEffect(()=>{
        const dtotal= Number(food)+Number(travel)+Number(entmt)+Number(shop)+Number(others);
        setTotal(dtotal);
    }, [food, travel, entmt, shop, others]);

    //monthly
    const[month, setMonth]=useState('');
    const[year, setYear]=useState(0);
    const[ecity, setEcity]=useState(0);
    const[water, setWater]=useState(0);
    const[rent, setRent]=useState(0);
    const[sum, setSum]=useState(0);
    useEffect(()=>{
        const mtotal= Number(ecity)+Number(water)+Number(rent)+Number(others);
        setSum(mtotal);
    }, [ecity, water, rent, others]);

    //occasional
    const[insurance, setInsurance]=useState(0);
    const[schoolFee, setSchoolFee]=useState(0);
    const[repair, setRepair]=useState(0);
    const[osum, setOsum]=useState(0);
    useEffect(()=>{
        const ototal= Number(insurance)+Number(schoolFee)+Number(repair);
        setOsum(ototal);
    }, [insurance, schoolFee, repair]);
    
    return(
        <>
            <div className="bg-gray-400  min-h-screen">
                <Navbar/>
                <h1 className="text-gray-800 text-3xl sm:4xl md:text-5xl  font-bold mb-6 px-4 py-4 ">Add Expense</h1>
                <div className="flex justify-center space-x-4 mb-6">
                    <button onClick={()=>setCurrentTab('daily')} className={`px-4 py-4 shadow-md rounded ${currentTab==="daily"?"bg-blue-500 text-white hover:bg-blue-600 font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Daily</button>
                    <button onClick={()=>setCurrentTab('monthly')} className={`px-4 py-4 shadow-md rounded ${currentTab==="monthly"?"bg-blue-500 text-white hover:bg-blue-600 font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Monthly</button>
                    <button onClick={()=>setCurrentTab('occasional')} className={`px-4 py-4 shadow-md rounded ${currentTab==="occasional"?"bg-blue-500 hover:bg-blue-600 text-white font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Occasional</button>
                </div>
                <div className="flex justify-center items-start ">
                    {currentTab==="daily" &&
                            <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                                <h2 className="text-3xl mb-4 mt-4 font-bold">Daily expense form</h2>
                                <form className="w-full py-6">
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
                                            type="number"
                                            value={food}
                                            onChange={(e)=>setFood(e.target.value)}
                                            placeholder="Enter food expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Travel</label>
                                        <input 
                                            type="number"
                                            value={travel}
                                            onChange={(e)=>setTravel(e.target.value)}
                                            placeholder="Enter travel expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Shopping</label>
                                        <input 
                                            type="number"
                                            value={shop}
                                            onChange={(e)=>setShop(e.target.value)}
                                            placeholder="Enter shopping expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Entertainment</label>
                                        <input 
                                            type="number"
                                            value={entmt}
                                            onChange={(e)=>setEntmt(e.target.value)}
                                            placeholder="Enter entertainment expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Others</label>
                                        <input 
                                            type="number"
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
                                            placeholder="Enter date"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                    >Add</button>
                                </form>
                            </div>
                        }
                        {currentTab==="monthly" &&
                            <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                                <h2 className="text-3xl mb-4 mt-4 font-bold">Monthly expense form</h2>
                                <form className="w-full py-6">
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
                                            type="number"
                                            value={year}
                                            onChange={(e)=>setYear(e.target.value)}
                                            placeholder="Enter year"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Electricity</label>
                                        <input 
                                            type="number"
                                            value={ecity}
                                            onChange={(e)=>setEcity(e.target.value)}
                                            placeholder="Enter electricty expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Water</label>
                                        <input 
                                            type="number"
                                            value={water}
                                            onChange={(e)=>setWater(e.target.value)}
                                            placeholder="Enter water expense"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Rent</label>
                                        <input 
                                            type="number"
                                            value={rent}
                                            onChange={(e)=>setRent(e.target.value)}
                                            placeholder="Enter rent"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Others</label>
                                        <input 
                                            type="number"
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
                            </div>
                        }
                        {currentTab==="occasional" &&
                            <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                                <h2 className="text-3xl mb-4 mt-4 font-bold">Occasional expense form</h2>
                                <form className="w-full py-6">
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
                                            type="number"
                                            value={insurance}
                                            onChange={(e)=>setInsurance(e.target.value)}
                                            placeholder="Enter insurance amount"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">School fee</label>
                                        <input 
                                            type="number"
                                            value={schoolFee}
                                            onChange={(e)=>setSchoolFee(e.target.value)}
                                            placeholder="Enter school fee"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Repair</label>
                                        <input 
                                            type="number"
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
                            </div>
                        }
                </div>  
            </div>
        </>
        
    );
};
export default AddExpense;