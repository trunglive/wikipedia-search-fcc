const main = () => {
  $('.wiki-search').on('submit', event => {
    event.preventDefault();

    $('.result-list').empty();

    const input = $('.wiki-search__input').val();
    const url = `https://en.wikipedia.org/w/api.php?action=query&srsearch=${input}&list=search&format=json`;

    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'jsonp'
    })
      .done(result => {
        const articles = result.query.search;
        let htmlList = ``;

        for (let article of articles) {
          const link = `https://en.wikipedia.org/?curid=${article.pageid}`;
          htmlList += `<li class='result-list__article'>
            <a href=${link} target='_blank'>
              <p><strong>${article.title}</strong></p>
              <p>${article.snippet}</p>
            </a>
          </li>`;
        }

        $('.result-list')
          .hide()
          .append(htmlList)
          .fadeIn(700);
        $('.wiki-search__input').val('');
      })
      .fail(() => {
        $('.wiki-search__input').val('');
        $('.result-list').append(
          `<li class='result-list__error'>Please check your internet connection again!</li>`
        );
      });
  });
};

$(document).ready(main);
