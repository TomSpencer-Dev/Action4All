// import React from 'react';
// import Cookies from 'js-cookie';
// import icon from '../assets/icon.png';

// function Navigation(props) {
//   const userEmail = Cookies.get('userEmail');
//   const isLoggedIn = Cookies.get('isLoggedIn') === 'true';
//   console.log('isLoggedIn:', isLoggedIn); 

//   const handleLogout = () => {
//     // Remove cookies on logout
//     Cookies.remove('userEmail');
//     Cookies.remove('isLoggedIn');

//     // Update the application state to indicate the user is logged out
//     props.setLoggedIn(null, null);
//   };

//   return (
//     <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
//       <div className="flex items-center flex-shrink-0 text-white mr-6">
//         <a href="/"><img className="png" src={icon} alt="icon" title="icon" /></a>
//         <span className="font-semibold text-xl tracking-tight">Action4All</span>
//       </div>
//       <div className="block lg:hidden">
//         <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
//           <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
//         </button>
//       </div>
//       <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//         <div className="text-sm lg:flex-grow">
//           <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
//             Home
//           </a>
//           <a href="/volunteer" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
//             Volunteer
//           </a>
//           <a href="/create" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
//             Create Event
//           </a>
//         </div>
//         <div>
//           {/* {userEmail ? (
//             <div>
//               {userEmail}{' '}
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="button"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button> */}
//               {isLoggedIn ? (
//           <div>
//             {userEmail}{' '}
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//             </div>
//           ) : (
//             <a
//               href="/register"
//               className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
//             >
//               Register
//             </a>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

//  export default Navigation;


import React from 'react';
import Cookies from 'js-cookie';
import { Link, Navigate } from 'react-router-dom';
import icon from '../assets/icon.png';

function Navigation(props) {
  const userEmail = Cookies.get('userEmail');
  const isLoggedIn = Cookies.get('isLoggedIn') === 'true';

  const handleLogout = () => {
    // Remove cookies on logout
    Cookies.remove('userEmail');
    Cookies.remove('isLoggedIn');

    // Update the application state to indicate the user is logged out
    props.setLoggedIn(null, null);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <img className="png" src={icon} alt="icon" title="icon" />
        </Link>
        <span className="font-semibold text-xl tracking-tight">Action4All</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
          </Link>
          
            <>
              <Link to="/volunteer" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Volunteer
              </Link>
              <Link to="/create" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                Create Event
              </Link>
            </>
          
        </div>
        <div>
          {isLoggedIn ? (
            <div>
              {userEmail}{' '}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
 //just now
