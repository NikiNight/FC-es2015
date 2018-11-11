export default class Article {
    constructor({author, title, urlToImage, content, description, url}) {
        this.author = author;
        this.title = title;
        this.urlToImage = urlToImage;
        this.content = content;
        this.description = description;
        this.url = url;
    };

    get generateArticle(){
        let article = document.createElement('article');
        article.className = 'article';
        let elements = this.constructor.checkResponceContent(this);
        if (elements['author']){
            article.appendChild(this.generateElement('author', elements['author']));
        }
        if (elements['title']){
            article.appendChild(this.generateElement('title', elements['title']));
        }
        if (elements['description']){
            article.appendChild(this.generateElement('description', elements['description']));
        }
        if (elements['url'] || elements['content'] || elements['urlToImage']) {
            article.appendChild(this.generateElement('show-more', 'Show More'));
            let body = article.appendChild(this.generateElement('body', ''));
            if(elements['urlToImage']){
                body.appendChild(this.generateElement('urlToImage', elements['urlToImage']));
            }
            if(elements['content']){
                body.appendChild(this.generateElement('content', elements['content']));
            }
            if(elements['url']){
                body.appendChild(this.generateElement('url', elements['url']));
            }
        }
        return article;

    }

    static checkResponceContent(object){
        let articleContent = {};
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                articleContent[key] = object[key];
            }
        }
        return articleContent;
    }

    generateElement(key, value) {
        let element = document.createElement(this.constructor.getElementType(key));
        element.className = (this.constructor.getElementClass(key));
        if(key === 'urlToImage'){
            element.setAttribute('src', value);
        } else if (key === 'url') {
            element.setAttribute('href', value);
            element.setAttribute('target', '_blank');
            element.innerHTML = 'Show Source';
        } else {
            element.innerHTML = value;
        }
        return element;
    }

    static getElementType(key){
        let elementType;
        switch (key) {
            case 'urlToImage' : elementType =  'img';
            break;
            case 'title' : elementType = 'h2';
            break;
            case 'url' : elementType = 'a';
            break;
            case 'show-more' : elementType = 'button';
            break;
            case 'body' : elementType = 'div';
            break;
            default: elementType = 'p';
        }
        return elementType;
    }

    static getElementClass(key){
        let elementClass;
        switch (key) {
            case 'author' : elementClass = 'article__author';
                break;
            case 'title' : elementClass = 'article__title';
                break;
            case 'description' : elementClass = 'article__description';
                break;
            case 'urlToImage' : elementClass = 'article__img';
                break;
            case 'content' : elementClass = 'article__content';
                break;
            case 'url' : elementClass = 'article__href';
                break;
            case 'show-more' : elementClass = 'article_show-more';
                break;
            case 'body' : elementClass = 'article__body';
                break;
            default: elementClass = '';
        }
        return elementClass;
    }
}