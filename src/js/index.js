import 'bootstrap';
import axios from 'axios';
import '../scss/index.scss';

const hideConfirmationPage = () => {
  $('.booking-form').show();
  $('.confirmation-page').hide();
};

const showConfirmationPage = () => {
  $('.booking-form').hide();
  $('.confirmation-page').show();
};

// Your jQuery code
var room_type = 'amihan';

var rooms = {
  amihan: 30,
  anahaw: 21,
  fidez: 14,
  garden: 24,
  harana: 33,
  hilltop: 8,
  hotel: 11,
  jm: 8,
  lambingan: 32,
  magara: 20,
  marikit: 52,
  pavilion: 41,
};

var setRoomType = function(room) {
  room_type = room;
  $('#room_type').val(room_type);
  var carousel = $('.room-carousel.carousel-inner');
  carousel.html('');
  var roomType = rooms[room_type] > 20 ? 20 : rooms[room_type];
  for (var i = 1; i < roomType; i++) {
    carousel.append(`
       <div class="carousel-item ${i === 1 ? 'active' : ''}">
          <img src="./public/images/${room_type}/${i}.jpg" class="d-block w-100" alt="...">
        </div>
    `);
  }
  carousel.carousel();
  hideConfirmationPage();
};

setRoomType('amihan');

$('.btn-room-type').on('click', function() {
  setRoomType($(this).data('room'));
});

$('#room_type').on('change', function() {
  setRoomType($(this).val());
});

$('.btn-booking-finalize').on('click', () => {
  $('.btn-booking-finalize').html(`
    <div class="spinner-border text-info spinner-border-sm" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `);
  axios
    .post('https://hook.integromat.com/imvl4f6blqmexf532dskd3dkurrt3wvl', {
      name: $('#name').val(),
      pax: $('#pax').val(),
      from: $('#from').val(),
      to: $('#to').val(),
      mobile_number: $('#mobile_number').val(),
      room_type: room_type,
      email: $('#email').val(),
    })
    .then(() => {
      $('.btn-booking-finalize').html(`
    BOOK
  `);
      showConfirmationPage();
    });
});
