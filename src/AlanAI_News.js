intent('What does this app do?', 'What can I do here?', reply('This is a news project.'))

// NEWSAPI.ORG API KEY
const API_KEY = '2e40c7270758417abc9303180b846913';
let savedArticles = [];

// Latest News
intent('(show me|what|tell me|what\'s|what are|what\'re|read) (the|) (recent|latest|) news', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=ro&apiKey=${API_KEY}`;
    
    api.request(NEWS_API_URL, {headers: {"user-agent": 'AI News Project' }}, (error, response, body) => {
        const { articles } = JSON.parse(body);
        if(!articles.length) {
            p.play('Sorry, please try searching for news from a different source.')
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newNews', articles })
        p.play(`Here are the latest news.`)
        
        p.play('Would you like me to read the headlines?')
        p.then(confirmation);
    })
})

// News by Source
intent('(give|show) (me|) (the|) (news|) (from|) $(source* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if (p.source.value) {
        const sources = p.source.value.toLowerCase().split(' ').join('-');
        NEWS_API_URL = `${NEWS_API_URL}&sources=${sources}`;
    }
    
    api.request(NEWS_API_URL, {headers: {"user-agent": 'AI News Project' }}, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for news from a different source.')
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newNews', articles })
        p.play(`Here are the (latest|recent) ${p.source.value}.`)
        
        p.play('Would you like me to read the headlines?')
        p.then(confirmation);
    })
})

// News by Term
intent('what\'s up with $(term*  (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if (p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
    }
    
    api.request(NEWS_API_URL, {headers: {"user-agent": 'AI News Project' }}, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else.')
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newNews', articles })
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`)
        
        p.play('Would you like me to read the headlines?')
        p.then(confirmation);
    })
})

const confirmation = context(() => {
   intent('(yes|sure|sounds good|please)', async (p) => {
       for (let i=0; i< savedArticles.length; i++) {
           p.play({ command: 'highlight', article: savedArticles[i] });
           p.play(`${savedArticles[i].title}`);
       }
   })
   
   intent('(no|no thanks)', (p) => {
       p.play('Okay, sounds good to me.');
   })
})

intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
  if (p.number.value) {
      p.play({ command: 'open', number: p.number.value, articles: savedArticles })
  }  
})

intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newNews', articles: [] });
})
