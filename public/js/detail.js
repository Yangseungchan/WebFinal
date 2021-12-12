const sample = {
  // timeString, where, kind
  trackingDetails: [
    {
      time: 1636539283000,
      timeString: '2021-11-10 19:14:43',
      code: null,
      where: '고촌콘솔Hub',
      kind: '간선하차',
      telno: '',
      telno2: '',
      remark: null,
      level: 3,
      manName: '',
      manPic: '',
    },
    {
      time: 1636539310000,
      timeString: '2021-11-10 19:15:10',
      code: null,
      where: '고촌콘솔Hub',
      kind: '행낭포장',
      telno: '',
      telno2: '',
      remark: null,
      level: 3,
      manName: '',
      manPic: '',
    },
    {
      time: 1636540621000,
      timeString: '2021-11-10 19:37:01',
      code: null,
      where: '고촌콘솔Hub',
      kind: '간선상차',
      telno: '',
      telno2: '',
      remark: null,
      level: 3,
      manName: '',
      manPic: '',
    },
    {
      time: 1636562825000,
      timeString: '2021-11-11 01:47:05',
      code: null,
      where: '군포HUB',
      kind: '간선하차',
      telno: '',
      telno2: '',
      remark: null,
      level: 3,
      manName: '',
      manPic: '',
    },
    {
      time: 1636562870000,
      timeString: '2021-11-11 01:47:50',
      code: null,
      where: '군포HUB',
      kind: '간선하차',
      telno: '',
      telno2: '',
      remark: null,
      level: 3,
      manName: '',
      manPic: '',
    },
    {
      time: 1636562958000,
      timeString: '2021-11-11 01:49:18',
      code: null,
      where: '군포HUB',
      kind: '간선상차',
      telno: '',
      telno2: '',
      remark: null,
      level: 3,
      manName: '',
      manPic: '',
    },
    {
      time: 1636602308000,
      timeString: '2021-11-11 12:45:08',
      code: null,
      where: '군포',
      kind: '간선하차',
      telno: '',
      telno2: '',
      remark: null,
      level: 3,
      manName: '',
      manPic: '',
    },
    {
      time: 1636604129000,
      timeString: '2021-11-11 13:15:29',
      code: null,
      where: '경기군포신중앙',
      kind: '배달출발\n(배달예정시간\n:14∼16시)',
      telno: '',
      telno2: '01040384205',
      remark: null,
      level: 5,
      manName: '정용진',
      manPic: '',
    },
    {
      time: 1636608738000,
      timeString: '2021-11-11 14:32:18',
      code: null,
      where: '경기군포신중앙',
      kind: '배달완료',
      telno: '',
      telno2: '01040384205',
      remark: null,
      level: 6,
      manName: '정용진',
      manPic: '',
    },
  ],
  level: 6,
  invoice_num: '557909096672',
  item_name: '택배 보내셈 5',
  courier: '04',
  item_id: '43qyexnighj',
  last_update: {
    seconds: 1639284859,
    nanoseconds: 476000000,
  },
};

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
  const {
    item_id,
    courier,
    invoice_num,
    item_name,
    level,
    trackingDetails,
    last_update: { seconds: time_stamp },
  } = data;
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
  $('.detail__updated').text(parseDateToString(new Date(time_stamp)));

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
};

$(document).ready(function () {
  // get request from api using ajax

  updateDetail(sample);
});
