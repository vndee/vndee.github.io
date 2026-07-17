/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v2.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- CUSTOM JS SCRIPTS -----------*/

$('[data-github]').each(function () {
  var _this = this;
  var repo = $(_this).data('github')

  fetch('https://api.github.com/repos/' + repo).then(function (response) {
    return response.json();
  }).then(function (response) {
    $(_this).find('[data-forks]').text(response.forks);
    $(_this).find('[data-stars]').text(response.stargazers_count);
  });
});

/* Contact form: no server on GitHub Pages, so open the user's mail client
   with the fields pre-filled. Runs after main.js binds, so remove its
   PHP-AJAX handler first, then bind ours. */
$(function () {
  var $form = $('#contact-form');
  if (!$form.length) return;

  $form.off('submit').on('submit', function (event) {
    event.preventDefault();

    var name = $.trim($('#contact-name').val());
    var email = $.trim($('#contact-email').val());
    var subject = $.trim($('#contact-subject').val());
    var message = $.trim($('#contact-message').val());

    var body = 'From: ' + name + ' <' + email + '>\n\n' + message;
    var mailto = 'mailto:vndee.huynh@gmail.com'
      + '?subject=' + encodeURIComponent(subject || ('Message from ' + (name || 'your site')))
      + '&body=' + encodeURIComponent(body);

    window.location.href = mailto;

    var feedbackEl = $form.find('.contact-feedback');
    feedbackEl.addClass('success').html('Opening your email app…').fadeIn(200);
    setTimeout(function () {
      feedbackEl.fadeOut(200).removeClass('success').html('');
    }, 5000);
  });
});
