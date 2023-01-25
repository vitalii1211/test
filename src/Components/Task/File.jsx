import React from 'react';

function File(props) {

    function FileUpload(file) {

    }

    return (
        <div className="Header">
            <p>Загрузить файлы</p>
            <input type="file" id="fileUpload"/>
        </div>
    );
}

export default File;