export default class Article {
    constructor({author, title, urlToImage, content, description, url}) {
        this.author = author;
        this.title = title;
        this.urlToImage = urlToImage;
        this.content = content;
        this.description = description;
        this.url = url;
    };

    //Article generator
    generateArticle(){
        let template = '';
        let article = document.createElement('article');
        article.className = 'article';

        let elements = this.constructor.checkResponceContent(this);
        if (elements['author']){
            template += `<p class="article__author">${this.author}</p>`;
        }
        if (elements['title']){
            template += `<h3 class="article__title">${this.title}</h3>`;
        }
        if (elements['description']){
            template += `<p class="article__description">${this.description}</p>`;
        }
        if (elements['content'] || elements['urlToImage']) {

            template += `<button class="article_show-more">Show More</button><div class="article__body">`;

            if(elements['urlToImage']){
                template += `<img class="article__img" src="${this.urlToImage}">`;
            }
            if(elements['content']){
                template += `<p class="article__content">${this.content}</p>`;
            }

            template += `</div>`
        }

        if(elements['url']){
            template += `<a class="article__href" href="${this.url}" target="_blank">Show Source</a>`
        }

        article.innerHTML=template;

        if(elements['content'] || elements['urlToImage']){
            article.querySelector('.article_show-more').addEventListener('click', () => this.constructor.handleShowmoreClick(article));
        }

        return article;

    }

    //Check response content for null value
    static checkResponceContent(object){
        let articleContent = {};
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                articleContent[key] = object[key];
            }
        }
        return articleContent;
    }

    //Event listener for show more button
    static handleShowmoreClick(article) {
         article.querySelector('.article__body').style.display = 'block';
         article.querySelector('.article_show-more').style.display = 'none';
    }
}