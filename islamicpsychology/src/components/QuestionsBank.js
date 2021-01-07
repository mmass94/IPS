import React, { useState } from 'react';
import '../Pages/Questions'
import '../components/main.css';


const  QuestionsPage  =props =>{
return(

           <div>               
          {props.questionText} 
         {props.questionanswer} 
            </div>

   );
}


export default QuestionsPage;