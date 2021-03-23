// // Called when the user clicks on the browser action
// chrome.browserAction.onClicked.addListener(function(tab) {
//    // Send a message to the active tab
//    chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
//         var activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//    });
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const urlBase = 'https://api.groupon.com/v2/deals';
    const clientId = '0c9926ce2479a25adec0c9b3c1e6327c73946fe7';
    const filters = 'category:automotive%7Ccategory:beauty-and-spas%7Ccategory:food-and-drink%7Ccategory:health-and-fitness%7Ccategory:home-improvement%7Ccategory:personal-services%7Ccategory:retail%7Ccategory:things-to-do';
    const lat = request.latitude;
    const lng = request.longitude;
    const radius = 0.09;
    const merchant = request.merchant;
    const url = `${urlBase}?client_Id=${clientId}&lat=${lat}&lng=${lng}&radius=${radius}&filters=${filters}`;
    
    fetch(url)
        .then(res => res.json())
        .then(json => { 
            console.log(url);
            console.log(merchant);
            console.log(json.deals);
            let deals = json.deals.filter(deal => 
                (deal.merchant.name?.toLowerCase() === merchant.toLowerCase() 
                || deal.options[0].redemptionLocations.some(location => location.name === merchant))
                && deal.options[0].redemptionLocationCount > 0
                && deal.status === 'open');
            console.log(deals);
            sendResponse(JSON.stringify(deals));
        });

    return true;
});

    