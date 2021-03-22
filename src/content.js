/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import App from "./App";

const latRegex = /!3d(-?[\d.]*)/;
const longRegex = /!4d(-?[\d.]*)/;

function callback(mutationList) {
  mutationList.forEach(function(mutation) {
    if (mutation.type === 'attributes') {
        if (mutation.oldValue !== mutation.target[mutation.attributeName])
        extractDataforSearch(mutation.target);
    }
  })
}
var observer = new MutationObserver(callback);

document.arrive('.place-result-container-place-link', function() {
  extractDataforSearch(this);  
  observer.observe(this, {
    attributeFilter: [ "href" ],
    attributes: true,
    attributeOldValue: true
  });
});

function extractDataforSearch(item) {
  console.log(`${item.getAttribute('aria-label')}: ${item.href.match(latRegex)[1]}, ${item.href.match(longRegex)[1]}`);
}
// class Main extends React.Component {
//     render() {
//         return (
//             <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
//                <FrameContextConsumer>
//                {
//                   ({document, window}) => {
//                     return <App document={document} window={window} isExt={true}/> 
//                   }
//                 }
//                 </FrameContextConsumer>
//             </Frame>
//         )
//     }
// }

// const app = document.createElement('div');
// app.id = "my-extension-root";

// document.body.appendChild(app);
// ReactDOM.render(<Main />, app);

// app.style.display = "none";

// chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//       if( request.message === "clicked_browser_action") {
//         toggle();
//       }
//    }
// );

// function toggle(){
//    if(app.style.display === "none"){
//      app.style.display = "block";
//    }else{
//      app.style.display = "none";
//    }
// }
