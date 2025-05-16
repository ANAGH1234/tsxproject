import React, { useEffect } from 'react';
import ViewSDKClient from '../../services/ViewSDKClient';

export default function PDFViewer(props:any) {

  useEffect(() => {    
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile("pdf-div", {
        embedMode: "FULL_WINDOW", //FULL_WINDOW //IN_LINE
        defaultViewMode: "FIT_WIDTH",
        showAnnotationTools: false,
        showDownloadPDF: false,
        showPrintPDF: false
      }, props.SolutionPdf);
    });

  }, []);

  return (
    <div id="pdf-div" className="full-window-div" style={{ height: 'calc(100vh + 100px)', width: '102%', marginTop: '2.5rem' }} />
  )
}
