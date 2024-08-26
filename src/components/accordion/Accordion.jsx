// import { useState } from 'react';
// import data from './data';
// import './styles.css';

// const Accordion = () => {
//   const [select, setSelect] = useState();
//   const [input, setInput] = useState(false);

//   const handleSelect = curId => {
//     setSelect(curId);

//       // закрытие
//     // if (select === curId) {
//     //   setSelect();
//     //   console.log('selectIn', select);
//     // }  else {
//     //       setSelect(curId);
//     //     }
//   };

//   console.log('select', select);

//   const handleMultiSelect = () => {
//     setInput(true);
//   };

//   return (
//     <div className="acc-wrapper">
//       <button onClick={() => handleMultiSelect()}>Enable Multi Selection</button>
//       <div className="accordion">
//         {data && data.length > 0 ? (
//           data.map(dataEl => {
//             return (
//               <div key={dataEl.id} className="item">
//                 <div onClick={() => handleSelect(dataEl.id)} className="title">
//                   <h2>{dataEl.question}</h2>
//                   <span>+</span>
//                 </div>
//                 {/* {select === dataEl.id ? <div className="acc-content">{dataEl.answer}</div> : ''} */}
//                     {select === dataEl.id ? <div className="acc-content">{dataEl.answer}</div> : ''}
//                     {select === dataEl.id ? <div className="acc-content">{dataEl.answer}</div> : ''}
//               </div>
//             );
//           })
//         ) : (
//           <div>No Data Found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Accordion;

import { useState } from 'react';
import data from './data';
import './styles.css';

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId);
    if (selected === getCurrentId) setSelected();
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMutiple = [...multiple]; //?
    console.log('cpyMutiple', cpyMutiple);

    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId); // -1  3(если 2 раза нажмем на последний)

    if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId);
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMutiple);
  }

  console.log('multiple', multiple);

  return (
    <div className="acc-wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map(dataItem => (
            <div key={data.id} className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {selected === dataItem.id ? <div className="acc-content">{dataItem.answer}</div> : ''}

              
              
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}
