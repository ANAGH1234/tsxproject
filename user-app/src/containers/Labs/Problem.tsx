import React from 'react'
import { useOutletContext } from "react-router-dom";

export default function Problem() {
    const [labDetailData] = useOutletContext<any>();
    return (
        <div className='col-sm-12'>
            <div className="p-2">
                <h4 className="ps-2">Lab Details</h4>
                <div className='row pt-2 ps-2'>
                    <div id="lab" dangerouslySetInnerHTML={{ __html: labDetailData.Problem }}></div>
                </div>
            </div>
        </div>
    )
}
