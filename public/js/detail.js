const domain = 'http://localhost:8001/';

const courierList = {
  4: 'CJ대한통운',
  5: '한진택배',
  8: '롯데택배',
  1: '우체국택배',
  6: '로젠택배',
  11: '일양로지스',
  23: '경동택배',
  46: 'CU 편의점택배',
  24: 'GS postbox 택배',
  12: 'EMS',
  13: 'DHL',
  21: 'FedEx',
  25: 'TNT Express',
  33: 'DHL Global Mail',
};

// return badge text, class based on the level(int)
const getBadgeContent = level => {
  let badgeText, badgeClass;
  switch (level) {
    case 1:
      badgeText = 'Preparing';
      badgeClass = 'badge-secondary';
      break;
    case 2:
      badgeText = 'On Cargo';
      badgeClass = 'badge-secondary';
      break;
    case 3:
      badgeText = 'On Delivery';
      badgeClass = 'badge-primary';
      break;
    case 4:
      badgeText = 'Arrival on spot';
      badgeClass = 'badge-primary';
      break;
    case 5:
      badgeText = 'Delivery start';
      badgeClass = 'badge-primary';
      break;
    case 6:
      badgeText = 'Delivery complete';
      badgeClass = 'badge-success';
      break;
  }
  return [badgeText, badgeClass];
};

// parse date obj to date time string
const parseDateToString = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const updateDetail = data => {
  const { courier, invoice_num, item_name, level, trackingDetails } = data;
  const [levelText, levelClass] = getBadgeContent(level);

  // badge update
  $('.detail__status__badge')
    .removeClass('badge-primary')
    .addClass(levelClass)
    .text(levelText);

  // name update
  $('.detail__header-title').text(item_name);

  // invoice update
  $('.detail__invoice').text(invoice_num);

  // courior update
  $('.detail__courier').text(courierList[Number(courier)]);

  // updated date update
  $('.detail__updated').text(parseDateToString(new Date()));

  if (trackingDetails) {
    trackingDetails.forEach(element => {
      const { timeString, where, kind } = element;
      const tableRow = $('<tr></tr>');
      const firstRow = $('<th></th>', {
        scope: 'row',
        text: timeString,
      });
      const secondRow = $('<td></td>', {
        text: where,
      });
      const thirdRow = $('<td></td>', {
        text: kind,
      });
      tableRow.append(firstRow).append(secondRow).append(thirdRow);
      $('tbody').append(tableRow);
    });
  }
};

$(document).ready(function () {
  $('.spinner-container').show();
  $('.logo').click(() => {
    $(location).attr('href', `${domain}`);
  });

  // function that gets query string from given url
  // reference : [https://stackoverflow.com/questions/4656843/get-querystring-from-url-using-jquery]
  function getUrlVars() {
    var vars = [],
      hash;
    var hashes = window.location.href
      .slice(window.location.href.indexOf('?') + 1)
      .split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }
  const courier = getUrlVars()['courier'];
  const invoice_num = getUrlVars()['id'];
  // TODO : trackingInfo API 연동
  $.ajax({
    url:
      domain +
      'api/trackingInfo?' +
      $.param({
        courier: courier,
        invoice_num: invoice_num,
      }),
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: res => {
      const { invoice_num, level, trackingDetails, item_name } = res;
      // update detail page
      updateDetail({ courier, invoice_num, item_name, level, trackingDetails });
      $('.spinner-container').hide();
    },
    error: e => {
      alert('Error on updating detail');
      $('.spinner-container').hide();
    },
  });

  $('.btn-update-detail').click(() => {
    location.reload();
  });

  $('.btn-delete-detail').click(() => {
    console.log('click delete');
  });

  $('.header__logout').click(() => {
    $(location).attr('href', `${domain}logout`);
  });
});
