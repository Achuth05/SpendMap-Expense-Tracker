import React from 'react';
import {Link} from 'react-router-dom';
const AboutPage=()=>{
    return(
        <div className='min-h-screen bg-gray-400 flex flex-col px-4 py-10 items-center text-gray-800'>
            <span className='text-4xl mb-4 sm:text-4xl md:text-5xl lg:text-6xl text-blue-800 font-bold'>
                Spend<span className='text-green-700'>Map</span></span>
            <p className=' max-w-2xl text-md text-center italic mb-6'>Tracking expenses with ease</p>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mb-10'>
                {[
                    ["Track your spendings easily", "Add and manage your daily, monthly and occasional expenses."],
                    ["Visual reports", "View weekly trends, monthly comparisons and category-wise breakdowns."],
                    ["Safe & Secure", "Your data is private and secure."]
                ].map(([title, desc], i)=>{
                    return(
                         <div key={i} className='bg-white p-5 rounded-lg shadow md'>
                        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
                        <p className='text-sm text-gray-600'>{desc}</p>
                    </div>
                    )
                })}
            </div>
            <Link to='/login'><button className='bg-blue-600 text-white front-bold px-6 py-2 rounded hover:bg-green-700 transition'>Get Started</button></Link>
            <footer className='mt-10 text-sm text-gray-500'>A project by AK</footer>
        </div>
    );
};
export default AboutPage;