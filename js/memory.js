'use stict';

$(document).ready(function() {
  var $container = $('.container');
  var $body = $('body');
  // var category;
  var arrayColors = ['#54E7FE', '#8A65B7', '#FF353D', '#FF8A27', '#FFFF00',
   '#01B230', '#7F9DB7', '#153A40','#54E7FE', '#8A65B7', '#FF353D', '#FF8A27',
   '#FFFF00', '#01B230', '#7F9DB7', '#153A40'];
  var arrayNumbers =
    ['1', '2', '3', '4', '5', '6', '7', '8',
    '1', '2', '3', '4', '5', '6', '7', '8'];
  var arrayPrrrr = ['url(images/1.jpg)','url(images/2.jpg)','url(images/3.jpg)',
    'url(images/4.jpg)','url(images/5.jpg)','url(images/6.jpg)',
    'url(images/7.jpg)','url(images/8.jpg)','url(images/1.jpg)',
    'url(images/2.jpg)','url(images/3.jpg)','url(images/4.jpg)',
    'url(images/5.jpg)','url(images/6.jpg)','url(images/7.jpg)',
    'url(images/8.jpg)'];
  var userSelection = (shuffle(arrayColors));

  $('button').on('click', function(event) {
    if (event.target.id === 'arrayColors') {
      userSelection = arrayColors;
      shuffle(userSelection);
      buildBoard(($container), numberOfCells);
    } else if (event.target.id === 'arrayNumbers') {
      userSelection = arrayNumbers;
      shuffle(userSelection);
      buildBoard(($container), numberOfCells);
    } else {
      userSelection = arrayPrrrr;
      shuffle(userSelection);
      buildBoard(($container), numberOfCells);
    };
  });

  //Shuffle array
  function shuffle(arr) {
    arr.sort(function() { return 0.5 - Math.random(); });
    return arr;
  };

  //Build board
  var numberOfCells = 16;
  function buildBoard(element, cells) {
    element.empty();
    for (var i = 0; i < cells; i++) {
      element.append('<div class="cell" id="' + (i + 1) +
        '" data-colour=' + userSelection[i] +
        '></div>'
      );
    }
  };
  buildBoard(($container), numberOfCells);

  //compareCells
  function compareCells(a, b) {
    console.log('aa id ', (a[0].id));
    console.log('bb id ', (b[0].id));
    if ((a[0].id !== b[0].id) &&
       (!a.hasClass('matched') || !b.hasClass('matched'))) {
      if (a.data('colour') === b.data('colour')) {
        setTimeout(function() {
          $body.css('pointer-events', 'inherit');
          $(a).removeAttr('style').removeClass('selected').html('');
          $(b).removeAttr('style').removeClass('selected').html('');
          $(a).addClass('matched');
          $(b).addClass('matched');
          $(a).click(false);
          $(b).click(false);
        }, 100);
      } else {
        setTimeout(function() {
          $body.css('pointer-events', 'inherit');
          $(a).removeAttr('style').removeClass('selected').html('');
          $(b).removeAttr('style').removeClass('selected').html('');
        }, 200);
      }
    } else {
      setTimeout(function() {
        $body.css('pointer-events', 'inherit');
        $(a).removeAttr('style').removeClass('selected').html('');
        $(b).removeAttr('style').removeClass('selected').html('');
      }, 100);
    }
  };

  //assign colours to cells
  $container.on('click', '.cell', function(event) {
    $cell = $(this);
    var color = $cell.data('colour');
    var $selectedCell = $('.cell.selected').first();
    if (userSelection === arrayColors) {
      $cell.css('background-color', color).addClass('selected'); //to use colours
    } else if (userSelection === arrayPrrrr) {
      $cell.css('background-image', color).addClass('selected'); //to use imgs
    } else {
      $cell.html(color).addClass('selected');//to use with numbers or text
    }
    if ($selectedCell.length > 0) {
      compareCells($selectedCell, $cell);
      $body.css('pointer-events', 'none');
    }
  });
});
