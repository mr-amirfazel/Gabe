
import { FC } from 'react';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Main } from '../Main';

export const MessangerLayout:FC = () => {
    return (
        <div className="w-full flex justify-center items-center  h-[99%]">
      <div className="w-full flex space-x-4 h-full">
        {/* First Column with colspan 1 */}
        <div className="flex-none w-1/12 h-[99%]"> <Navbar /></div>
        
        {/* Second Column with colspan 3 */}
        <div className="flex-none w-3/12  h-[99%]"><Sidebar /></div>
        
        {/* Third Column with colspan 8 */}
        <div className="flex-grow h-[99%]"><Main /></div>
      </div>
    </div>
      ); 
}