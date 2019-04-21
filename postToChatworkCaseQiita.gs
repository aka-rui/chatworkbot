function post() {
  // Get qiita data
  qiita_data = getQiitaTitleUrl();
  
  // Make text
  text = makeText(qiita_data);

  // post to chatwork  
  postToChatwork(text);
}

/*
 Get recentry qiita data
 
 @return [Hash] text & url
*/
function getQiitaTitleUrl() {
  const QIITA_API_URI = 'https://qiita.com/api/v2/items';
  
  var response  = UrlFetchApp.fetch(QIITA_API_URI);
  var json      = response.getContentText();    
  var json_data = JSON.parse(json); 
  
  // Gnerate qiita title and url
  var qiita_data = {title: '', url: ''};
  
  qiita_data.title = json_data[0]['title'];
  qiita_data.url   = json_data[0]['url'];
 
  return qiita_data;
}

/*
 Mkae post text
 'Title + URL'
 
 @param  [Hash]   date text & url
 @return [String] text
*/
function makeText(data) {
  // Make posts text to chatwork
  return '[info][title]📖Qiita新着記事📖[/title]URL:'+ qiita_data['title'] + '\n' + qiita_data['url'] + '[/info]'

}

/*
 Post to chatwork
 
 @param  [String] text text data
*/
function postToChatwork(text) {
  const CW_TOKEN = 'xxxx';
  
  // Chatwork API
  var client     = ChatWorkClient.factory({token: CW_TOKEN});
  
  client.sendMessage({
    room_id: 150132201, // room ID
    body:    text
  });
}
