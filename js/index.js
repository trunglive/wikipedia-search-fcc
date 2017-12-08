$(document).ready(function() {
  $('form').on('submit', function(event) {

    event.preventDefault();

    $('.result-list').empty();
    const data = $('.wiki-search__input').val();
    const url = `https://en.wikipedia.org/w/api.php?action=query&srsearch=${data}&list=search&format=json`;
    
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp'
    })
    .done(function(result) {
      const articles = result.query.search;
      let htmlList = ``;
      
      for (let article of articles) {
        let link = 'https://en.wikipedia.org/?curid=';
        let finalLink = link + article.pageid;
        
        htmlList += `<li class='result-list__article'><a href=${finalLink} target="_blank"><p><strong>${article.title}</strong></p><p>${article.snippet}</p></a></li>`;
      }
      
      $('.result-list').hide().append(htmlList).fadeIn(400);
      $('.wiki-search__input').val('');
    })
    .fail(function() {
      console.log('Error!!');
    })
  });
});