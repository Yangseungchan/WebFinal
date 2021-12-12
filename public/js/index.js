const domain = 'http://localhost:8001/';

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

// function that generates createListBlock and appends it to list
const createListBlock = (id, name, level, updated, courier) => {
  // create following html element
  //  <div class="list__block">
  //    <div class="list__body">

  //      <div class="list__thumbnail">
  //        <i class="fas fa-box"></i>
  //      </div>

  //      <div class="list__bodycontent">
  //        <div class="list__bodycontent__header">택배 이름</div>

  //        <div class="list__bodycontent__body">
  //          <div class="list__status listbody__item">
  //            <span class="badge badge-secondary">Preparing</span>
  //          </div>
  //          <div class="list__updated listbody__item">
  //            <div class="list__updated-label">Last Update :</div>
  //            <div class="list__updated-date">2021/12/02</div>
  //          </div>

  //        </div>
  //      </div>
  //    </div>
  //  </div>;

  const listBlock = $('<div></div>', {
    class: 'list__block',
    id: id,
  });

  listBlock.click(() => {
    $(location).attr('href', `${domain}detail?id=${id}&courier=${courier}`);
  });

  const listBody = $('<div></div>', {
    class: 'list__body',
  });

  // thumbnail generation
  const listThumbnail = $('<div></div>', {
    class: 'list__thumbnail',
  });
  const boxIcon = $('<i></i>', {
    class: 'fas fa-box',
  });
  listThumbnail.append(boxIcon);

  const listBodyContent = $('<div></div>', {
    class: 'list__bodycontent',
  });
  const listBodyContentHeader = $('<div></div>', {
    class: 'list__bodycontent__header',
    text: name,
  });
  const listBodyContentBody = $('<div></div>', {
    class: 'list__bodycontent__body',
  });

  // status badge generation
  const listBodyContentStatus = $('<div></div>', {
    class: 'list__status listbody__item',
  });

  const [levelText, levelClass] = getBadgeContent(Number(level));

  const listBodyContentStatusBadge = $('<span></span>', {
    class: `badge ${levelClass}`,
    text: levelText,
  });
  listBodyContentStatus.append(listBodyContentStatusBadge);

  const listBodyContentUpdated = $('<div></div>', {
    class: 'list__updated listbody__item',
  });

  // updated date generation
  const listBodyContentUpdatedLabel = $('<div></div>', {
    class: 'list__updated-label',
    text: 'Created at : ',
  });
  const listBodyContentUpdatedDate = $('<div></div>', {
    class: 'list__updated-date',
    text: parseDateToString(updated),
  });
  listBodyContentUpdated
    .append(listBodyContentUpdatedLabel)
    .append(listBodyContentUpdatedDate);

  listBodyContentBody
    .append(listBodyContentStatus)
    .append(listBodyContentUpdated);

  listBodyContent.append(listBodyContentHeader).append(listBodyContentBody);
  listBody.append(listThumbnail).append(listBodyContent);
  listBlock.append(listBody);
  $('.list__content').append(listBlock);
};

// function that loads user's package list
const loadPackageList = () => {
  $.ajax({
    url: domain + 'api/init',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: res => {
      res.forEach(data => {
        const {
          invoice_num,
          item_name,
          last_update: { seconds: time_stamp },
          level,
          courier,
        } = data;
        createListBlock(
          invoice_num,
          item_name,
          level,
          new Date(time_stamp * 1000),
          courier
        );
      });
      $('.spinner-container').hide();
    },
    error: e => {
      alert('Error in loading list');
    },
  });
};

$(document).ready(function () {
  // $('.spinner-container').show();
  loadPackageList(); // load items from server using ajax

  $('.logo').click(() => {
    $(location).attr('href', `${domain}`);
  });

  // add package
  $('.btn-add-package').click(() => {
    // TODO : add modal event
    const packageName = $('#packageName').val();
    const courierCode = $('#courierSelect').val();
    const invoiceNum = $('#invoiceNumber').val();

    console.log('invoiceNum : ', invoiceNum);

    $.ajax({
      url:
        domain +
        'api/addItem?' +
        $.param({
          item_name: packageName,
          courier: courierCode,
          invoice_num: invoiceNum,
        }),
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: res => {
        alert('Adding new package has been successful');
        location.reload();
      },
      error: e => {
        alert('[Failure] Check your invoice number and courier');
      },
    });
  });

  $('.header__logout').click(() => {
    $(location).attr('href', `${domain}logout`);
  });
});
