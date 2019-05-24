import React from 'react';

/**dump component for render content from props of smart comp*/
const View = ({list, addNewInput, destroyAll}) => {
    return (
        <div className="numeric-input">
            <div className='lib-controls'>
                <ul>{list}</ul>
            </div>
            <button className={'button mr-2'} onClick={(ev) => addNewInput(ev, 'numeric')}>Add NumericInput</button>
            <button className={'button mr-2'} onClick={(ev) => addNewInput(ev, 'calc')}>Add CalcInput</button>
            <button className={'button mr-2'} onClick={(ev) => destroyAll(ev)}>Destroy all</button>
        </div>
    );
}

export default View;
