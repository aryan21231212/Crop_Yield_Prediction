import React from 'react'
import PillNavbar from './PillNavbar'
import Homepage from './Homepage'
import ContentGridSection from './ContentGridSection'
import SolutionsGridSection from './SolutionGridSection'
import Footer from './Footer'

const AgriTechLandingPage = () => {
  return (
    <div>
      <div className='flex justify-between items-center px-10'>
        <div> logo</div>
         <div><PillNavbar/></div>
         <div className='flex gap-5 items-center font-bold'>
        <div>Sign in</div>
        <div className='border-1 rounded-full p-2'>Sign Up</div>
         </div>
          
         
        
      </div>
       <Homepage/>
       <ContentGridSection/>
       <SolutionsGridSection/>
       <Footer/>
    </div>
  )
}

export default AgriTechLandingPage
