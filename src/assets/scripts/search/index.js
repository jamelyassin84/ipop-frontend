import * as $ from 'jquery';

export default (function() {
    alert('pota')
    $('.search-toggle').on('click', e => {
        $('.search-box, .search-input').toggleClass('active');
        $('.search-input input').focus();
        e.preventDefault();
    });
}());