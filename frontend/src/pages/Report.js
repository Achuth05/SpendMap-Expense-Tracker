import React from 'react';
import {jwtDecode} from 'jwt-decode';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import {Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

const ReportPage=()=>{
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const[weeklyData, setWeeklyData]=useState(null);
    const[chartData, setChartData]=useState(null);
    const[monthlyData, setMonthlyData]=useState(null);
    const[occasionalData, setOccasionalData]=useState(null);
    const[compareData, setCompareData]=useState(null);
    const[showForm, setShowForm]=useState(true);
    const[currentTab, setCurrentTab]=useState('weekly');
    const[startDate, setStartDate]=useState('');
    const[endDate, setEndDate]=useState('');
    const[month, setMonth]=useState('');
    const[year, setYear]=useState('');
    const[month1, setMonth1]=useState('');
    const[year1, setYear1]=useState('');
    const[month2, setMonth2]=useState('');
    const[year2, setYear2]=useState('');
    const chartRef=useRef(null);
    const logoRef=useRef();
    
    const handleWeeklyReport=async(e)=>{
        e.preventDefault();
        setLoading(true);
        const token=localStorage.getItem('token');
        const decoded=jwtDecode(token);
        const userId=decoded.user.id;
        console.log("fetching for", startDate, endDate);
        try{
            const res = await fetch(`https://spendmap-server.onrender.com/api/reports/weekly/${userId}?startDate=${startDate}&endDate=${endDate}`,
                {
                    headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                }
            );
            const data=await res.json();
            console.log("Response:", data);
            const fields=['Food', 'Travel', 'Entertainment', 'Shopping', 'Others'];
            const values=fields.map(field=>(data.data[`total${field}`]||0));
            const max=Math.max(...values);
            const backgroundColors=values.map(val=>val===max?'rgba(255, 99, 132, 0.8)':'rgba(54, 162, 235, 0.7)');
            setChartData({
                labels:fields,
                datasets:[
                    {
                        label:"Weekly expense report",
                        data:values,
                        backgroundColor:backgroundColors,
                    },  
                ],
            });
            console.log( "Chart data", chartData);
            setWeeklyData(data.data);
            setShowForm(false);
        }
        catch(error){
            console.error("Error fetching weekly report", error);
        }
        finally{
            setLoading(false);
        }
    }

    const handleMonthlyReport=async(e)=>{
        e.preventDefault();
        setLoading(true);
        const token=localStorage.getItem('token');
        const decoded=jwtDecode(token);
        const userId=decoded.user.id;
        console.log("fetching for", month, year);
        try{
            const res= await fetch(`https://spendmap-server.onrender.com/api/reports/monthly/${userId}/${month}/${year}`,
                {
                    headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                }
            );
            const data= await res.json();
            console.log("Response:", data);
            const fields=['Electricity', 'Water', 'Rent', 'Others'];
            const values=fields.map(field=>data.data[`total${field}`]||0);
            const max=Math.max(...values);
            const backgroundColors=values.map(val=>val===max?'rgba(255, 99, 132, 0.8)':'rgba(60, 179, 160, 0.7)')
            setChartData({
                labels:fields,
                datasets:[{
                    label:"Monthly Expense Report",
                    data:values,
                    backgroundColor:backgroundColors,
                }],
            });
            setMonthlyData(data.data);
            setShowForm(false);
        }
        catch(error){
            console.error("Error fetching monthly report", error);
        }
        finally{
            setLoading(false);
        }
    }

    const handleOccasionalReport=async(e)=>{
        e.preventDefault();
        setLoading(true);
        const token=localStorage.getItem('token');
        const decoded=jwtDecode(token);
        const userId=decoded.user.id;
        console.log("Fetching for", year);
        try{
            const res= await fetch(`https://spendmap-server.onrender.com/api/reports/occasional/${userId}/${year}`,
                {
                    headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                }
            );
            const data=await res.json();
            console.log("Response:", data);
            const fields=['Insurance', 'SchoolFee', 'Repair'];
            const values=fields.map(field=>data.data[`total${field}`]||0);
            const max=Math.max(...values);
            const backgroundColors=values.map(val=>val===max?'rgba(255, 99, 132, 0.8)':'rgba(255, 206, 86, 0.8)');
            setChartData({
                labels:fields,
                datasets:[{
                    label:"Occasional Expense Report",
                    data:values,
                    backgroundColor:backgroundColors,
                }],
            });
            setOccasionalData(data.data);
            setShowForm(false);
        }
        catch(error){
            console.error("Error fetching occasional report", error);
        }
        finally{
            setLoading(false);
        }
    }
    
    const handleCompare=async(e)=>{
        e.preventDefault();
        setLoading(true);
        const token=localStorage.getItem('token');
        const decoded=jwtDecode(token);
        const userId=decoded.user.id;
        console.log("Fetching for:", month1, year1, month2, year2);
        try{
            const res=await fetch(`https://spendmap-server.onrender.com/api/reports/compare/${userId}/${month1}/${year1}/${month2}/${year2}`,
                {
                    headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}
                }
            );
            const data=await res.json();
            console.log("Response:", data);
            const fields=['Electricity', 'Water', 'Rent', 'Others'];
            const labels=fields;
            const mlabel1=`${month1}, ${year1}`;
            const mlabel2=`${month2}, ${year2}`;
            const month1Values=fields.map(field=>data.individual[`total${field}`]?.[mlabel1]||0);
            const month2Values=fields.map(field=>data.individual[`total${field}`]?.[mlabel2]||0);
            setChartData({
                labels,
                datasets:[
                    {
                        label:mlabel1,
                        data:month1Values,
                        backgroundColor:'rgba(54, 162, 235, 0.7)',
                    },
                    {
                        label:mlabel2,
                        data:month2Values,
                        backgroundColor:'rgba(255, 206, 86, 0.7)',
                    },
                ]
            });
            setCompareData(data);
            setShowForm(false);
        }
        catch(error){
            console.error("Error fetching occasional report", error);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div className='pt-16 bg-gray-400 min-h-screen'>
            <Navbar/>
            {loading && (
                <div className="flex justify-center items-center my-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
                </div>
            )}
            <div ref={logoRef} className=' flex justify-center items-center absolute invisible top-0 left-0 mt-4 flex-col'>
                <span className='text-xl mb-3sm:text-2xl md:text-3xl lg:text-4xl text-blue-800 font-bold'>
                    Spend<span className='text-green-700'>Map</span></span>
                <p className='max-w-xl text-md text-center italic mb-6'>Tracking expenses with ease</p>
            </div>
            <h1 className="text-gray-800 text-3xl sm:4xl md:text-5xl font-bold mb-6 px-4 py-4">Get your REPORT</h1>
            <div className="grid grid-cols-2 gap-4 mx-4 mb-6 sm:flex sm:justify-center sm:space-x-4 sm:gap-0">
                <button onClick={()=>{setCurrentTab('weekly');
                                        setShowForm(true);}}
                        className={`px-4 py-4 shadow-md rounded ${currentTab==="weekly"?"bg-blue-500 text-white hover:bg-blue-600 font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Weekly</button>
                <button onClick={()=>{setCurrentTab('monthly');
                                        setShowForm(true);}}
                        className={`px-4 py-4 shadow-md rounded ${currentTab==="monthly"?"bg-blue-500 text-white hover:bg-blue-600 font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Monthly</button>
                <button onClick={()=>{setCurrentTab('occasional');
                                        setShowForm(true);}}
                        className={`px-4 py-4 shadow-md rounded ${currentTab==="occasional"?"bg-blue-500 hover:bg-blue-600 text-white font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Occasional</button>
                <button onClick={()=>{setCurrentTab('compare');
                                        setShowForm(true);}}
                        className={`px-4 py-4 shadow-md rounded ${currentTab==="compare"?"bg-blue-500 hover:bg-blue-600 text-white font-bold":"bg-gray-600 hover:bg-gray-500 text-white"}`}>Compare</button>
            </div>
            
                {currentTab==="weekly" &&
                        (showForm &&(
                            <div className='w-full px-4 py-6'>
                                <div className="bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto">
                                    <form onSubmit={handleWeeklyReport} className="w-full py-6">
                                        <h2 className="text-2xl mb-4 mt-4 font-bold">Enter dates</h2>
                                        <div className="mb-4">
                                            <label className="text-sm text-gray-800 mb-1 font-bold block">Start date</label>
                                            <input 
                                                type="date"
                                                value={startDate}
                                                onChange={(e)=>setStartDate(e.target.value)}
                                                placeholder="Enter start date"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="text-sm text-gray-800 mb-1 font-bold block">End date</label>
                                            <input 
                                                type="date"
                                                value={endDate}
                                                onChange={(e)=>setEndDate(e.target.value)}
                                                placeholder="Enter start date"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                            />
                                        </div>
                                        <button 
                                            type="submit"
                                            className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                        >Fetch report</button>
                                    </form>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                        onClick={()=>{navigate('/home')}}>
                                    Back
                                </button>
                            </div>
                            ))}
                            {currentTab==='weekly' && !showForm && weeklyData && Object.keys(weeklyData).length>0 &&(
                                <div className='w-full px-4 py-6'>
                                    <div className='flex items-center justify-center w-full max-w-md sm:p-6 mx-auto'>
                                        <div className='bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto'>
                                            <h2 className='text-2xl font-bold mb-4 border-b pb-2 text-gray-800'>Weekly report</h2>
                                            <div className='flex justify-between'>
                                                <span>Food:</span>
                                                <span>₹{weeklyData.totalFood ||0}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>Travel:</span>
                                                <span>₹{weeklyData.totalTravel ||0}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>Entertainment:</span>
                                                <span>₹{weeklyData.totalEntertainment||0}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>Shopping:</span>
                                                <span>₹{weeklyData.totalShopping ||0}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>Others:</span>
                                                <span>₹{weeklyData.totalOthers ||0}</span>
                                            </div>
                                            <div className='mt-4 pt-2 border-t text-xl font-bold text-gray-800 flex justify-between'>
                                                <span>Total expense:</span>
                                                <span>₹{weeklyData.totalAmount || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-center px-4 py-4'>
                                        <div className='w-full max-w-3xl md:h-[400px] bg-gray-200 rounded shadow-md'>
                                            <Bar ref={chartRef} data={chartData} options={{
                                                responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{enabled:true}}, scales:{
                                                    y:{
                                                        beginAtZero:true, ticks:{
                                                            precision:0,
                                                            stepSize:100,
                                                        }
                                                    }
                                                } }} height={300}/>
                                        </div>
                                    </div>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                        onClick={()=>{setShowForm(true)}}>
                                        Back
                                    </button>
                                </div>
                                )}
                                {currentTab==='weekly' && !showForm && (!weeklyData || Object.keys(weeklyData).length===0) &&
                                    (
                                    <>
                                    <div className='bg-red-100 text-red-700 p-4 rounded shadow max-w-md mx-auto'>No data for this range</div>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                                onClick={()=>{setShowForm(true)}}>
                                            Back
                                    </button>
                                    </>
                                    )}
                        
                    {currentTab==="monthly" && showForm &&(
                        <div className='w-full px-4 py-6'>
                            <div className="bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto">
                                <h2 className="text-2xl mb-4 mt-4 font-bold">Enter month and year</h2>
                                <form onSubmit={handleMonthlyReport} className="w-full py-6">
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
                                    <button 
                                        type="submit"
                                        className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                    >Fetch report</button>
                                </form>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                        onClick={()=>{navigate('/home')}}>
                                Back
                            </button>
                        </div>
                    )}
                    {currentTab==='monthly' && !showForm && monthlyData && Object.keys(monthlyData).length>0 && (
                        <div className='w-full px-4 py-6'>
                                    <div className='flex items-center justify-center w-full max-w-md sm:p-6 mx-auto'>
                                    <div className='bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto'>
                                        <h2 className='text-2xl font-bold mb-4 border-b pb-2 text-gray-800'>Monthly report</h2>
                                        <div className='flex justify-between'>
                                            <span>Electricity:</span>
                                            <span>₹{monthlyData.totalElectricity ||0}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Water:</span>
                                            <span>₹{monthlyData.totalWater ||0}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Rent:</span>
                                            <span>₹{monthlyData.totalRent||0}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Others:</span>
                                            <span>₹{monthlyData.totalOthers ||0}</span>
                                        </div>
                                        <div className='mt-4 pt-2 border-t text-xl font-bold text-gray-800 flex justify-between'>
                                            <span>Total expense:</span>
                                            <span>₹{monthlyData.totalMonthly || 0}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center px-4 py-4'>
                                        <div className='w-full max-w-3xl px-2 py-2 md:h-[400px] bg-gray-200 rounded shadow-md'>
                                            <Bar data={chartData} options={{
                                                responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{enabled:true}}, scales:{
                                                    y:{
                                                        beginAtZero:true, ticks:{
                                                            precision:0,
                                                            stepSize:100,
                                                        }
                                                    }
                                                } }} height={300}/>
                                        </div>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                                onClick={()=>{setShowForm(true)}}>
                                            Back
                                </button>
                        </div>
                    )}   
                    {currentTab==='monthly' && !showForm && (!monthlyData || Object.keys(monthlyData).length===0) &&
                                    (
                                    <>
                                        <div className='bg-red-100 text-red-700 p-4 rounded shadow max-w-md mx-auto'>No data for this month</div>
                                         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                                onClick={()=>{setShowForm(true)}}>
                                            Back
                                        </button>
                                    </>
                                    
                                    )}

                    {currentTab==="occasional" && showForm && (
                        <div className='w-full px-4 py-6'>
                            <div className='bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto'>
                                <h1 className='text-gray-800 text-2xl mb-4 mt-4 font-bold'>Enter year</h1>
                                <form onSubmit={handleOccasionalReport} className='w-full py-6'>
                                    <div className='mb-4'>
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Year</label>
                                            <input 
                                                type="text"
                                                pattern='[0-9]*'
                                                inputMode='numeric'
                                                value={year}
                                                onChange={(e)=>setYear(e.target.value)}
                                                placeholder="Enter year"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                            />
                                    </div>
                                    <button 
                                            type="submit"
                                            className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                        >Fetch report</button>
                                </form>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                        onClick={()=>{navigate('/home')}}>
                                    Back
                            </button>
                        </div>
                    )}
                    {currentTab==='occasional' && !showForm && occasionalData && Object.keys(occasionalData).length>0 && (
                        <div className='w-full px-4 py-6'>
                            <div className='flex items-center justify-center w-full max-w-md sm:p-6 mx-auto'>
                                    <div className='bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto'>
                                        <h2 className='text-2xl font-bold mb-4 border-b pb-2 text-gray-800'>Occasional report</h2>
                                        <div className='flex justify-between'>
                                            <span>Insurance:</span>
                                            <span>₹{occasionalData.totalInsurance ||0}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>School Fee:</span>
                                            <span>₹{occasionalData.totalSchoolFee ||0}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Repair:</span>
                                            <span>₹{occasionalData.totalRepair||0}</span>
                                        </div>
                                        <div className='mt-4 pt-2 border-t text-xl font-bold text-gray-800 flex justify-between'>
                                            <span>Total expense:</span>
                                            <span>₹{occasionalData.totalOccasional || 0}</span>
                                        </div>
                                    </div>
                            </div>
                            <div className='flex justify-center px-4 py-4'>
                                    <div className='w-full max-w-3xl px-2 py-2 md:h-[400px] bg-gray-200 rounded shadow-md'>
                                        <Bar data={chartData} options={{
                                            responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{enabled:true}}, scales:{
                                                y:{
                                                    beginAtZero:true, ticks:{
                                                        precision:0,
                                                        stepSize:100,
                                                    }
                                                }
                                            } }} height={300}/>
                                    </div>
                                </div>
                             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                        onClick={()=>{setShowForm(true)}}>
                                    Back
                            </button>
                        </div>
                    ) }
                    {currentTab==='occasional' && !showForm && (!occasionalData || Object.keys(occasionalData).length===0) &&
                                    (
                                    <>
                                        <div className='bg-red-100 text-red-700 p-4 rounded shadow max-w-md mx-auto'>No data for this year</div>
                                         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                                onClick={()=>{setShowForm(true)}}>
                                            Back
                                        </button>
                                    </>
                                    
                                    )}

                    {currentTab==="compare" && showForm && (
                        <div className='w-full px-4 py-6'>
                            <div className="bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto">
                                <form onSubmit={handleCompare} className="w-full py-6">
                                    <div className="mb-4">
                                        <h1 className="text-2xl mb-4 mt-4 font-bold">Enter first month and year</h1>
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Month</label>
                                        <select
                                            value={month1}
                                            onChange={(e)=>setMonth1(e.target.value)}
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
                                            value={year1}
                                            pattern='[0-9]*'
                                            inputMode='numeric'
                                            onChange={(e)=>setYear1(e.target.value)}
                                            placeholder="Enter year"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <h1 className="text-2xl mb-4 mt-4 font-bold">Enter second month and year</h1>
                                        <label className="text-sm text-gray-800 mb-1 font-bold block">Month</label>
                                        <select
                                            value={month2}
                                            onChange={(e)=>setMonth2(e.target.value)}
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
                                            value={year2}
                                            onChange={(e)=>setYear2(e.target.value)}
                                            placeholder="Enter year"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full bg-gray-600 text-white font-bold hover:bg-blue-500 p-1 rounded shadow-md"
                                    >Fetch report</button>
                                </form>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                        onClick={()=>{navigate('/home')}}>
                                    Back
                            </button>
                        </div>
                        )
                    }
                    {currentTab==='compare' && !showForm && compareData && (
                        <div className='w-full px-4 py-6'>
                                <div className='flex items-center justify-center w-full max-w-md sm:p-6 mx-auto'>
                                    <div className='bg-gray-200 p-5 sm:p-6 rounded-lg w-full max-w-md shadow-md mx-auto'>
                                        <h2 className='text-2xl font-bold mb-4 border-b pb-2 text-gray-800'>Comparison report</h2>
                                        <div className='mb-4 space-y-1'>
                                            <div className='flex justify-between'>
                                                <span>{Object.keys(compareData.totalComp)[0]}</span>
                                                <span>₹{compareData.totalComp[Object.keys(compareData.totalComp)[0]]}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>{Object.keys(compareData.totalComp)[1]}</span>
                                                <span>₹{compareData.totalComp[Object.keys(compareData.totalComp)[1]]}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>Difference:</span>
                                                <span>₹{compareData.totalComp.difference}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>More in:</span>
                                                <span>{compareData.totalComp.more}</span>
                                            </div>
                                            <div className='text-sm text-gray-600 mt-2 italic font-bold'>
                                                Reason: {compareData.totalComp.reason}
                                            </div>
                                        </div>
                                        <div className='border-gray-400 border-t pt-3 mt-3'>
                                            <h3 className='text-xl font-semibold mb-2 text-gray-800'>Category-wise breakdown</h3>
                                            {Object.entries(compareData.individual).map(([category, value])=>(
                                                <div className='mb-3' key={category}>
                                                    <div className='text-gray-700 font-medium mb-1'>
                                                        {category.replace('total','')}
                                                    </div>
                                                    <div className='flex justify-between text-sm'>
                                                        <span>{Object.keys(value)[0]}:</span>
                                                        <span>₹{value[Object.keys(value)[0]]}</span>
                                                    </div>
                                                    <div className='flex justify-between text-sm'>
                                                        <span>{Object.keys(value)[1]}:</span>
                                                        <span>₹{value[Object.keys(value)[1]]}</span>
                                                    </div>
                                                    <div className='flex justify-between text-sm'>
                                                        <span>Difference:</span>
                                                        <span>₹{value.difference}</span>
                                                    </div>
                                                    <div className='flex justify-between text-sm'>
                                                        <span>More in:</span>
                                                        <span>{value.moreIn}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center px-4 py-4'>
                                    <div className='w-full max-w-3xl px-2 py-2 md:h-[400px] bg-gray-200 rounded shadow-md'>
                                        <Bar data={chartData} options={{
                                            responsive:true, maintainAspectRatio:false, plugins:{legend:{display:true}, tooltip:{enabled:true}}, scales:{
                                                y:{
                                                    beginAtZero:true, ticks:{
                                                        precision:0,
                                                        stepSize:100,
                                                    }
                                                }
                                            } }} height={300}/>
                                    </div>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                                        onClick={()=>{setShowForm(true)}}>
                                    Back
                                </button>
                        </div>
                    )}
            
        </div>
    );
};
export default ReportPage;