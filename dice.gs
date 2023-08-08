function main(){
  request('Senior PHP Developer')
}

function request(request){

  const options={
      "async": true,
      "crossDomain": true,
      "method" : "GET",
      "headers" : {
        "User-Agent" : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        "cache-Sec-Ch-Ua": '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'X-Api-Key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8'
                  }
      }
  
  let pCount = 1;
  const sheet = SpreadsheetApp.getActiveSheet();

  try{
    for (let p=1; p<=pCount; p++){
      let page = JSON.parse(UrlFetchApp.fetch(get_url(request, p), options).getContentText());
      const catalog=[];
        for (let i=0; i<= page.data.length-1; i++){
          catalog.push([
          page.data[i].id,
          page.data[i].title,
          page.data[i].jobLocation.displayName,
          page.data[i].postedDate,
          page.data[i].detailsPageUrl,
          page.data[i].companyPageUrl,
          page.data[i].salary,
          page.data[i].companyName,
          page.data[i].employmentType,
          page.data[i].summary,
          page.data[i].score,
          page.data[i].easyApply,
          page.data[i].employerType,
          page.data[i].workFromHomeAvailability,
          page.data[i].modifiedDate,
          page.data[i].firstActiveDate
        ]); }
      sheet.getRange(`A${sheet.getLastRow()+1}:P${sheet.getLastRow() + catalog.length}`).setValues(catalog)
      if (p<page.meta.pageCount) pCount++
      Utilities.sleep(300)
    }
  }catch{
    console.log('Erorr')
  }

}

function get_url(request, page){
return `https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search?q=${request}&countryCode2=US&radius=30&radiusUnit=mi&page=${page}&pageSize=20`

}
