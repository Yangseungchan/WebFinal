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
const createListBlock = (id, name, level, updated) => {
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
    $(location).attr('href', `${domain}detail/${id}`);
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

  const [levelText, levelClass] = getBadgeContent(level);

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
    text: 'Last Update : ',
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
  createListBlock(1, '택배 받으셈1', 1, new Date());
  createListBlock(2, '택배 받으셈2', 2, new Date());
  createListBlock(3, '택배 받으셈3', 3, new Date());
  createListBlock(4, '택배 받으셈4', 4, new Date());
  createListBlock(5, '택배 받으셈5', 5, new Date());
  createListBlock(5, '택배 받으셈6', 6, new Date());

  // TODO : load list from backend
};

$(document).ready(function () {
  loadPackageList();

  $('.btn-add-package').click(() => {
    // TODO : add modal event
    console.log('button click test');
  });
});
