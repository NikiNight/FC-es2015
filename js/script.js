import Article from './Article.js';

window.onload = function() {

    document.querySelector('.submit').onclick = function () {
        let country = document.getElementById('country').value;
        let category = document.getElementById('category').value;
        let pagesize = document.getElementById('pagesize').value;
        const newscontainer = document.querySelector('.news-container');

        newscontainer.innerHTML = '';

        var url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&sortBy=popularity&pageSize=${pagesize}&apiKey=59e5ec14708e4b768acc8a0664f22906`;

        fetch(url)
            .then(response => response.json())
            .then(newsjson => handleJSON(newsjson));

        function handleJSON(respon){
            respon.articles.forEach(function (val) {
                let article = new Article(val);
                newscontainer.appendChild(article.generateArticle);
                //let art = createArticle();
            })
        }

    };
};