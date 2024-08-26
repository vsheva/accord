import { useState } from 'react';
import data from './data';
import './styles.css';

const Accordion = () => {
  const [select, setSelect] = useState();
  const [enableMulti, setEnableMulti] = useState(false);
  const [multi, setMulti] = useState([]);

  const singleSelect = curId => {
    setSelect(curId);

    // закрытие
    if (select === curId) {
      setSelect();
    }
  };
  console.log('select', select);

  const multiSelect = curId => {
    const accMulti = [...multi];
    const indexId = accMulti.indexOf(curId); 

    if (enableMulti) {
      accMulti.includes(curId) === false ? accMulti.push(curId) : accMulti.splice(indexId, 1);
    }
    setMulti(accMulti);
  };
  console.log('accMulti', multi);

  const handleMultiButton = () => {
    setEnableMulti(!enableMulti);
  };

  return (
    <div className="acc-wrapper">
      <button onClick={() => handleMultiButton()}>Enable Multi Selection</button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map(dataEl => {
            return (
              <div key={dataEl.id} className="item">
                <div
                  onClick={
                    enableMulti ? () => multiSelect(dataEl.id) : () => singleSelect(dataEl.id)
                  }
                  className="title"
                >
                  <h2>{dataEl.question}</h2>
                  <span>+</span>
                </div>
                {enableMulti ? (
                  multi.includes(dataEl.id) ? (
                    <div className="acc-content">{dataEl.answer}</div>
                  ) : (
                    ''
                  )
                ) : select === dataEl.id ? (
                  <div className="acc-content">{dataEl.answer}</div>
                ) : (
                  ''
                )}

                {/* {select === dataEl.id ? <div className="acc-content">{dataEl.answer}</div> : ''} */}
              </div>
            );
          })
        ) : (
          <div>Data Was Not Found</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
